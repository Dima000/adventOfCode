let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');
const { permutator } = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
const { CODES, HALT, IMMEDIATE } = require('./intCodeCalculator');

let isTest = false;

function task1(data) {
  const regsData = data.trim().split(',').map(n => +n);
  const sequences = permutator([0, 1, 2, 3, 4]);

  let max = 0;
  let winning = null;
  for (let seq of sequences) {
    let baseInput = 0;
    let regs = [...regsData];

    for (let i = 0; i < 5; i++) {
      baseInput = runIntCode(regs, baseInput, seq[i])
    }

    if (baseInput > max) {
      max = baseInput;
      winning = seq;
    }
  }

  return max;
}

function task2(data) {
}

function runIntCode(regs, baseInput, sequenceInput) {
  let sequenceInputRead = false;
  let output = '';

  let index = 0;
  let op = regs[0];
  while (op !== HALT) {
    const code = CODES[op % 100];
    let input = !sequenceInputRead ? sequenceInput : baseInput;
    if (code.name === 'set') {
      sequenceInputRead = true;
    }

    const result = code.func(index, regs, input);
    index = result && result.hasOwnProperty('jump') ? result.jump : index + code.params;

    if (result && result.hasOwnProperty('output')) {
      return result.output;
    }

    op = regs[index];
  }

  return output;
}


const day = new Day(7, isTest);
day.task(1, task1);
// day.task(2, task2);
