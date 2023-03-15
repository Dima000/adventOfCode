const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------

function isIncludedRange(rangeA, rangeB) {
    return rangeA[0] >= rangeB[0] && rangeA[1] <= rangeB[1];
}

function isOverlappedRange(rangeA, rangeB) {
    const front = rangeA[0] <= rangeB[0] && rangeA[1] >= rangeB[0];
    const back = rangeA[0] <= rangeB[1] && rangeA[1] >= rangeB[1];
    return front || back;
}

function task1(data) {
    const ranges = data.split('\r\n').map(line => {
        const [a, b, c, d] = line.match(/\d+/g).map(n => +n);
        return [[a, b], [c, d]];
    });

    // find all included ranges
    const included = ranges.filter(range => isIncludedRange(range[0], range[1]) || isIncludedRange(range[1], range[0]));
    return included.length;
}

function task2(data) {
    const ranges = data.split('\r\n').map(line => {
        const [a, b, c, d] = line.match(/\d+/g).map(n => +n);
        return [[a, b], [c, d]];
    });

    // find all included ranges
    const overlapped = ranges.filter(range => isOverlappedRange(range[0], range[1]) || isOverlappedRange(range[1], range[0]));
    return overlapped.length;
}

new DayNew(2022, 4, task1, task2);
