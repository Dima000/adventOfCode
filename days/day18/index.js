let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let Matrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));
let { findAllAvailableKeys, findMain, findMinPath, resetPosition } = require('./main');
let _ = require('lodash');

let isTest = false;

const ENTRANCE = '@';
const PATH = '.';

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
  let minDepth = { depth: Number.MAX_SAFE_INTEGER };

  // find all available keys
  let minPaths = [];
  findAllAvailableKeys(_.cloneDeep(matrix), i0, j0, minPaths, 0);
  minPaths = _.sortBy(minPaths, 'min');


  const { key, min } = minPaths[2];
  const coords = matrix.findCoordinates(key);
  resetPosition(matrix, key);
  resetPosition(matrix, key.toUpperCase());

  console.time('Entry');
  const res = findMain(matrix, coords.x, coords.y, [key], allKeys, min, minDepth, 6447);
  return res + min;

  // return findMain(matrix, i0, j0, [], allKeys, 0, minDepth);
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
