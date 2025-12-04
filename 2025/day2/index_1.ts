import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */

const invalidIds = [];
const ranges = content.split(',');

ranges.forEach(range => {
    const [start, end] = range.split('-').map(Number);

    for (let i = start; i <= end; i++) {
        if (repeatsTwice(i)) {
            invalidIds.push(i);
        }
    }
})

console.log(invalidIds.reduce((sum, id) => sum + id, 0))


function repeatsTwice(n) {
    return /^(\d+)\1$/.test(n.toString())
}