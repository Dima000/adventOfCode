let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let isTest = true;

const day1 = new Day(1, isTest);
day1.task(1, task1);
day1.task(2, task2);


function task1(data) {
  return data;
}

function task2(data) {
  return data;
}
