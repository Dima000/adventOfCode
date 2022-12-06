const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------

function task1(data) {
    let i;
    for (i = 4; i < data.length - 4; i++) {
        const sub = data.substring(i - 4, i);
        if (new Set(sub.split('')).size === 4) {
            break;
        }
    }
    return i;
}

function task2(data) {
    let i;
    for (i = 14; i < data.length - 14; i++) {
        const sub = data.substring(i - 14, i);
        if (new Set(sub.split('')).size === 14) {
            break;
        }
    }
    return i;
}

new DayNew(2022, 6, task1, task2);
