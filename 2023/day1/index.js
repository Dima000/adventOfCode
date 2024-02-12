const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------

function task1(data) {
    return '';
}

function task2(data) {
    return data.split('\r\n')
        .map(line => {
            const digits = Array.from(
                line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g), (match) => match[1]
            )
            const first = toDigit(digits[0]);
            const last = toDigit(digits.at(-1));
            const number = Number(`${first}${last}`);
            console.log(line, digits.join(), number);
            return number;
        })
        .reduce((acc, nr) => acc + nr, 0)
}

function toDigit(n) {
    const digitMap = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
    }

    return digitMap[n] || n;
}

new DayNew(2023, 1, task1, task2);
