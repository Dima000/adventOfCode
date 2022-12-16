const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));
const GraphMatrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));
const {re} = require("mathjs");

// Solution below
// -------------------------------------------------------------------------------------

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

function task2(data, isTest) {
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

    let target = isTest ? 10 : 2_000_000;
    let offset = isTest ? 0 : 50;
    sensors.sort((a, b) => b[2] - a[2]);

    const reversed = [...sensors];
    for (let i = 0; i < reversed.length; i++) {
        let [sx, sy, manh] = reversed[i];
        console.log(reversed[i]);

        // cadranul I
        let z = 0;
        for (let x = sx; x <= sx + manh; x++) {
            for (let y = sy + manh; y >= sy; y--) {
                let xLocal
            }
        }

        // for (let x = Math.max(sx - manh - offset, 0); x <= Math.min(sx + manh + offset, target * 2); x++) {
        //     for (let y = Math.max(sy - manh - offset, 0); y <= Math.min(sy + manh + offset, target * 2); y++) {
        //         if (!isUnavailablePoint(x, y, sensors)) {
        //             return x * 4000000 + y;
        //         }
        //     }
        // }
    }
}

new DayNew(2022, 15, null, task2, false, true);
