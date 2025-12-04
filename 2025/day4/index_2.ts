import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */

// ..@@.@@@@.
// @@@.@.@.@@
// @@@@@.@.@@
// @.@@@@..@.
// @@.@@@@.@@
// .@@@@@@@.@
// .@.@.@.@@@
// @.@@@.@@@@
// .@@@@@@@@.
// @.@.@@@.@.

const map = new Map<string, string>();
let sum = 0;

// Read the map
const lines = content.split('\n');
for (let x = 0; x < lines.length; x++) {
    for (let y = 0; y < lines[x].length; y++) {
        map.set(getKey(x, y), lines[x][y])
    }
}

// Remove invalid points
let somePointRemoved = true;
let cycles = 0;

while (somePointRemoved) {
    somePointRemoved = false;

    for (let x = 0; x < lines.length; x++) {
        for (let y = 0; y < lines[x].length; y++) {
            if (map.get(getKey(x, y)) === '@') {
                const isInvalid = isInvalidPoint(x, y);

                if (isInvalid) {
                    map.set(getKey(x, y), '.');
                    sum++;
                    somePointRemoved = true;
                }
            }
        }
    }

    cycles++;
}


// printMap();
console.log(sum);
console.log('cycles', cycles);

function isInvalidPoint(currentX: number, currentY: number) {
    let count = 0;

    for (let x = currentX - 1; x <= currentX + 1; x++) {
        for (let y = currentY - 1; y <= currentY + 1; y++) {
            if (x === currentX && y === currentY) {
                continue;
            }

            count += map.get(getKey(x, y)) === '@' ? 1 : 0;
        }
    }

    return count < 4;
}


function getKey(x: number, y: number) {
    return `${x}#${y}`;
}

function printMap() {
    for (let x = 0; x < lines.length; x++) {
        const line = [];
        for (let y = 0; y < lines[x].length; y++) {
            line.push(map.get(getKey(x, y)));
        }
        console.log(line.join(''));
    }

}