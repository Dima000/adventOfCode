let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 8, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

function MIPS(instructions) {
  return {
    instructions: [...instructions],
    pointer: 0,
    accumulator: 0,
    visitedPointers: new Set(),
    runOnce() {
      const [instruction, value] = this.instructions[this.pointer].split(' ');
      this[instruction](+value);
    },
    run() {
      while (1) {
        if (this.visitedPointers.has(this.pointer)) {
          return 1;
        }

        if (this.pointer >= this.instructions.length) {
          return 0;
        }

        this.visitedPointers.add(this.pointer);
        this.runOnce();
      }
    },
    jmp(offset) {
      this.pointer += offset;
    },
    acc(value) {
      this.accumulator += value;
      this.jmp(1);
    },
    nop() {
      this.jmp(1);
    },
  }
}

day.task1(data => {
  const mips = new MIPS(data.split('\r\n'));
  mips.run();
  return mips.accumulator;
})

day.task2(data => {
  const lines = data.split('\r\n');

  for (let i = 0; i < lines.length; i++) {
    const instruction = lines[i];
    const linesCopy = [...lines];
    if (instruction.includes('jmp')) {
      linesCopy[i] = instruction.replace('jmp', 'nop');
    }

    if (instruction.includes('nop')) {
      linesCopy[i] = instruction.replace('nop', 'jmp');
    }

    const mips = new MIPS(linesCopy);
    const exitCodeError = mips.run();

    if (!exitCodeError) {
      return mips.accumulator;
    }
  }
})
