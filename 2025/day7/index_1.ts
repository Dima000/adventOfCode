import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */
// .......S.......
// ...............
// .......^.......
// ...............
// ......^.^......
// ...............
// .....^.^.^.....
// ...............
// ....^.^...^....
// ...............
// ...^.^...^.^...
// ...............
// ..^...^.....^..
// ...............
// .^.^.^.^.^...^.
// ...............

const lines = content.split('\n');

let beamStart = lines[0].indexOf('S')
let beams = [beamStart];
let timesSplit = 0;

lines.slice(1).forEach((line) => {
    const splitterIndexes = [...line.matchAll(/\^/g)].map(m => m.index);
    const newBeams = new Set<number>();

    beams.forEach(beam => {
        if (splitterIndexes.includes(beam)) {
            newBeams.add(beam - 1);
            newBeams.add(beam + 1);
            timesSplit++;
        } else {
            newBeams.add(beam);
        }
    })

    beams = Array.from(newBeams);
})

console.log(timesSplit);