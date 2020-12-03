let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
const Amplifier = require(path.join(__dirname, '..', 'helpers', 'Amplifier'));
const { addLogs } = require(path.join(__dirname, '..', 'helpers', 'intCodeCalculator'));
const { printGraphMatrix } = require(path.join(__dirname, '..', '..', 'helpers', 'matrix'));

let isTest = false;

let ORIENTATION = ['U', 'R', 'D', 'L'];
let DIRECTIONS = {
  U: { offsetX: 0, offsetY: 1 },
  D: { offsetX: 0, offsetY: -1 },
  L: { name: 'left', offsetX: -1, offsetY: 0 },
  R: { name: 'right', offsetX: 1, offsetY: 0 },
};

function paint(data, startInput) {
  const regs = data.split(',').map(n => +n);
  let map = { '0#0': startInput };
  let x = 0, y = 0;
  let orientationIndex = 0;

  let intCode = new Amplifier(0, regs);
  while (1) {
    let key = `${x}#${y}`;
    let { halt, output } = intCode.run(map[key] || 0);
    if (halt) {
      break;
    }
    let turnLeft = intCode.run().output;

    // Update state values
    map[key] = output;
    orientationIndex += turnLeft ? -1 : 1;
    orientationIndex = (orientationIndex + 4) % 4;

    const { offsetX, offsetY } = DIRECTIONS[ORIENTATION[orientationIndex]];
    x += offsetX;
    y += offsetY;
  }

  return map;
}

function task1(data) {
  let map = paint(data, 0);
  return Object.keys(map).length;
}

function task2(data) {
  const stopLogs = addLogs('output.txt');

  let map = paint(data, 1);

  stopLogs();

  for (let [key, value] of Object.entries(map)) {
    if (value === 1) {
      map[key] = '#'
    }
    if (value === 0) {
      map[key] = ' '
    }
  }

  printGraphMatrix(map);
}

let day = new Day(2019,  11, isTest);
day.task(1, task1);
day.task(2, task2);
