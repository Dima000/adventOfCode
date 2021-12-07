let isTest = false;
const path = require('path');
const Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
new Day(2021, 7, isTest, false, task1, task2);
/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

function task1(data) {
    const positions = data.split(',').map(n => +n);

    let fuel = Number.MAX_SAFE_INTEGER;
    const minPos = Math.min(...positions);
    const maxPos = Math.max(...positions);

    for (let i = minPos; i <= maxPos; i++) {
        const localMin = alignCrabs(i, positions);
        if (localMin < fuel) {
            fuel = localMin;
        }
    }

    return fuel;
}

function alignCrabs(position, crabsPos) {
    return crabsPos.reduce((acc, n) => {
        const value = Math.abs(n - position);
        return acc + value;
    }, 0);
}

function task2(data) {
    const positions = data.split(',').map(n => +n);

    let fuel = Number.MAX_SAFE_INTEGER;
    const minPos = Math.min(...positions);
    const maxPos = Math.max(...positions);
    for (let i = minPos; i <= maxPos; i++) {
        const localMin = alignCrabsPart2(i, positions);
        if (localMin < fuel) {
            fuel = localMin;
        }
    }

    return fuel;
}

function alignCrabsPart2(position, crabsPos) {
    return crabsPos.reduce((acc, n) => {
        const value = Math.abs(n - position);
        return acc + (value * (1 + value) / 2);
    }, 0);
}
