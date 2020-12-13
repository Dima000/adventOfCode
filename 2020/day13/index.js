let isTest = true;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 13, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
  let [timestampString, numbersLine] = data.split('\r\n');
  let timestamp = +timestampString;
  let numbers = numbersLine.split(',').filter(n => n !== 'x').map(n => +n);

  let depart = timestamp;
  while (1) {
    let departBus = numbers.find(n => depart % n === 0);
    if (departBus) {
      return (depart - timestamp) * departBus
    }
    depart += 1
  }
})

day.task2(data => {
  let [timestampString, numbersLine] = data.split('\r\n');
  let numbers = [];
  numbersLine.split(',').forEach((n, index) => {
    if (n !== 'x') {
      numbers.push({ number: +n, index })
    }
  });
  numbers.sort((a, b) => b.number - a.number);
  let biggestNr = numbers[0];

  let timestampStart = isTest ? 3000 : 100000000000000;
  let timestamp = Math.floor(timestampStart / biggestNr.number) * biggestNr.number;
  let k = 0;
  while (1) {
    if (validTimestamp(timestamp - biggestNr.index, numbers)) {
      return timestamp;
    }

    if (k % 100000000 === 0) {
      console.log('100M numbers', timestamp)
    }
    timestamp += biggestNr.number;
    k += 1;
  }
})

function validTimestamp(timestamp, numbers) {
  for (let i = 1; i < numbers.length; i++) {
    if (((timestamp + numbers[i].index) % numbers[i].number) !== 0) {
      return false;
    }
  }
  return true;
}
