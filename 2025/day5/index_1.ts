import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */
// 3-5
// 10-14
// 16-20
// 12-18
//
// 1
// 5
// 8
// 11
// 17
// 32
const [contentRanges, contentIds] = content.split('\n\n');
const ranges = contentRanges.split('\n').map(range => range.split('-').map(Number));
const ids = contentIds.split('\n').map(Number);

const validIds = [];
ids.forEach(id => {
    const isInRange = ranges.some(([start, end]) => id >= start && id <= end);
    if (isInRange) {
        validIds.push(id);
    }
})

console.log(validIds.length);

