let path = require('path');
let _ = require('lodash');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let IntCode = require(path.join(__dirname, '..', '..', 'helpers', 'Amplifier'));
let Matrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));

let isTest = false;

const SCAFFOLD = '#';

function task1(data) {
  const regs = data.split(',').map(n => +n);
  let intCode = new IntCode('name', regs);
  let matrix = new Matrix();

  let i = 0, j = 0;

  while (1) {
    const run = intCode.run();
    if (run.halt) {
      break;
    }

    const char = String.fromCharCode(run.output);
    if (char === '\n') {
      i += 1;
      j = 0;
    } else {
      matrix.set(j, i, char);
      j += 1;
    }
  }

  matrix.print();
  return matrix.entries().reduce((res, [key, value]) => {
    if (value === SCAFFOLD) {
      const [j, i] = key.split('#').map(n => +n);

      const up = matrix.get(j, i - 1);
      const down = matrix.get(j, i + 1);
      const left = matrix.get(j - 1, i);
      const right = matrix.get(j + 1, i);

      if (_.every([up, down, left, right], v => v === SCAFFOLD)) {
        return res + j * i;
      }
    }

    return res;
  }, 0);
}

function task2(data) {
  return ''
}


const day1 = new Day(17, isTest);
day1.task(1, task1);
day1.task(2, task2);
