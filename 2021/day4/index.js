let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let day = new Day(2021, 4, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
    const sections = data.split('\r\n\r\n');
    const numbers = sections[0].split(',');
    sections.shift();

    const maps = sections.map(section => {
        const lines = section.split('\r\n');
        return lines.map(line => line
            .trim()
            .split(/ +/)
            .map(n => ({ n: n, checked: false })));
    });

    for (let n of numbers) {
        markNumber(maps, n);

        for (let i = 0; i < maps.length; i++) {
            const currentMap = maps[i];
            if (isMapComplete(currentMap)) {
                return computeFinalScore(currentMap, n);
            }
        }
    }
})

day.task2(data => {
    const sections = data.split('\r\n\r\n');
    const numbers = sections[0].split(',');
    sections.shift();

    const maps = sections.map(section => {
        const lines = section.split('\r\n');
        return lines.map(line => line
            .trim()
            .split(/ +/)
            .map(n => ({ n: n, checked: false })));
    });


    const completedMaps = new Set();
    let lastMap = null;
    for (let n of numbers) {
        markNumber(maps, n);

        maps.forEach((map, index) => {
            if (!completedMaps.has(index) && isMapComplete(map)) {
                completedMaps.add(index);
            }
        })

        const notCompleted = maps.filter((map, index) => !completedMaps.has(index));
        if (notCompleted.length === 1) {
            lastMap = notCompleted[0];
        }
        if (notCompleted.length === 0) {
            return computeFinalScore(lastMap, n);
        }
    }
})

function markNumber(maps, n) {
    maps.forEach(map => {
        map.forEach(line => {
            line.forEach(value => {
                if (value.n === n) {
                    value.checked = true;
                }
            })
        })
    })
}

function isMapComplete(currentMap) {
    //some row is checked
    const someRowChecked = currentMap.some(line => line.every(value => value.checked));

    // some column checked
    let someColumnChecked = false;
    for (let j = 0; j < currentMap[0].length; j++) {
        someColumnChecked = someColumnChecked || currentMap.every(line => line[j].checked)
    }

    return someColumnChecked || someRowChecked;
}

function computeFinalScore(map, n) {
    let sum = 0;
    map.forEach(line => {
        line.forEach(value => {
            if (!value.checked) {
                sum += +value.n;
            }
        })
    })

    return sum * n;
}