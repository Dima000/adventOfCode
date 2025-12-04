import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */
console.time('execution time');

const instructions = content.match(/mul\(\d{1,3},\d{1,3}\)/g);
const products = instructions.map(instruction => {
    const [a, b] = instruction.match(/\d+/g).map(Number);
    return a * b;
});

console.log(products.reduce((sum, product) => sum + product, 0));
console.timeEnd('execution time');