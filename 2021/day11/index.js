let isTest = false;
const path = require('path');
const Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
const GraphMatrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));

// Solution below
// -------------------------------------------------------------------------------------

function task1(data) {
    const matrix = new GraphMatrix();
    data.split('\r\n').forEach((line, i) => {
        line.split('').forEach((n, j) => {
            matrix.set(j, i, +n);
        })
    });

    let flashes = 0;
    for (let step = 0; step < 100; step += 1) {
        stepIncrement(matrix);
        flashes += stepFlash(matrix);
    }

    return flashes;
}

function task2(data) {
    const matrix = new GraphMatrix();
    data.split('\r\n').forEach((line, i) => {
        line.split('').forEach((n, j) => {
            matrix.set(j, i, +n);
        })
    });

    let step = 0;
    while (1) {
        stepIncrement(matrix);
        const flashedThisStep = stepFlash(matrix);
        step += 1;

        if (flashedThisStep === 100) {
            return step;
        }
    }
}

function stepIncrement(matrix) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            matrix.increment(j, i);
        }
    }
}

function stepFlash(matrix) {
    let flashedItems = new Set();

    while (1) {
        const toFlashItems = [];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (matrix.get(j, i) > 9) {
                    toFlashItems.push({ i, j });
                }
            }
        }

        if (toFlashItems.length === 0) {
            return flashedItems.size;
        }

        toFlashItems.forEach(({ i, j }) => {
            flashedItems.add(`${i}#${j}`);
            matrix.set(j, i, 0);

            flashToNeighbor(i - 1, j - 1, flashedItems, matrix);
            flashToNeighbor(i - 1, j + 0, flashedItems, matrix);
            flashToNeighbor(i - 1, j + 1, flashedItems, matrix);

            flashToNeighbor(i, j - 1, flashedItems, matrix);
            flashToNeighbor(i, j + 0, flashedItems, matrix);
            flashToNeighbor(i, j + 1, flashedItems, matrix);

            flashToNeighbor(i + 1, j - 1, flashedItems, matrix);
            flashToNeighbor(i + 1, j + 0, flashedItems, matrix);
            flashToNeighbor(i + 1, j + 1, flashedItems, matrix);
        })
    }
}

function flashToNeighbor(i, j, flashedItems, matrix) {
    if (flashedItems.has(`${i}#${j}`)) {
        return;
    }

    if (i < 10 && i >= 0 && j < 10 && j >= 0) {
        matrix.increment(j, i);
    }
}

new Day(2021, 11, isTest, false, task1, task2);