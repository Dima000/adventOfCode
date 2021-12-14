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

    lines.split('\r\n').forEach(line => {
        const [key, elem] = line.split(' -> ');
        rules.set(key, [`${key[0]}${elem}`, `${elem}${key[1]}`]);
        counts.set(key, 0);
    });

    for (let i = 0; i < start.length - 1; i++) {
        const current = start[i] + start[i + 1];
        counts.set(current, counts.get(current) + 1);
    }

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

    let groupedCounts = Array.from(counts.entries()).reduce((acc, entry) => {
        const [[firstLetter, secondLetter], count] = entry;
        acc[firstLetter] = (acc[firstLetter] || 0) + count;
        acc[secondLetter] = (acc[secondLetter] || 0) + count;
        return acc;
    }, {});

    groupedCounts = Object.entries(groupedCounts).reduce((acc, entry) => {
        const [letter, count] = entry;
        acc[letter] = Math.ceil(count / 2);
        return acc;
    }, {});

    const sortedGroupedCounts = Object.values(groupedCounts).sort((a, b) => a - b);
    return sortedGroupedCounts[sortedGroupedCounts.length - 1] - sortedGroupedCounts[0];
}

new Day(2021, 15, isTest, false, task1);