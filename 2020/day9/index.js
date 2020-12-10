let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 9, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

function validNumber(start, numbers, size) {
  let sample = numbers.slice(start - size, start)

  for (let i = start - size; i < start; i++) {
    const secondNr = numbers[start] - numbers[i];
    if (_.includes(sample, secondNr)) {
      return true;
    }
  }

  return false;
}

day.task1(data => {
  let numbers = data.split('\r\n').map(n => +n);
  let SIZE = isTest ? 5 : 25;
  let index = SIZE;

  while (validNumber(index, numbers, SIZE)) {
    index += 1;
  }

  return numbers[index];
})

day.task2(data => {
  let numbers = data.split('\r\n').map(n => +n);
  let SIZE = isTest ? 5 : 25;
  let index = SIZE;

  while (validNumber(index, numbers, SIZE)) {
    index += 1;
  }

  const sum = numbers[index];

  for (let i = 0; i < numbers.length - 1; i++) {
    let k = i + 2;
    let subsetSum = 0;
    let slice = [];

    while (subsetSum < sum && k <= numbers.length) {
      slice = numbers.slice(i, k);
      subsetSum = _.sum(slice);
      k += 1;
    }

    if (sum === subsetSum) {
      return _.min(slice) + _.max(slice);
    }
  }
})
