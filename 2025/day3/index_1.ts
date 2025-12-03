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

    let firstIndex = digits.length - 2; // second last
    let firstDigit = digits[digits.length - 2]; // second last

    for (let i = digits.length - 2; i >= 0; i--) {
        if (digits[i] >= firstDigit) {
            firstDigit = digits[i];
            firstIndex = i;
        }
    }

    let secondDigit = Math.max(...digits.slice(firstIndex + 1));

    sum += firstDigit * 10 + secondDigit;
});

console.log(sum);