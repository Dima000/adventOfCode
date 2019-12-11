const fs = require('fs');
let withLogs = false;
let fileStream = null;

function addLogs() {
  withLogs = true;
  fileStream = fs.createWriteStream('output.txt');

  return () => {
    fileStream.end();
    withLogs = false
  }
}


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

      if (withLogs) {
        fileStream.write(`Op: ${regs[n]}  a: ${a}  b: ${b}  c: ${c}`);
        fileStream.write('\n');
      }
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

      if (withLogs) {
        fileStream.write(`Op: ${regs[n]}  a: ${a}  b: ${b}  c: ${c}`);
        fileStream.write('\n');
      }
    }
  },
  3: {
    name: 'set',
    params: 2,
    func: (n, regs, IO, relativeBase) => {
      let a = paramValue(regs, n, 1, relativeBase, true);
      regs[a] = IO;

      if (withLogs) {
        fileStream.write(`Op: ${regs[n]}  a: ${a} input: ${IO}`);
        fileStream.write('\n');
      }
    }
  },
  4: {
    name: 'get',
    params: 2,
    func: (n, regs, IO, relativeBase) => {
      let a = paramValue(regs, n, 1, relativeBase);

      if (withLogs) {
        fileStream.write(`Op: ${regs[n]}  a: ${a}`);
        fileStream.write('\n');
      }

      return { output: a };
    }
  },
  5: {
    name: 'jump-if-true',
    params: 3,
    func: (n, regs, IO, relativeBase) => {
      let a = paramValue(regs, n, 1, relativeBase);
      let b = paramValue(regs, n, 2, relativeBase);

      if (withLogs) {
        fileStream.write(`Op: ${regs[n]}  a: ${a}  b: ${b}`);
        fileStream.write('\n');
      }
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

      if (withLogs) {
        fileStream.write(`Op: ${regs[n]}  a: ${a}  b: ${b}`);
        fileStream.write('\n');
      }

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

      if (withLogs) {
        fileStream.write(`Op: ${regs[n]}  a: ${a}  b: ${b}  c: ${c}`);
        fileStream.write('\n');
      }
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

      if (withLogs) {
        fileStream.write(`Op: ${regs[n]}  a: ${a}  b: ${b}  c: ${c}`);
        fileStream.write('\n');
      }
    }
  },
  9: {
    name: 'relative-base',
    params: 2,
    func: (n, regs, IO, relativeBase) => {
      let a = paramValue(regs, n, 1, relativeBase);

      if (withLogs) {
        fileStream.write(`Op: ${regs[n]}  a: ${a}`);
        fileStream.write('\n');
      }

      return { 'relative-base': relativeBase + a };
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
  CODES,
  addLogs
};
