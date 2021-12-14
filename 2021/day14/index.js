let isTest = false;
const path = require('path');
const _ = require('lodash');
const Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));

// Solution below
// -------------------------------------------------------------------------------------

function task1(data) {
    const [start, lines] = data.split('\r\n\r\n');
    const rules = new Map();
    let counts = new Map();

    // populate rules
    lines.split('\r\n').forEach(line => {
        const [key, elem] = line.split(' -> ');
        rules.set(key, [`${key[0]}${elem}`, `${elem}${key[1]}`]);
        counts.set(key, 0);
    });

    // populate initial groups count
    for (let i = 0; i < start.length - 1; i++) {
        const current = start[i] + start[i + 1];
        counts.set(current, counts.get(current) + 1);
    }

    // main loop
    for (let k = 0; k < 40; k++) {
        const newCounts = new Map();
        Array.from(counts.entries()).forEach(entry => {
            const [group, count] = entry;

            const [next1, next2] = rules.get(group);
            newCounts.set(next1, count + (newCounts.get(next1) || 0));
            newCounts.set(next2, count + (newCounts.get(next2) || 0));
        });
        counts = newCounts;
    }

    let lettersCount = Array.from(counts.entries()).reduce((acc, entry) => {
        const [[firstLetter, secondLetter], count] = entry;
        acc[firstLetter] = (acc[firstLetter] || 0) + count;
        acc[secondLetter] = (acc[secondLetter] || 0) + count;
        return acc;
    }, {});

    const sorted = Object.values(lettersCount)
        .map(value => Math.ceil(value / 2))
        .sort((a, b) => a - b);

    return sorted[sorted.length - 1] - sorted[0];
}

new Day(2021, 14, isTest, false, task1);