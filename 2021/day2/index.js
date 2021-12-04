let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2021, 2, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
    let depth = 0;
    let forward = 0;

    data.split('\r\n').forEach(line => {
        const [dir, value] = line.split(' ');

        switch (dir) {
            case 'forward':
                forward += +value;
                return;
            case 'down':
                depth += +value;
                return;
            case 'up':
                depth += -value;
        }
    })

    return depth * forward;
})

day.task2(data => {
    let depth = 0;
    let forward = 0;
    let aim = 0;

    data.split('\r\n').forEach(line => {
        const [dir, value] = line.split(' ');

        switch (dir) {
            case 'forward':
                forward += +value;
                depth+= aim * value;
                return;
            case 'down':
                aim += +value;
                return;
            case 'up':
                aim += -value;
        }
    })

    return depth * forward;
})
