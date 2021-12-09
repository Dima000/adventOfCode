let isTest = false;

const path = require('path');
const Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

function task1(data) {
    const matrix = data.split('\r\n').map(line => line.split('').map(n => +n));
    const lowPoints = [];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            const current = (matrix[i] || [])[j];
            const top = (matrix[i + 1] || [])[j];
            const bottom = (matrix[i - 1] || [])[j];
            const left = (matrix[i] || [])[j + 1];
            const right = (matrix[i] || [])[j - 1];

            const values = [top, bottom, left, right].filter(n => typeof n === 'number');
            if (values.every(value => current < value)) {
                lowPoints.push({
                    value: current,
                    indexes: [i, j],
                });
            }
        }
    }

    // Task 1
    const sumOfLowPoints = lowPoints.reduce((sum, item) => sum + item.value + 1, 0);
    console.log('Task 1', sumOfLowPoints);

    // Task 2
    const basins = lowPoints
        .map(point => {
            const visited = new Set();
            markBasin(matrix, point.indexes, visited);
            return visited.size;
        })
        .sort((a, b) => b - a);

    console.log('Task 2', basins[0] * basins[1] * basins[2]);
}

function markBasin(matrix, [i, j], visited) {
    const key = `${i}#${j}`;
    if (visited.has(key)) {
        return;
    }

    visited.add(key);

    const markDirection = (newI, newJ) => {
        const dir = (matrix[newI] || [])[newJ];
        if (typeof dir === 'number' && dir < 9) {
            markBasin(matrix, [newI, newJ], visited);
        }
    }

    markDirection(i + 1, j);
    markDirection(i - 1, j);
    markDirection(i, j + 1);
    markDirection(i, j - 1);
}


new Day(2021, 9, isTest, false, task1, null);