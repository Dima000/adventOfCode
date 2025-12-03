import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */
const lines = content.split('\n'); //use '\r\n' for windows

// 987654321111111
// 811111111111119
// 234234234234278
// 818181911112111

let sum = 0;

lines.forEach(line => {
    const digits = line.split('').map(char => +char);

    let index = 0;
    let digitsArray = [];

    for (let k = 12; k >= 1; k--) {
        let digit = Number.MIN_SAFE_INTEGER;

        for (let i = index; i <= digits.length - k; i++) {
            if (digits[i] > digit) {
                digit = digits[i];
                index = i;
            }
        }

        digitsArray.push(digit);
        index++;
    }

    console.log(digitsArray.join(''))
    sum += Number(digitsArray.join(''));
});

console.log(sum)