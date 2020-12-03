let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');

let isTest = false;

function task1(data) {
  const map = data.split('\r\n');
  const offsetI = 1;
  const offsetJ = 3;
  return countMap(map, offsetI, offsetJ);
}

function task2(data) {
  const map = data.split('\r\n');
  const directions = [
    { offsetI: 1, offsetJ: 1 },
    { offsetI: 1, offsetJ: 3 },
    { offsetI: 1, offsetJ: 5 },
    { offsetI: 1, offsetJ: 7 },
    { offsetI: 2, offsetJ: 1 },
  ]

  return directions.reduce((acc, { offsetI, offsetJ }) => acc * countMap(map, offsetI, offsetJ), 1)
}

function countMap(map, offsetI, offsetJ) {
  let i = offsetI;
  let j = offsetJ;
  let sum = 0;

  while (i < map.length) {
    if (map[i][j] === '#') {
      sum += 1;
    }

    i += offsetI;
    j = (j + offsetJ) % map[0].length;
  }

  return sum;
}


const day = new Day(2020, 3, isTest);
day.task(1, task1);
day.task(2, task2);
