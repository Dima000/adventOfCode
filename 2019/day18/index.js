let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let Matrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));
let { findPathToKeys, findMainDijkstra, findMain } = require('./main');
let _ = require('lodash');

let isTest = false;
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
    const nextKeys = findPathToKeys(_.cloneDeep(matrix), key.key, key.i, key.j);

    res[key.key] = Object.values(nextKeys);
    return res;
  }, {});


  // Run main loop, pass nodes instead of matrix, also use caching
  const { x, y } = matrix.findCoordinates(ENTRANCE);
  return findMain(allKeys, new Map(), ENTRANCE, x, y, []);
}


function task2(data) {
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
    const nextKeys = findPathToKeys(_.cloneDeep(matrix), key.key, key.i, key.j);

    res[key.key] = Object.values(nextKeys);
    return res;
  }, {});


  // Run main loop, pass nodes instead of matrix, also use caching

  return findMainDijkstra(allKeys, matrix);
}

let day = new Day(2019,  18, isTest);
day.task(1, task1);
day.task(2, task2);
