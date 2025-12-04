import { readFileSync } from 'fs';
import { join } from 'path';
import { number } from "mathjs";

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
const lines = content.split('\n'); //use '\r\n' for windows

// read the map
const map = new Map<string, string>();
const mapCopy = new Map<string, string>();
let sum = 0;

for (let x = 0; x < lines.length; x++) {
    for (let y = 0; y < lines[x].length; y++) {
        map.set(getKey(x, y), lines[x][y])
        mapCopy.set(getKey(x, y), lines[x][y])
    }
}

// Count the valid positions
for (let x = 0; x < lines.length; x++) {
    for (let y = 0; y < lines[x].length; y++) {
        const neighboursCount = findNeighboursCount(x, y);

        const symbol = map.get(getKey(x, y));
        if (symbol === '@' && neighboursCount < 4) {
            sum++;
            mapCopy.set(getKey(x, y), 'x');
        }
    }
}

// printMap();
console.log(sum);

function findNeighboursCount(currentX: number, currentY: number) {
    let count = 0;

    for (let x = currentX - 1; x <= currentX + 1; x++) {
        for (let y = currentY - 1; y <= currentY + 1; y++) {
            if (x === currentX && y === currentY) {
                continue;
            }

            count += map.get(getKey(x, y)) === '@' ? 1 : 0;
        }
    }

    return count;
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