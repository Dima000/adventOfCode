let isTest = false;

let path = require('path');
let _ = require('lodash');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let day = new Day(2021, 6, isTest);


/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

let numberOfItems = (cycles) => {
    if (cycles < 0) {
        return 1;
    }


    let sum = 1;
    let N = 0;
    let cycleCurrent = cycles;
    for (let i = 0; i < cycles; i++) {
        N -= 1;
        cycleCurrent -= 1;
        if (N < 0) {
            sum += numberOfItems(cycleCurrent - 8);
            N = 6;
        }
    }

    return sum;
}

numberOfItems = _.memoize(numberOfItems);

day.task1(data => {
    return data.trim()
        .split(',')
        .map(n => +n)
        .reduce((acc, n) => acc + numberOfItems(80 - n), 0);
})

day.task2(data => {
    return data.trim()
        .split(',')
        .map(n => +n)
        .reduce((acc, n) => acc + numberOfItems(256 - n), 0);
})