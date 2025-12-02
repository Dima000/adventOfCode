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
    const turns = +line.match(/\d+/)[0];

    start += isLeft ? -turns : turns;
    start = (start + 100) % 100; // normalize the negative value

    if(start === 0) {
        timesZero++;
    }
});

console.log(timesZero);
