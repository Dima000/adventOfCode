import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */
console.time('execution time');
const lines = content.split('\n');

const left: number[] = [];
const right: number[] = [];

lines.forEach(line => {
    const [leftNum, rightNum] = line.split('   ').map(Number);
    left.push(leftNum);
    right.push(rightNum);
});

let result = 0;
left.forEach((leftNum) => {
    const times = right.filter(rightNum => rightNum === leftNum).length;
    result += leftNum * times;
});

console.log(result);
console.timeEnd('execution time');