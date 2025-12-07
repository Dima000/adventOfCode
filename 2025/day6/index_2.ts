import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test') || true;
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */
const lines = content.split('\n');
const symbols = lines.at(-1).match(/[*+]/g).reverse();
const numbersLines = lines.slice(0, -1);

let numbers = [];
let group = [];
for (let j = numbersLines[0].length - 1; j >= 0; j--) {
    let number = '';
    for (let i = 0; i < numbersLines.length; i++) {
        number += numbersLines[i][j];
    }

    //create beams variants
    if (number.trim() === '') {
        numbers.push(group);
        group = [];
    } else if (j === 0) {
        group.push(number);
        numbers.push(group);
    } else {
        group.push(number);
    }
}

console.log(numbers)

let sum = 0;
numbers.forEach((column, index) => {
    const isProduct = symbols[index] === '*';

    const localResult = isProduct
        ? column.reduce((prod, number) => prod * Number(number), 1)
        : column.reduce((sum, number) => sum + Number(number), 0);

    sum += localResult;
});

console.log(sum)