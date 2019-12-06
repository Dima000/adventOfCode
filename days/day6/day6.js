let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));

let isTest = false;

function task1(data) {
  const lines = data.trim().split('\r\n');
  const matrix = {};

  for (let line of lines) {
    const [obj1, obj2] = line.split(')');
    if (!matrix[obj1]) {
      matrix[obj1] = [];
    }
    if (!matrix[obj2]) {
      matrix[obj2] = [];
    }

    matrix[obj1].push(obj2);
  }

  let stats = { total: 0 };
  treeDistance(matrix, 'COM', 0, stats);

  return stats.total;
}

function task2(data) {
  const lines = data.trim().split('\r\n');
  const matrix = {};

  for (let line of lines) {
    const [obj1, obj2] = line.split(')');
    if (!matrix[obj1]) {
      matrix[obj1] = [];
    }
    if (!matrix[obj2]) {
      matrix[obj2] = [];
    }

    matrix[obj1].push(obj2);
  }

  const matrixValues = Object.entries(matrix);
  const steps = {};
  let depth = 0;
  let start = 'YOU';
  while (start) {
    const parent = findParent(matrixValues, start);
    steps[parent] = depth;
    depth += 1;
    start = parent;
  }

  start = 'SAN';
  depth = 0;
  while (1) {
    const parent = findParent(matrixValues, start);
    if (steps[parent]) {
      return steps[parent] + depth;
    }

    depth += 1;
    start = parent;
  }
}

function treeDistance(matrix, node, length, stats) {
  stats.total += length;

  if (matrix[node].length === 0) {
    return
  }

  matrix[node].forEach(n => {
    treeDistance(matrix, n, length + 1, stats)
  });
}

function printTree(matrix, node, length) {
  console.log(' '.repeat(length), node);

  if (matrix[node].length === 0) {
    return;
  }

  matrix[node].forEach(n => {
    printTree(matrix, n, length + 1)
  })
}

function findParent(matrixEntries, node) {
  const entry = matrixEntries.find(entry => entry[1].find(n => n === node));
  return entry ? entry[0] : null;
}

const day1 = new Day(6, isTest);
day1.task(1, task1);
day1.task(2, task2);
