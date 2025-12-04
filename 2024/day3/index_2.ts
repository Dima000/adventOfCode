import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */
console.time('execution time');

const validSegments = content.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g);

let sum = 0;
let enabled = true;
validSegments.forEach(segment => {
    if (segment === "don't()") {
        enabled = false;
    } else if (segment === "do()") {
        enabled = true;
    } else if (enabled) {
        const [a, b] = segment.match(/\d+/g).map(Number);
        sum += a * b;
    }
})
console.log(sum);
console.timeEnd('execution time');