const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------

function parseData(data) {
    let [grid, moves] = data.split('\r\n\r\n');

    let dataLines = grid.split('\r\n');
    const lastLine = dataLines.pop();
    const nrOfColumns = Number(lastLine.match(/\d$/));

    const maxLineLength = Math.max(...dataLines.map(l => l.length));
    const dataMatrix = dataLines
        .map(line => line.padEnd(maxLineLength))
        .map(line => {
            let s = line;
            s = s.replace(/^   /, '[#]');
            for (let i = 0; i < nrOfColumns; i++) {
                s = s.replace(/]    /, '] [#]');
            }
            return s;
        })
        .map(line => line.split(' '));

    let columns = new Array(nrOfColumns);
    dataMatrix.reverse();
    for (let i = 0; i < dataMatrix.length; i++) {
        for (let j = 0; j < nrOfColumns; j++) {
            const arr = columns[j] || [];
            const char = dataMatrix[i][j].substring(1, 2);
            if (char !== '#') {
                arr.push(char);
            }
            columns[j] = arr;
        }
    }
    /* Obtained an array of columns */

    moves = moves.split('\r\n').filter(s => s).map(move => {
        const match = move.match(/move (\d+) from (\d+) to (\d+)/);
        const size = Number(match[1]);
        const from = match[2] - 1;
        const to = match[3] - 1;

        return { size, from, to };
    });

    return { columns, moves };
}

function task1(data) {
    const { columns, moves } = parseData(data);

    moves.forEach(({ size, from, to }) => {
        for (let i = 0; i < size; i++) {
            let item = columns[from].pop();
            columns[to].push(item);
        }
    })

    return columns.map(arr => arr.at(-1)).join('');
}

function task2(data) {
    const { columns, moves } = parseData(data);

    moves.forEach(({ size, from, to }) => {
        const stack = [];
        for (let i = 0; i < size; i++) {
            let item = columns[from].pop();
            stack.push(item);
        }

        stack.reverse();
        columns[to].push(...stack);
    })

    return columns.map(arr => arr.at(-1)).join('');
}

new DayNew(2022, 5, task1, task2, true);
