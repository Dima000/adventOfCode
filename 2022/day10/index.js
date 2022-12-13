const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------

function task1(data) {
    const lines = data.split('\r\n');
    const signals = [20, 60, 100, 140, 180, 220];
    let signalStrength = [];
    let pointer = 0;
    let x = 1;
    let i = 1;

    let memory = null;
    let matrix = new Array(240).fill('.');
    while (i < 240) {
        const modOffset = Math.abs((i % 40) - x - 1);
        matrix[i - 1] = modOffset <= 1 ? '#' : ' ';

        if (signals.includes(i)) {
            signalStrength.push(x * i);
        }

        if (typeof memory === 'number') {
            x += memory;
            memory = null;
            pointer += 1;
        } else {
            const line = lines[pointer];
            pointer = (lines.length + pointer) % lines.length;
            if (line !== 'noop') {
                const [_, value] = line.split(' ');
                memory = Number(value);
            } else {
                pointer += 1;
            }
        }

        i += 1;
    }

    for (let i = 0; i < 240; i += 40) {
        console.log(matrix.slice(i, i + 40).join(''));
    }
    return signalStrength.reduce((acc, i) => acc + i, 0);
}

function task2(data) {
    return '';
}

new DayNew(2022, 10, task1, task2);
