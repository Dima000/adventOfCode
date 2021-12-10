let isTest = false;
const path = require('path');
const Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));

/* -------------------------------------------------------------------------------------
* Solution below
* ------------------------------------------------------------------------------------- */

const VALUE_MAP = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

const VALUE_MAP_2 = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
}

function task1(data) {
    return data
        .split('\r\n')
        .map(findCorruptedChar)
        .filter(value => value.errorChar)
        .reduce((sum, value) => sum + VALUE_MAP[value.errorChar], 0);
}

function task2(data) {
    const sortedValues = data
        .split('\r\n')
        .map(findCorruptedChar)
        .filter(value => value.endingChars)
        .map(value => value.endingChars.reduce((acc, char) => acc * 5 + VALUE_MAP_2[char], 0))
        .sort((a, b) => a - b);

    return sortedValues[Math.floor(sortedValues.length / 2)];
}

function findCorruptedChar(line) {
    const start = ['(', '[', '{', '<'];
    const end = [')', ']', '}', '>'];
    const times = [0, 0, 0, 0];
    const last = [];

    for (let char of line) {
        if (start.includes(char)) {
            const startIndex = start.indexOf(char);
            times[startIndex] += 1;
            last.push(char);
        }

        if (end.includes(char)) {
            const lastStart = last.pop();
            const lastStartIndex = start.indexOf(lastStart);

            if (end.indexOf(char) === lastStartIndex) {
                times[lastStartIndex] += -1;
            } else {
                return { errorChar: char };
            }
        }
    }

    return {
        endingChars: last.reverse().map((char) => end[start.indexOf(char)])
    }
}

new Day(2021, 10, isTest, false, task1, task2);