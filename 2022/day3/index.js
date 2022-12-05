const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------

function intersection(set1, set2) {
    return new Set([...set1].filter((x) => set2.has(x)));
}

function letterToPriority(letter) {
    if (letter >= 'a' && letter <= 'z') {
        return letter.charCodeAt(0) - 97 + 1;
    }

    return letter.charCodeAt(0) - 65 + 27;
}

// split data into list of 2 sets
// find the common letter in the 2 sets
// make a map to get the number of priority from the letter
// sum priorities
function task1(data) {
    const priorities = data
        .split('\r\n')
        .map(line => {
            const sub1 = line.substring(0, line.length / 2);
            const sub2 = line.substring(line.length / 2)
            const set1 = new Set(sub1.split(''));
            const set2 = new Set(sub2.split(''));
            const inter = intersection(set1, set2);

            return Array.from(inter).at(0);
        })
        .map(letterToPriority)

    return priorities.reduce((acc, i) => acc + i, 0);
}

function task2(data) {
    const priorities = [];
    const lines = data.split('\r\n');

    for (let i = 0; i < lines.length; i += 3) {
        const set1 = new Set(lines[i].split(''));
        const set2 = new Set(lines[i + 1].split(''));
        const set3 = new Set(lines[i + 2].split(''));

        const interAux = intersection(set1, set2);
        const inter = intersection(interAux, set3);

        const priority = letterToPriority(Array.from(inter).at(0));
        priorities.push(priority);
    }

    return priorities.reduce((acc, i) => acc + i, 0);
}

new DayNew(2022, 3, task1, task2);
