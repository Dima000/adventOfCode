let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));

let isTest = false;
let DIRECTIONS = {
  U: { offsetX: -1, offsetY: 0 },
  D: { offsetX: 1, offsetY: 0 },
  L: { offsetX: 0, offsetY: -1 },
  R: { offsetX: 0, offsetY: 1 },
};

function task1(data) {
  const [seq1, seq2] = data.split('\n');
  const numbers1 = seq1.split(',');
  const numbers2 = seq2.split(',');

  const startPoint = { x: 50000, y: 50000 };
  const matrix = {};

  traceCircuit(matrix, numbers1, startPoint, 'trace1');
  traceCircuit(matrix, numbers2, startPoint, 'trace2');

  return findClosestIntersection(matrix, startPoint);
}

function task2(data) {
  const [seq1, seq2] = data.split('\n');
  const numbers1 = seq1.split(',');
  const numbers2 = seq2.split(',');

  const startPoint = { x: 50000, y: 50000 };
  const matrix = {};

  traceCircuit(matrix, numbers1, startPoint, 'trace1');
  traceCircuit(matrix, numbers2, startPoint, 'trace2');

  return findMinimTimeIntersection(matrix, startPoint);
}

function traceCircuit(matrix, numbers, startPoint, id) {
  let endPoint = { ...startPoint };
  let wireSteps = 1;

  for (let num of numbers) {
    const [fm, dir, stepsStr] = num.match(/([RLUD])(\d+)/);
    let steps = +stepsStr;

    while (steps > 0) {
      const { offsetX, offsetY } = DIRECTIONS[dir];
      endPoint.x += offsetX;
      endPoint.y += offsetY;
      const key = `${endPoint.x}-${endPoint.y}`;

      matrix[key] = {
        [id]: wireSteps,
        ...(matrix[key] || {})
      };

      steps -= 1;
      wireSteps += 1;
    }
  }
}

function findClosestIntersection(matrix, { x, y }) {
  let min = Number.MAX_SAFE_INTEGER;

  for (let [key, value] of Object.entries(matrix)) {
    if (value && value['trace1'] && value['trace2']) {
      const [pointX, pointY] = key.split('-').map(n => +n);
      const dist = Math.abs(x - pointX) + Math.abs(y - pointY);
      min = Math.min(min, dist);
    }
  }

  return min;
}

function findMinimTimeIntersection(matrix, { x, y }) {
  let min = Number.MAX_SAFE_INTEGER;

  for (let value of Object.values(matrix)) {
    if (value && value['trace1'] && value['trace2']) {
      const dist = value['trace1'] + value['trace2'];
      min = Math.min(min, dist);
    }
  }

  return min;
}

let day = new Day(2019,  3, isTest);
day.task(1, task1);
day.task(2, task2);
