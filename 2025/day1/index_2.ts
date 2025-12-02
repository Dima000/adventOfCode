import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */
const lines = content.split('\n'); //use '\r\n' for windows

let start = 50;
let timesZero = 0;

lines.forEach(line => {
    const isLeft = line.startsWith('L');
    const steps = +line.match(/\d+/)[0];

    for (let i = 0; i < steps; i++) {
        start += isLeft ? -1 : 1;

        if (start === -1) {
            start = 99;
        }
        if (start === 100) {
            start = 0;
        }
        if (start === 0) {
            timesZero++;
        }
    }

    // console.log(line, start)
});

console.log(timesZero);
