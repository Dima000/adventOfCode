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
      return { output: paramValue(regs, n, 1) };
    }
  },
  5: {
    name: 'jump-if-true',
    params: 3,
    func: (n, regs) => {
      let a = paramValue(regs, n, 1);
      let b = paramValue(regs, n, 2);
      if (a) {
        return { jump: b };
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
        return { jump: b };
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

function paramValue(regs, index, paramNr) {
  const op = regs[index];
  const digit = Math.floor(op / Math.pow(10, paramNr + 1)) % 10;
  const pointer = digit === IMMEDIATE ? index + paramNr : regs[index + paramNr];

  return regs[pointer];
}

module.exports = {
  HALT,
  IMMEDIATE,
  CODES
};
