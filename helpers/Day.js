let path = require('path');
const { logResult } = require(path.join(__dirname, 'general'));
const readFile = require(path.join(__dirname, 'readFile'));

class Day {
  constructor(year, dayNumber, isTest, noTrim) {
    const fileName = isTest ? 'input.test.txt' : 'input.txt';
    let inputPath = path.join(__dirname, '..', `${year}`, `day${dayNumber}`, fileName);

    this.data = readFile(inputPath, noTrim);
  }

  task(taskNumber, callback) {
    console.time(`Time task ${taskNumber}`);
    logResult(callback(this.data), taskNumber);
    console.timeEnd(`Time task ${taskNumber}`);
    console.log();
  }

  task1(callback) {
    this.task(1, callback);
  }

  task2(callback) {
    this.task(2, callback);
  }
}

module.exports = Day;
