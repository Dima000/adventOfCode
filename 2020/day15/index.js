let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 15, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

function spokenNumber(data, limit) {
  let numbers = data.split(',').map(n => +n);
  let numbersMap = data.split(',').reduce((res, number, index) => {
    res[number] = [index];
    return res;
  }, {});

  let i = numbers.length;
  let lastNumber = numbers[i - 1];
  while (i < limit) {
    const encounterLast = numbersMap[lastNumber] || [];
    let spoken = -1;

    if (encounterLast.length < 2) {
      spoken = 0;
    } else {
      spoken = encounterLast[encounterLast.length - 1] - encounterLast[encounterLast.length - 2];
    }

    let encounterSpoken = numbersMap[spoken] || [];
    if (encounterSpoken.length === 2) {
      numbersMap[spoken] = [encounterSpoken[1], i];
    } else {
      encounterSpoken.push(i);
      numbersMap[spoken] = encounterSpoken;
    }
    lastNumber = spoken;
    i += 1;
  }

  return lastNumber;
}

day.task1(data => {
  return spokenNumber(data, 2020);
})

day.task2(data => {
  return spokenNumber(data, 30000000)
})
