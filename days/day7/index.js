let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');
const { permutator } = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
const Amplifier = require('../../helpers/Amplifier');

let isTest = false;

function task1(data) {
  const regs = data.trim().split(',').map(n => +n);
  const sequences = permutator([0, 1, 2, 3, 4]);

  let max = 0;
  let winning = null;
  for (let seq of sequences) {
    let baseInput = 0;
    let regsData = [...regs];

    for (let i = 0; i < 5; i++) {
      const amp = new Amplifier(0, regs, seq[i]);
      const run = amp.run(baseInput, regsData);
      if (!run.halt) {
        baseInput = run.output;
      }
    }

    if (baseInput > max) {
      max = baseInput;
      winning = seq;
    }
  }

  return max;
}

function task2(data) {
  const regs = data.trim().split(',').map(n => +n);
  const sequences = permutator([5, 6, 7, 8, 9]);
  let max = 0;
  let winning = null;

  for (let seq of sequences) {
    let aIndex = 0;
    let input = 0;
    let run = 0;
    const amps = seq.map((seqNumber, index) => new Amplifier(index, regs, seqNumber));

    while (1) {
      const newInput = amps[aIndex].run(input);

      if (newInput.halt && aIndex === 4) {
        break;
      } else {
        if (!newInput.halt) {
          input = newInput.output;
        }
        aIndex = (aIndex + 1) % 5
      }
      run += 1;
    }

    if (input > max) {
      max = input;
      winning = seq;
    }
  }

  console.log('Max', max, 'Sequence', winning);
  return max;
}

const day = new Day(7, isTest);
day.task(1, task1);
day.task(2, task2);
