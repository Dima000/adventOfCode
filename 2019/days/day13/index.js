let path = require('path');
let Day = require(path.join(__dirname, '..', '..', '..', 'helpers', 'Day'));
let Amplifier = require(path.join(__dirname, '..', '..', 'helpers', 'Amplifier'));
const { printGraphMatrix } = require(path.join(__dirname, '..', '..', '..', 'helpers', 'matrix'));

let isTest = false;

const BALL = 4;
const PADDLE = 3;

function task1(data) {
  const regs = data.split(',').map(n => +n);
  const matrix = {};

  let intCode = new Amplifier('day13', regs);

  while (1) {
    const run = intCode.run();
    if (run.halt) {
      break;
    }

    const j = +run.output;
    const i = +intCode.run().output;
    const item = +intCode.run().output;

    let key = `${j}#${i}`;
    matrix[key] = item;
  }

  printGraphMatrix(matrix, true, { 0: ' ', 3: '_', 4: '\u25CF' });
  return Object.values(matrix).filter(n => n === 2).length;
}

function task2(data) {
  const regs = data.split(',').map(n => +n);
  regs[0] = 2;

  let intCode = new Amplifier('day13', regs);

  let ball = null;
  let paddle = null;
  let input = 0;
  let score = 0;

  while (1) {
    const run = intCode.run(input);
    if (run.halt) {
      break;
    }

    const x = +run.output;
    const y = +intCode.run(input).output;
    const item = +intCode.run(input).output;

    if (item === BALL) {
      ball = { x };
    }
    if (item === PADDLE) {
      paddle = { x }
    }

    if (ball && paddle) {
      input = paddle.x < ball.x ? 1 : (paddle.x > ball.x ? -1 : 0)
    }

    if (x === -1 && y === 0) {
      score = item;
    }
  }

  return score;
}


let day = new Day(2019,  13, isTest);
day.task(1, task1);
day.task(2, task2);
