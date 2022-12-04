let path = require('path');
const readFile = require(path.join(__dirname, 'readFile'));

class DayNew {
    constructor(year, dayNumber, task1, task2, noTrim, showTime) {
        let inputPathTest = path.join(__dirname, '..', `${year}`, `day${dayNumber}`, 'input.test.txt');
        let inputPath = path.join(__dirname, '..', `${year}`, `day${dayNumber}`, 'input.txt');

        const data = readFile(inputPath, noTrim);
        const dataTest = readFile(inputPathTest, noTrim);

        if (task1) {
            this.task(task1, 1, dataTest, showTime, true);
            this.task(task1, 1, data, showTime, false);
        }
        if (task2) {
            this.task(task2, 2, dataTest);
            this.task(task2, 2, data, false);
        }
    }

    task(callback, taskNumber, data, showTime, isTest) {
        console.time(`Time ${isTest ? 'test' : ''} part ${taskNumber}`);
        console.log(`${isTest ? 'Test part' : 'Part'} ${taskNumber}:\x1b[36m`, callback(data), '\x1b[0m');
        if (showTime) {
            console.timeEnd(`Time ${isTest ? 'test' : ''} part ${taskNumber}`);
        }
    }
}

module.exports = DayNew;
