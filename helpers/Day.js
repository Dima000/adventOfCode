let path = require('path');
const { logResult } = require(path.join(__dirname, 'general'));
const readFile = require(path.join(__dirname, 'readFile'));
const _ = require('lodash');

class Day {
  constructor(dayNumber, isTest, noTrim) {
    this.dayNumber = dayNumber;
    this.isTest = isTest;

    this.init(noTrim);
  }

  init(noTrim) {
    const fileName = this.isTest ? 'input.test.txt' : 'input.txt';
    let inputPath = path.join(__dirname, '..', 'days', `day${this.dayNumber}`, fileName);

    this.data = readFile(inputPath, noTrim);
  }

  task(taskNumber, callback) {
    console.time(`Time task ${taskNumber}`);
    logResult(callback(this.data), taskNumber);
    console.timeEnd(`Time task ${taskNumber}`);
    console.log();
  }
}

module.exports = Day;
