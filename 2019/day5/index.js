let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');

let isTest = false;

const HALT = 99;
const IMMEDIATE = 1;
const CODES = {
  1: {
    name: 'add',
    params: 4,
    func: (n, regs) => {
      let a = paramValue(regs, n, 1);
      let b = paramValue(regs, n, 2);
      let c = regs[n + 3];
      regs[c] = a + b;
    }
  },
  2: {
    name: 'mul',
    params: 4,
    func: (n, regs) => {
      let a = paramValue(regs, n, 1);
      let b = paramValue(regs, n, 2);
      let c = regs[n + 3];
      regs[c] = a * b;
    }
  },
  3: {
    name: 'set',
    params: 2,
    func: (n, regs, IO) => {
      regs[regs[n + 1]] = IO;
    }
  },
  4: {
    name: 'get',
    params: 2,
    func: (n, regs) => {
      console.log('code', paramValue(regs, n, 1));
    }
  },
  5: {
    name: 'jump-if-true',
    params: 3,
    func: (n, regs) => {
      let a = paramValue(regs, n, 1);
      let b = paramValue(regs, n, 2);
      if (a) {
        return b;
      }
    }
  },
  6: {
    name: 'jump-if-false',
    params: 3,
    func: (n, regs) => {
      let a = paramValue(regs, n, 1);
      let b = paramValue(regs, n, 2);
      if (!a) {
        return b;
      }
    }
  },
  7: {
    name: 'less-than',
    params: 4,
    func: (n, regs) => {
      let a = paramValue(regs, n, 1);
      let b = paramValue(regs, n, 2);
      let c = regs[n + 3];
      regs[c] = a < b ? 1 : 0;
    }
  },
  8: {
    name: 'equals',
    params: 4,
    func: (n, regs) => {
      let a = paramValue(regs, n, 1);
      let b = paramValue(regs, n, 2);
      let c = regs[n + 3];
      regs[c] = a === b ? 1 : 0;
    }
  }
};

function task1(data) {
  const regs = data.trim().split(',').map(n => +n);
  const input = 1;
  let index = 0;
  let op = regs[0];

  while (op !== HALT) {
    const code = CODES[op % 100];
    code.func(index, regs, input);

    index += code.params;
    op = regs[index];
  }

  return 'RESULT ABOVE';
}

function task2(data) {
  const regs = data.trim().split(',').map(n => +n);
  const input = 5;

  let index = 0;
  let op = regs[0];
  while (op !== HALT) {
    const code = CODES[op % 100];
    const newIndex = code.func(index, regs, input);

    if (_.isNumber(newIndex)) {
      index = newIndex;
    } else {
      index += code.params;
    }

    op = regs[index];
  }

  return 'RESULT ABOVE';
}

function paramValue(regs, index, paramNr) {
  const op = regs[index];
  const digit = Math.floor(op / Math.pow(10, paramNr + 1)) % 10;
  const pointer = digit === IMMEDIATE ? index + paramNr : regs[index + paramNr];

  return regs[pointer];
}


const day = new Day(2019, 5, isTest);
day.task(1, task1);
day.task(2, task2);
