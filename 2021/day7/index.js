let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2021, 7, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
    const positions = data.split(',').map(n => +n);

    let fuel = Number.MAX_SAFE_INTEGER;
    let pos = null;
    const minPos = Math.min(...positions);
    const maxPos = Math.max(...positions);

    for (let i = minPos; i <= maxPos; i++) {
        const localMin = alignCrabs(i, positions);
        if (localMin < fuel) {
            fuel = localMin;
            pos = i;
        }
    }

    return fuel;
})

day.task2(data => {
    const positions = data.split(',').map(n => +n);

    let fuel = Number.MAX_SAFE_INTEGER;
    let pos = null;
    const minPos = Math.min(...positions);
    const maxPos = Math.max(...positions);

    for (let i = minPos; i <= maxPos; i++) {
        const localMin = alignCrabsPart2(i, positions);
        if (localMin < fuel) {
            fuel = localMin;
            pos = i;
        }
    }

    return fuel;
})

function alignCrabs(position, crabsPos) {
    return crabsPos.reduce((acc, n) => {
        const value = Math.abs(n - position);
        return acc + value;
    }, 0);
}

function alignCrabsPart2(position, crabsPos) {
    return crabsPos.reduce((acc, n) => {
        const value = Math.abs(n - position);
        return acc + (value * (1 + value) / 2);
    }, 0);
}
