let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));

let isTest = false;

const END = 99;
const ADD = 1;
const MUL = 2;

function task1(data, noun = 12, verb = 2) {
  const regs = data.split(',').map(n => +n);
  regs[1] = noun;
  regs[2] = verb;

  for (let i = 0; i < regs.length - 4; i += 4) {
    const op = regs[i];
    const a = regs[i + 1];
    const b = regs[i + 2];
    const c = regs[i + 3];

    if (op === ADD) {
      regs[c] = regs[a] + regs[b]
    }
    if (op === MUL) {
      regs[c] = regs[a] * regs[b]
    }
    if (op === END) {
      break;
    }
  }

  return regs[0];
}

function task2(data) {
  const FINAL = 19690720;

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      let c = task1(data, noun, verb);

      if (c === FINAL) {
        return noun * 100 + verb;
      }
    }
  }
}


const day = new Day(2, isTest);
day.task(1, task1);
day.task(2, task2);
