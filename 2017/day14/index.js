let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));

let isTest = true;

Array.prototype.last = function () {
  return this[this.length - 1];
}
const FACTOR_A = 16807;
const FACTOR_B = 48271;
const MAX_16_BIT = 65536;

function task1(data) {
  let [prevA, prevB] = data.match(/\d+/g).map(n => +n);

  let total = 0;
  for (let i = 0; i <= 5; i++) {
    prevA = generate(prevA, FACTOR_A);
    prevB = generate(prevB, FACTOR_B);

    if (valuesAreEqual(prevA, prevB)) {
      total += 1;
    }
  }

  return total
}

function task2(data) {
  return ''
}

function generate(prev, factor) {
  return (prev * factor) % 2147483647;
}

function valuesAreEqual(valA, valB) {
  return valA % MAX_16_BIT === valB & MAX_16_BIT
}

const day1 = new Day(2017, 14, isTest);
day1.task(1, task1);
day1.task(2, task2);
