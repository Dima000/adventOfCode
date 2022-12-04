let isTest = false;
const path = require('path');
const Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));

// Solution below
// -------------------------------------------------------------------------------------

function task1(data) {
    const groups = data.split('\r\n\r\n');

    const groupNr = groups.map(g => {
        return g
            .split('\r\n')
            .map(s => s.trim())
            .map(n => +n);
    })


    const maxims = groupNr.map(items => items.reduce((acc, item) => acc + item, 0));
    maxims.sort((a, b) => a - b);

    return maxims.at(-1) + maxims.at(-2) + maxims.at(-3);
}

function task2(data) {
    return '';
}

new Day(2022, 1, isTest, false, task1, task2);
