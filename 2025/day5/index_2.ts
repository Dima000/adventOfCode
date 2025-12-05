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
console.time('execution time');
type Range = [number, number];
const [contentRanges] = content.split('\n\n');
const ranges: Range[] = contentRanges.split('\n').map(range => range.split('-').map(Number) as Range);

const mergedRanges: Range[] = [];
ranges.forEach(range => {
    mergedRanges.push(range);
    mergeAllRanges(mergedRanges);
})

const rangesSum = mergedRanges.map(range => range[1] - range[0] + 1).reduce((sum, range) => sum + range, 0);
console.log(rangesSum);
console.timeEnd('execution time');

function mergeAllRanges(ranges: Range[]) {
    if (ranges.length === 1) {
        return;
    }

    for (let i = 0; i < ranges.length - 1; i++) {
        for (let j = 1; j < ranges.length; j++) {
            if (i === j) continue;

            const merged = mergeTwoRanges(ranges[i], ranges[j]);
            if (merged.length === 1) {
                ranges.splice(i, 1, merged[0]);
                ranges.splice(j, 1);

                mergeAllRanges(ranges);
                return;
            }
        }
    }
}

function mergeTwoRanges(newRange: Range, oldRange: Range): Range[] {
    let newStart = newRange[0];
    let newEnd = newRange[1];
    let oldStart = oldRange[0];
    let oldEnd = oldRange[1];

    // new   |--------|
    // old        |--------|
    if (newStart <= oldStart && newEnd >= oldStart) {
        const start = newStart;
        const end = Math.max(newEnd, oldEnd);
        return [[start, end]];
    }

    // new       |--------|
    // old   |--------|
    if (newEnd >= oldEnd && newStart <= oldEnd) {
        const start = Math.min(newStart, oldStart)
        const end = newEnd;
        return [[start, end]];
    }

    // new   |--------|
    // old                |--------|
    // -OR-
    // new                |--------|
    // old   |--------|
    if (newEnd < oldStart || newStart > oldEnd) {
        return [[newStart, newEnd], [oldStart, oldEnd]];
    }

    // new       |--------|
    // old   |-------------------|
    // do nothing
    return [[oldStart, oldEnd]];
}

