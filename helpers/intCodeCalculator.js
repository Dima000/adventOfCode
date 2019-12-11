const HALT = 99;
const IMMEDIATE = 1;
const RELATIVE_BASE = 2;
const CODES = {
  1: {
    name: 'add',
    params: 4,
    func: (n, regs, IO, relativeBase) => {
      let a = paramValue(regs, n, 1, relativeBase);
      let b = paramValue(regs, n, 2, relativeBase);
      let c = paramValue(regs, n, 3, relativeBase, true);
      regs[c] = a + b;
    }
  },
  2: {
    name: 'mul',
    params: 4,
    func: (n, regs, IO, relativeBase) => {
      let a = paramValue(regs, n, 1, relativeBase);
      let b = paramValue(regs, n, 2, relativeBase);
      let c = paramValue(regs, n, 3, relativeBase, true);
      regs[c] = a * b;
    }
  },
  3: {
    name: 'set',
    params: 2,
    func: (n, regs, IO, relativeBase) => {
      let index = paramValue(regs, n, 1, relativeBase, true);
      regs[index] = IO;
    }
  },
  4: {
    name: 'get',
    params: 2,
    func: (n, regs, IO, relativeBase) => {
      return { output: paramValue(regs, n, 1, relativeBase) };
    }
  },
  5: {
    name: 'jump-if-true',
    params: 3,
    func: (n, regs, IO, relativeBase) => {
      let a = paramValue(regs, n, 1, relativeBase);
      let b = paramValue(regs, n, 2, relativeBase);
      if (a) {
        return { jump: b };
      }
    }
  },
  6: {
    name: 'jump-if-false',
    params: 3,
    func: (n, regs, IO, relativeBase) => {
      let a = paramValue(regs, n, 1, relativeBase);
      let b = paramValue(regs, n, 2, relativeBase);
      if (!a) {
        return { jump: b };
      }
    }
  },
  7: {
    name: 'less-than',
    params: 4,
    func: (n, regs, IO, relativeBase) => {
      let a = paramValue(regs, n, 1, relativeBase);
      let b = paramValue(regs, n, 2, relativeBase);
      let c = paramValue(regs, n, 3, relativeBase, true);
      regs[c] = a < b ? 1 : 0;
    }
  },
  8: {
    name: 'equals',
    params: 4,
    func: (n, regs, IO, relativeBase) => {
      let a = paramValue(regs, n, 1, relativeBase);
      let b = paramValue(regs, n, 2, relativeBase);
      let c = paramValue(regs, n, 3, relativeBase, true);
      regs[c] = a === b ? 1 : 0;
    }
  },
  9: {
    name: 'relative-base',
    params: 2,
    func: (n, regs, IO, relativeBase) => {
      return { 'relative-base': relativeBase + paramValue(regs, n, 1, relativeBase) };
    }
  }
};

function paramValue(regs, index, paramNr, relativeBase, returnPointer) {
  const op = regs[index];
  const mode = Math.floor(op / Math.pow(10, paramNr + 1)) % 10;

  let pointer = regs[index + paramNr];

  if (mode === IMMEDIATE) {
    pointer = index + paramNr;
  }

  if (mode === RELATIVE_BASE) {
    pointer = regs[index + paramNr] + relativeBase;
  }

  return returnPointer ? pointer : regs[pointer] || 0;
}

module.exports = {
  HALT,
  IMMEDIATE,
  CODES
};
