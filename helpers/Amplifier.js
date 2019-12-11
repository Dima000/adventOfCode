const { CODES, HALT } = require('./intCodeCalculator');
const _ = require('lodash');

class Amplifier {
  constructor(name, regs) {
    this.name = name;
    this.regs = [...regs];
    this.position = 0;
    this.relativeBase = 0;
    this.input = null;
    this.initialized = false;
  }

  run(input, sequenceNumber, regsData) {
    const regs = regsData || this.regs;

    let op = regs[this.position];
    while (op !== HALT) {
      const code = CODES[op % 100];
      this.input = this.initialized ? input : sequenceNumber;
      if (code.name === 'set') {
        this.initialized = true;

      }
      const result = code.func(this.position, regs, this.input, this.relativeBase);
      this.position = result && result.hasOwnProperty('jump') ? result.jump : this.position + code.params;

      if (result && result.hasOwnProperty('output')) {
        this.input = null;
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
