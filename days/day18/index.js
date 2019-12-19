let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let Matrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));
let _ = require('lodash');

let isTest = true;

const WALL = '#';
const ENTRANCE = '@';
const PATH = '.';
let DIRECTIONS = {
  UP: { name: 'up', offsetX: -1, offsetY: 0 },
  DOWN: { name: 'down', offsetX: 1, offsetY: 0 },
  LEFT: { name: 'left', offsetX: 0, offsetY: -1 },
  RIGHT: { name: 'right', offsetX: 0, offsetY: 1 },
};

function task1(data) {
  const lines = data.split('\r\n');
  let i0, j0;
  let allKeys = [];
  let matrix = new Matrix();

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      const char = lines[i][j];
      if (char === ENTRANCE) {
        i0 = i;
        j0 = j;
      } else if (char.isLowerCase()) {
        allKeys.push(char);
      }

      matrix.set(j, i, char);
    }
  }

  matrix.set(j0, i0, PATH);
  let min = {}
  return findMain(matrix, { i: i0, j: j0 }, [], allKeys);
}

function findMain(matrix, { i, j }, foundKeys, allKeys) {
  if (foundKeys.length === allKeys.length) {
    return 0;
  }

  // find all available keys
  const availableKeys = [];
  findAllAvailableKeys(_.cloneDeep(matrix), i, j, availableKeys);

  // Find minPath for every key
  const minPaths = availableKeys.map(key => {
    const min = findMinPath(_.cloneDeep(matrix), i, j, key, 0);
    return { min, key }
  });

  // update map by removing the key and door and run sub-problem again
  let minLocal = Number.MAX_SAFE_INTEGER;
  minPaths.forEach(({ min, key }) => {
    const nextMatrix = _.cloneDeep(matrix);
    const coords = nextMatrix.findCoordinates(key);
    resetPosition(nextMatrix, key);
    resetPosition(nextMatrix, key.toUpperCase());

    if (minLocal > min) {
      const minKey = findMain(nextMatrix, { i: coords.x, j: coords.y }, [...foundKeys, key], allKeys);
      minLocal = Math.min(minLocal, min + minKey);
    }
  });

  return minLocal;
}

function findAllAvailableKeys(matrix, i, j, keys) {
  let current = matrix.get(j, i);
  if (current.isLowerCase()) {
    keys.push(current);
  }

  matrix.set(j, i, WALL);

  const allowedPositions = findNextPositions(matrix, i, j);

  allowedPositions.forEach(pos => {
    findAllAvailableKeys(matrix, pos.i, pos.j, keys);
  })
}

function findMinPath(matrix, i, j, target, depth) {
  const current = matrix.get(j, i);

  if (current === target) {
    return depth;
  }

  let nextPositions = findNextPositions(matrix, i, j);
  matrix.set(j, i, WALL);

  let min = Number.MAX_SAFE_INTEGER;
  nextPositions.forEach(pos => {
    const stepMin = findMinPath(matrix, pos.i, pos.j, target, depth + 1);
    min = Math.min(min, stepMin);
  });

  return min;
}

function findNextPositions(matrix, i, j) {
  return Object.values(DIRECTIONS)
    .map(dir => ({ i: i + dir.offsetX, j: j + dir.offsetY }))
    .filter(({ i, j }) => {
      const char = matrix.get(j, i);
      return char.isLowerCase() || char === PATH;
    });
}

function resetPosition(matrix, char) {
  const { x, y } = matrix.findCoordinates(char);
  matrix.set(y, x, PATH);
  return { i: x, j: y }
}

function task2(data) {
  return ''
}

String.prototype.isUpperCase = function () {
  return /^[A-Z]*$/.test(this)
};
String.prototype.isLowerCase = function () {
  return /^[a-z]*$/.test(this)
};

const day1 = new Day(18, isTest);
day1.task(1, task1);
day1.task(2, task2);
