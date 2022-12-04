let path = require('path');
const DayNew = require(path.join(__dirname, 'dayNew'));

class Day {
    constructor(year, dayNumber, isTest, noTrim, task1, task2) {
        new DayNew(year, dayNumber, task1, task2, noTrim);
    }
}

module.exports = Day;
