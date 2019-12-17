const { CODES, HALT } = require('./intCodeCalculator');
const _ = require('lodash');

class Amplifier {
  constructor(name, regs, phase) {
    this.name = name;
    this.regs = [...regs];
    this.position = 0;
    this.relativeBase = 0;

    this.phase = phase;
    this.initialized = !_.isNumber(phase);
    this.inputIndex = 0;
  }

  run(input, regsData, isInputArray) {
    const regs = regsData || this.regs;

    let op = regs[this.position];
    while (op !== HALT) {
      const code = CODES[op % 100];
      let localInput = !this.initialized ? this.phase : input;
      if (isInputArray) {
        localInput = input[this.inputIndex];
      }
      if (code.name === 'set') {
        this.initialized = true;
        this.inputIndex += 1;
      }

      const result = code.func(this.position, regs, localInput, this.relativeBase);
      this.position = result && result.hasOwnProperty('jump') ? result.jump : this.position + code.params;

      if (result && result.hasOwnProperty('output')) {
        return { halt: false, output: result.output };
      }

      if (result && result.hasOwnProperty('relative-base')) {
        this.relativeBase = result['relative-base'];
      }

      op = regs[this.position];
    }

    return { halt: true };
  }
}

module.exports = Amplifier;
