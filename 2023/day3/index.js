const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------

function isDigit(c) {
    return c <= '9' && c >= '0';
}


function task1(data) {
    const lines = data.split('\r\n');
    const validNumbers = [];

    function addValidNumber(start, end, i) {
        const top = lines[i - 1]?.substring(start - 1, end + 2) || '';
        const middle = lines[i]?.substring(start - 1, end + 2) || '';
        const bottom = lines[i + 1]?.substring(start - 1, end + 2) || '';

        if (/[^0-9.]/g.test(top + middle + bottom)) {
            validNumbers.push(Number(lines.at(i).substring(start, end + 1)));
        }
    }

    let jStart = -1;
    let inProgress = false;
    for (let i = 0; i < lines.length; i++)
        for (let j = 0; j < lines[0].length; j++) {
            const isDigit = Number.isInteger(+lines[i][j]);

            if (isDigit && !inProgress) {
                jStart = j;
                inProgress = true;
            } else if (!isDigit && inProgress) {
                inProgress = false;
                const jEnd = j - 1;
                addValidNumber(jStart, jEnd, i);
            }

            if (j === lines[0].length - 1 && inProgress) {
                inProgress = false;
                addValidNumber(jStart, j, i);
            }
        }

    return validNumbers.reduce((sum, nr) => sum + nr, 0);
}

function task2(data) {
    const lines = data.split('\r\n');
    let sum = 0;

    function findLeft(line, i) {
        const nr = [];
        while (i >= 0 && isDigit(line[i])) {
            nr.unshift(line[i]);
            i--;
        }

        return nr ? Number(nr.join('')) : null;
    }

    function findRight(line, i) {
        const nr = [];
        while (i < line.length && isDigit(line[i])) {
            nr.push(line[i]);
            i++;
        }

        return nr ? Number(nr.join('')) : null;
    }

    function findMiddle(line, i) {
        if (!line) {
            return [null];
        }

        if (isDigit(line[i])) {
            const nr = [line[i]];

            let k = i - 1;
            while (k >= 0 && isDigit(line[k])) {
                nr.unshift(line[k]);
                k--;
            }

            let z = i + 1;
            while (z < line.length && isDigit(line[z])) {
                nr.push(line[z]);
                z++;
            }

            return [nr ? Number(nr.join('')) : null];
        }

        const left = findLeft(line, i - 1);
        const right = findRight(line, i + 1);

        return [left, right]
    }

    for (let i = 0; i < lines.length; i++)
        for (let j = 0; j < lines[0].length; j++) {
            const char = lines[i][j];

            if (char !== '*') {
                continue;
            }

            let numbers = [];
            numbers.push(...findMiddle(lines[i - 1], j));
            numbers.push(findLeft(lines[i], j - 1));
            numbers.push(findRight(lines[i], j + 1));
            numbers.push(...findMiddle(lines[i + 1], j));

            numbers = numbers.filter(nr => nr);

            if (numbers.length === 2) {
                sum += numbers[0] * numbers[1];
            }
        }

    return sum;
}

new DayNew(2023, 3, task1, task2);
