const path = require('path');
const _ = require('lodash');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------


function pocketsComparator(left, right) {
    if (_.isEqual(left, right)) {
        return 0;
    }

    const isNumberLeft = typeof left === 'number';
    const isNumberRight = typeof right === 'number';

    if (isNumberLeft && isNumberRight) {
        return left - right;
    }

    if (!isNumberLeft && !isNumberRight) {
        let i = 0;
        while (true) {
            if (i === left.length || i === right.length) {
                return left.length - right.length;
            }

            if (!_.isEqual(left[i], right[i])) {
                const res = pocketsComparator(left[i], right[i]);
                if (res !== 0) {
                    return res;
                }
            }
            i++;
        }
    }

    if (isNumberLeft && !isNumberRight) {
        return pocketsComparator([left], right);
    }

    if (!isNumberLeft && isNumberRight) {
        return pocketsComparator(left, [right]);
    }

    throw Error('never get here');
}

function task1(data) {
    const groups = data.split('\r\n\r\n').map(g => g.split('\r\n').map(list => eval(list)));

    const indexes = groups.map(([left, right], index) => pocketsComparator(left, right) <= 0 ? (index + 1) : 0);
    return indexes.reduce((sum, i) => sum + i, 0);
}

function task2(data) {
    let pockets = data.split('\r\n').filter(line => line).map(line => eval(line));
    pockets.push([[2]]);
    pockets.push([[6]]);

    pockets.sort(pocketsComparator);
    const index2 = pockets.findIndex(p => _.isEqual(p, [[2]])) + 1;
    const index6 = pockets.findIndex(p => _.isEqual(p, [[6]])) + 1;

    // pockets.map(p => _.flattenDeep(p)).forEach(p => console.log(p.join(', ') || '--'));

    return index2 * index6;
}

new DayNew(2022, 13, task1, task2);
