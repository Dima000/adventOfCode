let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let day = new Day(2021, 3, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
    const lines = data.split('\r\n');

    let nr = '';
    for (let i = 0; i < lines[0].length; i++) {
        let ones = 0;
        let zeroes = 0;

        lines.forEach(line => {
            if (line[i] === '0') {
                zeroes += 1;
            } else {
                ones += 1;
            }
        })

        nr += ones > zeroes ? '1' : '0';
    }

    const inverse = nr.split('').map(n => n === '1' ? '0' : '1').join('');
    return parseInt(nr, 2) * parseInt(inverse, 2);
})

day.task2(data => {
    let lines = data.split('\r\n');


    let aLines = [...lines];
    let bLines = [...lines];

    let index = 0;
    while (aLines.length > 1) {
        aLines = filterByPosition(aLines, index, true);
        index += 1;
    }

    index = 0;
    while (bLines.length > 1) {
        bLines = filterByPosition(bLines, index, false);
        index += 1;
    }


    return parseInt(aLines[0], 2) * parseInt(bLines[0], 2);
})

function filterByPosition(lines, index, upper) {
    let ones = 0;
    let zeroes = 0;

    lines.forEach(line => {
        if (line[index] === '0') {
            zeroes += 1;
        } else {
            ones += 1;
        }
    });

    return lines.filter(line => {
        if (upper) {
            if (ones >= zeroes && line[index] === '1') {
                return true;
            }
            if (zeroes > ones && line[index] === '0') {
                return true;
            }
        } else {
            if (zeroes <= ones && line[index] === '0') {
                return true;
            }
            if (ones < zeroes && line[index] === '1') {
                return true;
            }
        }
    })
}
