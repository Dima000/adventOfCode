const { CODES, HALT } = require('./intCodeCalculator');
const _ = require('lodash');

class Amplifier {
  constructor(name, regs, seqNumber) {
    this.name = name;
    this.regs = [...regs];
    this.position = 0;
    this.relativeBase = 0;
    this.input = _.isNumber(seqNumber) ? [seqNumber] : [];
  }

  run(input) {
    if (_.isNumber(input)) {
      this.input.push(input);
    }

    let op = this.regs[this.position];
    while (op !== HALT) {
      const code = CODES[op % 100];

      const result = code.func(this.position, this.regs, this.input[0], this.relativeBase);
      this.position = result && result.hasOwnProperty('jump') ? result.jump : this.position + code.params;

      if (result && result.hasOwnProperty('output')) {
        this.input.shift();
        return result.output;
      }

      if (result && result.hasOwnProperty('relative-base')) {
        this.relativeBase = result['relative-base'];
      }

      op = this.regs[this.position];
    }

    return 'halt';
  }
}

module.exports = Amplifier;
