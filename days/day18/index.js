let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let Matrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));
let { findPathToKeys, findMain, memoization } = require('./main');
let _ = require('lodash');

let isTest = true;
const ENTRANCE = '@';

function task1(data) {
  const lines = data.split('\r\n');
  let allKeys = [];
  let matrix = new Matrix();

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      const char = lines[i][j];
      if (char.isLowerCase() || char === ENTRANCE) {
        allKeys.push({ key: char, i, j });
      }

      matrix.set(j, i, char);
    }
  }

  // Find path from a key to all other keys. Treat start as a key
  allKeys = allKeys.reduce((res, key) => {
    const nextKeys = [];
    findPathToKeys(_.cloneDeep(matrix), key.i, key.j, [], nextKeys, 0);

    res[key.key] = nextKeys;
    return res;
  }, {});

  // console.log(allKeys);


  //Run main loop, pass nodes instead of matrix, also use caching
  const { x, y } = matrix.findCoordinates(ENTRANCE);

  return findMain(allKeys, new Map(), ENTRANCE, x, y, []);
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
