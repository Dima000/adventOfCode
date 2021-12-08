let isTest = false;

const path = require('path');
const _ = require('lodash');
const Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
const { permutator } = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

const DIGIT_TEMPLATE = {
    0: [0, 1, 2, 4, 5, 6],
    1: [2, 5],
    2: [0, 2, 3, 4, 6],
    3: [0, 2, 3, 5, 6],
    4: [1, 2, 3, 5],
    5: [0, 1, 3, 5, 6],
    6: [0, 1, 3, 4, 5, 6],
    7: [0, 2, 5],
    8: [0, 1, 2, 3, 4, 5, 6],
    9: [0, 1, 2, 3, 5, 6],
}

function task1(data) {
    const lines = data
        .split('\r\n')
        .map(line => line.split(' | ').map(segment => segment.trim().split(' ')))
        .map(([signals, digits]) => ({
            signals,
            digits
        }));

    const allDigits = lines.reduce((acc, line) => [...acc, ...line.digits], []);

    return allDigits
        .filter(digit => [2, 3, 4, 7].includes(digit.length))
        .length;
}

function task2(data) {
    const allSolutions = getPermutations('abcdefg');

    return data
        .split('\r\n')
        .map(line => line.split(' | ').map(segment => segment.trim().split(' ')))
        .map(([signals, digits]) => {
            const sortedSignals = signals.sort((a, b) => a.length - b.length);

            const solution = allSolutions.find(solution => validPermutation(sortedSignals, solution));
            return getNumber(digits, solution);
        })
        .reduce((sum, n) => sum + n, 0);
}

function validPermutation(signals, solution) {
    return signals.every(signal => {
        const permutations = memoizedSignalPermutations(signal);
        return permutations.some(perm => new RegExp(perm).test(solution));
    });
}

// Generate all valid permutations for current signal
// 'ab' -> ['..a..b.', '..b..a.']
// 'abc' -> ['a.b..c.', 'a.c..b.', 'c.a..b.', ...restOfThem]
function getSignalPermutations(signal) {
    const permutations = getPermutations(signal);
    const usableDigitTemplates = Object
        .values(DIGIT_TEMPLATE)
        .filter(indexes => indexes.length === signal.length);

    const digitPermutations = [];

    permutations.forEach(perm => {
        usableDigitTemplates.forEach(template => {
            const newPerm = new Array(7).fill('.');

            for (let i = 0; i < template.length; i++) {
                newPerm[template[i]] = perm[i];
            }

            digitPermutations.push(newPerm);
        });
    });

    return digitPermutations.map(p => p.join(''));
}

const memoizedSignalPermutations = _.memoize(getSignalPermutations);

function getPermutations(text) {
    return permutator(text.split('')).map(s => s.join(''));
}

function getNumber(digits, solution) {
    const number = digits.map(digit => {
        const indexes = digit.split('').map(n => solution.indexOf(n));
        indexes.sort();
        const entry = Array.from(Object.entries(DIGIT_TEMPLATE)).find(([, template]) => _.isEqual(template, indexes));
        return entry[0];
    });

    const nr = +(number.join(''));
    console.log(nr);
    return nr;
}

new Day(2021, 8, isTest, false, task1, task2);