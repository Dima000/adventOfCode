import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */
// 123 328  51 64
// 45 64  387 23
// 6 98  215 314
// *   +   *   +

const lines = content.split('\n');

const numbers = lines.slice(0, -1).map(line => line.match(/\d+/g).map(Number));
const symbols = lines.at(-1).match(/[*+]/g);

let sum = 0;
for (let i = 0; i < numbers[0].length; i++) {
    const isProduct = symbols[i] === '*'
    let localResult = isProduct ? 1 : 0;
    for (let j = 0; j < numbers.length; j++) {
        if (isProduct) {
            localResult *= numbers[j][i];
        } else {
            localResult += numbers[j][i];
        }
    }

    sum += localResult;
}
console.log(sum)