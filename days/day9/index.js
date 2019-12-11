let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
const Amplifier = require(path.join(__dirname, '..', '..', 'helpers', 'Amplifier'));

let isTest = false;

function runDay(data, initialInput) {
  const regs = data.split(',').map(n => +n);
  let intCode = new Amplifier(0, regs, initialInput);

  let output = null;
  while (1) {
    const result = intCode.run();
    if (result === 'halt') {
      return output;
    }

    output = result;
    console.log(output);
  }

  return output;
}

function task1(data) {
  return runDay(data, 1);
}

function task2(data) {
  return runDay(data, 2);
}


const day1 = new Day(9, isTest);
day1.task(1, task1);
day1.task(2, task2);
