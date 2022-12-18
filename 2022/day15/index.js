const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));
const GraphMatrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));

// Solution below
// -------------------------------------------------------------------------------------

function mergeRanges(ranges) {
    let min = ranges.reduce((min, range) => {
        return Math.min(min, range[0]);
    }, Number.MAX_SAFE_INTEGER);

    let max = ranges.reduce((min, range) => {
        return Math.max(min, range[1]);
    }, Number.MIN_SAFE_INTEGER);

    const flatRanges = ranges.flat().sort((a, b) => a - b);

    let newRanges = [];
    let start = null;
    let i = min;
    while (i <= max) {
        let exists = ranges.some(r => i >= r[0] && i <= r[1]);
        const hasStart = start !== null;

        if (exists && hasStart) {
            i = flatRanges.find(nr => nr >= i) + 1;
            exists = ranges.some(r => i >= r[0] && i <= r[1]);
        } else if (!exists && !hasStart) {
            i = flatRanges.find(nr => nr >= i);
            exists = true;
        }

        if (exists && !hasStart) {
            start = i;
            i += 1;
            continue;
        }

        if (!exists && hasStart) {
            newRanges.push([start, i - 1]);
            start = null;
            i += 1;
        }
    }

    return newRanges;
}

function manhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function isUnavailablePoint(x, y, sensors) {
    for (let i = 0; i < sensors.length; i++) {
        let point2sDist = Math.abs(x - sensors[i][0]) + Math.abs(y - sensors[i][1]);
        if (point2sDist <= sensors[i][2]) {
            return true;
        }
    }

    return false;
}


function task1(data, isTest) {
    const sensors = [];
    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let matrix = new GraphMatrix();
    data.split('\r\n').forEach(line => {
        const [sx, sy, bx, by] = line.match(/-?\d+/g);
        sensors.push([+sx, +sy, manhattanDistance(sx, sy, bx, by)]);

        matrix.set(sx, sy, 'S');
        matrix.set(bx, by, 'B');
        minX = Math.min(minX, sx, bx);
        maxX = Math.max(maxX, sx, bx);
    });

    let targetY = isTest ? 10 : 2_000_000;
    let notAvailableCount = 0;

    for (let x = minX * 2; x <= maxX * 2; x++) {
        if (!matrix.has(x, targetY) && isUnavailablePoint(x, targetY, sensors)) {
            notAvailableCount += 1;
        }
    }

    return notAvailableCount;
}

/*
* Must be run with NODE_OPTIONS="--max-old-space-size=4096" to avoid memory fail
*/
function task2(data, isTest) {
    const sensors = [];
    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let elementsMatrix = new GraphMatrix();
    data.split('\r\n').forEach(line => {
        const [sx, sy, bx, by] = line.match(/-?\d+/g);
        sensors.push([+sx, +sy, manhattanDistance(sx, sy, bx, by)]);

        elementsMatrix.set(sx, sy, 'S');
        elementsMatrix.set(bx, by, 'B');
        minX = Math.min(minX, sx, bx);
        maxX = Math.max(maxX, sx, bx);
    });

    let targetY = isTest ? 10 : 2_000_000;

    const yRangesMap = new Map();
    sensors.sort((a, b) => b[2] - a[2]);
    sensors.forEach(([sx, sy, manh], index) => {
        let sy0 = sy - manh;
        let sy1 = sy + manh;
        let z = 0;
        for (let i = sy0; i <= sy1; i++) {
            if (i >= 0 || i <= targetY * 2) {
                let yRanges = yRangesMap.get(i) || [];
                yRanges.push([sx - z, sx + z]);
                yRangesMap.set(i, yRanges);
            }
            z += i < sy ? 1 : -1;
        }

        console.log('done sensor', index + 1);
    });

    console.log('Finished collecting ranges');
    for (let y = 0; y <= targetY * 2; y++) {
        if (y && y % 100_000 === 0) {
            console.log(y);
        }

        const mergedRanges = mergeRanges(yRangesMap.get(y));
        if (mergedRanges.length > 1) {
            let x = mergedRanges[0][1] + 1;
            console.log(x, y);
            return x * 4_000_000 + y;
        }
    }
}

new DayNew(2022, 15, task1, task2, false, true);
