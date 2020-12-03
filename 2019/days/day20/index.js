let path = require('path');
let Day = require(path.join(__dirname, '..', '..', '..', 'helpers', 'Day'));
let Matrix = require(path.join(__dirname, '..', '..', '..', 'helpers', 'GraphMatrix'));
let IntCode = require(path.join(__dirname, '..', '..', 'helpers', 'Amplifier'));
let _ = require('lodash');

let isTest = false;

const PATH = '.';
const PORTAL = '@';
const WALL = '#';
const START = 'AA';
const END = 'ZZ';

let DIRECTIONS = {
  UP: { name: 'up', offsetX: -1, offsetY: 0 },
  DOWN: { name: 'down', offsetX: 1, offsetY: 0 },
  LEFT: { name: 'left', offsetX: 0, offsetY: -1 },
  RIGHT: { name: 'right', offsetX: 0, offsetY: 1 },
};

function task1(data) {
  const lines = data.split('\r\n');
  let matrix = new Matrix();
  let doors = [];

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      matrix.set(j, i, lines[i][j]);
    }
  }

  matrix.print();
  console.log();
  console.log();

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      const char = matrix.get(j, i) || '';

      for (let { offsetY, offsetX } of Object.values(DIRECTIONS)) {
        const dir = matrix.get(j + offsetY, i + offsetX) || '';
        const dir2 = matrix.get(j + offsetY + offsetY, i + offsetX + offsetX) || '';

        if (char.isUpperCase() && dir.isUpperCase() && dir2 === PATH) {
          const key = _.sortBy([char, dir]).join('');
          const door = { key, i: i + offsetX + offsetX, j: j + offsetY + offsetY };
          doors.push(door);

          matrix.set(j + offsetY + offsetY, i + offsetX + offsetX, PORTAL);
        }
      }
    }
  }

  doors = _.sortBy(doors, 'key');
  console.log(doors);

  let { i, j } = doors.find(d => d.key === START);
  let maxDepth = { depth: Number.MAX_SAFE_INTEGER };
  findPath(matrix, doors, i, j, 0, maxDepth, 0);

  return maxDepth.depth;
}

function findPath(matrix, doors, i, j, depth, maxDepth, level) {
  if (depth > maxDepth.depth) {
    return;
  }

  const current = doors.find(d => d.i === i && d.j === j).key;
  matrix.set(j, i, 'x');
  const pathsToKey = {};
  findPathToKey(matrix, doors, i, j, 0, pathsToKey);
  console.log('From', current, 'level', level);
  console.log('Path to keys', pathsToKey);
  // matrix.print();

  Object.entries(pathsToKey).forEach(([key, pos]) => {
    const nextPos = doors.find(d => d.key === key && (d.i !== pos.i || d.j !== pos.j));
    if (key === END) {
      debugger
      maxDepth.depth = Math.min(depth + pos.depth, maxDepth.depth);
      return;
    }

    if (nextPos) {
      findPath(_.cloneDeep(matrix), doors, nextPos.i, nextPos.j, pos.depth + depth + 1, maxDepth, level + 1);
    }
  });
}

function findPathToKey(matrix, doors, i, j, depth, result) {
  const char = matrix.get(j, i);

  if (char && char === PORTAL) {
    const current = doors.find(d => d.i === i && d.j === j).key;
    result[current] = { depth, i, j, char: current };
  } else if (char !== 'x') {
    matrix.set(j, i, '0');
  }

  const nextPositions = Object.values(DIRECTIONS)
    .map(({ offsetY, offsetX }) => ({
      i: i + offsetX,
      j: j + offsetY
    }))
    .map(pos => ({ ...pos, char: matrix.get(pos.j, pos.i) }))
    .filter(pos => pos.char && (pos.char === PATH || pos.char === PORTAL));

  nextPositions.forEach(pos => {
    if (pos.char === PORTAL) {
      const current = doors.find(d => d.i === pos.i && d.j === pos.j).key;
      result[current] = { depth: depth + 1, i: pos.i, j: pos.j, char: pos.char };
    } else {
      findPathToKey(matrix, doors, pos.i, pos.j, depth + 1, result);
    }
  });
}

function task2(data) {
  return ''
}

String.prototype.isUpperCase = function () {
  return /^[A-Z]*$/.test(this)
};

let day = new Day(2019,  20, isTest);
day.task(1, task1, true);
day.task(2, task2, true);
