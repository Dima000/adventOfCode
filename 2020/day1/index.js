let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');

let isTest = false;

function task1(data) {
  let numbers = data.split('\r\n').map(i => +i);
  let L = numbers.length;

  let indexes = [];
  for (let i = 0; i < L - 2; i++)
    for (let j = 1; j < L - 1; j++)
      for (let k = 2; k < L; k++)
        if (numbers[i] + numbers[j] + numbers[k] === 2020) {
          indexes = [i, j, k];
          break;
        }

  return indexes.reduce((res, itemIndex) => res * numbers[itemIndex], 1);
}

function task2(data) {
  return ''
}


const day = new Day(2020, 1, isTest);
day.task(1, task1);
day.task(2, task2);
