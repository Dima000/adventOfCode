let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let Matrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));
let IntCode = require(path.join(__dirname, '..', 'helpers', 'Amplifier'));
let _ = require('lodash');

let isTest = false;

function task1(data) {
  const regs = data.split(',').map(n => +n);
  let matrix = new Matrix();

  let count = 0;
  for (let i = 50; i < 150; i++) {
    for (let j = 50; j < 150; j++) {
      let intCode = new IntCode('name', [...regs]);
      let run = intCode.run([i, j], [...regs], true);
      matrix.set(j, i, run.output);
      if (run.output) {
        count += 1;
      }
    }
  }

  // matrix.print();

  return count;
}

function task2(data) {
  const regs = data.split(',').map(n => +n);
  const GRID_SIZE = 99;

  let i = 300, j;

  while (1 && i < 2000) {
    let finished = false;

    for (let k = i - 200; k <= i + 300; k++) {
      const NW = hasValue(i, k - GRID_SIZE, regs);
      if (!NW) {
        continue;
      }

      const NE = hasValue(i, k, regs);
      if (!NE) {
        continue;
      }

      const SW = hasValue(i + GRID_SIZE, k - GRID_SIZE, regs);
      if (!SW) {
        continue;
      }


      if (NE && SW && NW) {
        j = k - GRID_SIZE;
        finished = true;
        break;
      }
    }

    if (finished) {
      break;
    }

    i += 1;
    if (i % 100 === 0) {
      console.log(i);
    }
  }

  console.log(i, j);
  return i * 10000 + j;
}

function hasValue(i, j, regs) {
  let intCode = new IntCode('name', [...regs]);
  let run = intCode.run([i, j], [...regs], true);
  return run.output;
}


let day = new Day(2019,  19, isTest);
day.task(1, task1);
day.task(2, task2);
