import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */
// .......S.......
// .......|.......
// ......|^.......
// ......|........
// .....|^.^......
// .....|.........
// ....|^.^.^.....
// ....|..........
// ...|^.^...^....
// ...|...........
// ..|^.^...^.^...
// ..|............
// .|^...^.....^..
// .|.............
// |^.^.^.^.^...^.
// |..............

const lines = content.split('\n');

const memo = new Map<string, number>();
const timelinesCount = findTimelines(lines[0].indexOf('S'), 0);
console.log(timelinesCount);

function findTimelines(beam: number, lineIndex: number): number {
    if (lineIndex >= lines.length) {
        return 1;
    }

    if (memo.has(`${beam}-${lineIndex}`)) {
        return memo.get(`${beam}-${lineIndex}`)!;
    }

    let result: number;
    if (lines[lineIndex][beam] === '^') {
        result = findTimelines(beam + 1, lineIndex + 2) + findTimelines(beam - 1, lineIndex + 2);
    } else {
        result = findTimelines(beam, lineIndex + 2);
    }

    memo.set(`${beam}-${lineIndex}`, result);
    return result;
}