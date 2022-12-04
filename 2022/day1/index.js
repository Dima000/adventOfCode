let isTest = false;
const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

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

new DayNew(2022, 2, task1);
