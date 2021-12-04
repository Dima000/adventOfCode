let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2021, 1, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
    const numbers = data.split('\r\n').map(n => +n);

    let n = 0;
    for (let i = 0; i < numbers.length - 3; i++) {
        const current = numbers[i] + numbers[i + 1] + numbers[i + 2];
        const next = numbers[i + 1] + numbers[i + 2] + numbers[i + 3];

        if (current < next) {
            n++;
        }
    }

    return n;
})

day.task2(data => {
    const numbers = data.split('\r\n').map(n => +n);

    let n = 0;
    for (let i = 0; i < numbers.length - 3; i++) {
        const current = numbers[i] + numbers[i + 1] + numbers[i + 2];
        const next = numbers[i + 1] + numbers[i + 2] + numbers[i + 3];

        if (current < next) {
            n++;
        }
    }

    return n;
})
