let path = require('path');
let _ = require('lodash');
let Day = require(path.join(__dirname, '..', '..', '..', 'helpers', 'Day'));
let IntCode = require(path.join(__dirname, '..', '..', 'helpers', 'Amplifier'));
let Matrix = require(path.join(__dirname, '..', '..', '..', 'helpers', 'GraphMatrix'));

let isTest = false;

let WALL = '#';
let START = 'D';
let PATH = 1;
let EXIT = 2;

let DIRECTIONS = {
  'U': { name: 'north', input: 1, offsetX: 0, offsetY: 1 },
  'D': { name: 'south', input: 2, offsetX: 0, offsetY: -1 },
  'L': { name: 'left', input: 3, offsetX: -1, offsetY: 0 },
  'R': { name: 'right', input: 4, offsetX: 1, offsetY: 0 },
};

function task1(data) {
  const matrix = findMap(data);
  const dirs = Object.values(DIRECTIONS);

  // matrix.print({ 1: '.' });

  const max = { depth: Number.MAX_SAFE_INTEGER };
  const visited = new Set();

  findPath(matrix, dirs, visited, 0, 0, 0, max, true);
  return max.depth;
}

function task2(data) {
  const matrix = findMap(data);
  const dirs = Object.values(DIRECTIONS);

  const maxTime = { depth: 0 };
  const visited = new Set();
  const { x, y } = matrix.findCoordinates(EXIT);

  findPath(matrix, dirs, visited, x, y, 0, maxTime, false);
  return maxTime.depth;
}


function findPath(matrix, dirs, visited, x, y, depth, target, minMode) {
  visited.add(`${x}#${y}`);

  if (minMode) {
    if (depth > target.depth) {
      return;
    }

    if (matrix.get(x, y) === EXIT) {
      target.depth = depth;
      return;
    }
  } else {
    if (depth > target.depth) {
      target.depth = depth;
    }
  }

  dirs.forEach(dir => {
    const ax = x + dir.offsetX;
    const ay = y + dir.offsetY;
    const key = `${ax}#${ay}`;
    const element = matrix.get(ax, ay);

    if (!visited.has(key) && (element === PATH || element === EXIT)) {
      findPath(matrix, dirs, visited, ax, ay, depth + 1, target, minMode);
    }
  });
}

function findMap(data) {
  const regs = data.split(',').map(n => +n);
  const dirs = Object.values(DIRECTIONS);

  let x = 0, y = 0;
  const matrix = new Matrix(x, y, 'D');
  const costs = new Matrix(x, y, 1);
  let steps = 0;

  let intCode = new IntCode('name', regs);

  while (steps < 100000) {
    let directions = dirs.map(dir => {
      const ax = x + dir.offsetX;
      const ay = y + dir.offsetY;
      const cost = costs.get(ax, ay) || 0;

      return { x: ax, y: ay, cost, input: dir.input }
    });

    directions = _.sortBy(directions, 'cost');
    const current = directions[0];
    const run = intCode.run(current.input);

    if (run.output === 0) {
      costs.set(current.x, current.y, Number.MAX_SAFE_INTEGER);
      matrix.set(current.x, current.y, WALL);
    } else {
      x = current.x;
      y = current.y;
      costs.set(x, y, current.cost + 1);
      if (x || y) {
        matrix.set(x, y, run.output);
      }
    }

    steps++;
  }

  return matrix;
}

let day = new Day(2019,  15, isTest);
day.task(1, task1);
day.task(2, task2);
