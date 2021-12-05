let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let GraphMatrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));
let day = new Day(2021, 5, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
    const numbers = data.split('\r\n').map(line => {
        let [startX, startY, endX, endY] = line.trim().match(/\d+/g);
        return {
            start: [+startX, +startY],
            end: [+endX, +endY],
            sameX: startX === endX,
            sameY: startY === endY,
        }
    })

    const matrix = new GraphMatrix();

    numbers
        .filter(({ sameX, sameY }) => sameX || sameY)
        .forEach(item => addItem(item, matrix));

    return matrix.entries().reduce((acc, [, value]) => {
        return acc + (value >= 2 ? 1 : 0);
    }, 0);
})

function addItem({ start, end, sameX, sameY }, matrix) {
    if (sameX) {
        const x = start[0];
        for (let y = Math.min(start[1], end[1]); y <= Math.max(start[1], end[1]); y++) {
            const currentValue = matrix.get(x, y) || 0;
            matrix.set(x, y, currentValue + 1);
        }
    } else if (sameY) {
        const y = start[1];
        for (let x = Math.min(start[0], end[0]); x <= Math.max(start[0], end[0]); x++) {
            const currentValue = matrix.get(x, y) || 0;
            matrix.set(x, y, currentValue + 1);
        }
    }
}

day.task2(data => {
    const numbers = data.split('\r\n').map(line => {
        let [startX, startY, endX, endY] = line.trim().match(/\d+/g);
        return {
            start: [+startX, +startY],
            end: [+endX, +endY],
            sameX: startX === endX,
            sameY: startY === endY,
        }
    })

    const matrix = new GraphMatrix();

    numbers.forEach(item => addItemDiagonal(item, matrix));

    return matrix.entries().reduce((acc, [, value]) => {
        return acc + (value >= 2 ? 1 : 0);
    }, 0);
})

function addItemDiagonal(value, matrix) {
    const { start, end, sameX, sameY } = value;
    if (sameY || sameX) {
        addItem(value, matrix);
        return;
    }

    const minX = Math.min(start[0], end[0]);
    const maxX = Math.max(start[0], end[0]);
    const minY = Math.min(start[1], end[1]);
    const maxY = Math.max(start[1], end[1]);
    const length = maxX - minX;

    for (let i = 0; i <= length; i++) {
        const x = minX === start[0] ? minX + i : maxX - i;
        const y = minY === start[1] ? minY + i : maxY - i;

        const currentValue = matrix.get(x, y) || 0;
        matrix.set(x, y, currentValue + 1);
    }
}