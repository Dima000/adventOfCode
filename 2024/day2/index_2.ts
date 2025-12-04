import { readFileSync } from 'fs';
import { join } from 'path';

/* READ FILE CONTENTS */
const isTest = process.argv.slice(2).includes('--test');
const filePath = join(__dirname, isTest ? 'input.test.txt' : 'input.txt');
const content = readFileSync(filePath, 'utf8');

/* SOLUTION */
console.time('execution time');
const reports = content
    .split('\n')
    .map(report => report.split(' ').map(Number));


const size = reports
    .filter(report => {
        return isSequence(report, 'asc', true)
            || isSequence(report, 'desc', true)
    })
    .length;
console.log(size);
console.timeEnd('execution time');

function isSequence(report: number[], dir: 'asc' | 'desc', allowException: boolean) {
    for (let i = 0; i < report.length - 1; i++) {
        const dif = dir === 'asc' ? report[i + 1] - report[i] : report[i] - report[i + 1];
        const isError = !(dif >= 1 && dif <= 3);

        if (isError && !allowException) {
            return false
        } else if (isError && allowException) {
            // @ts-ignore
            const reportA = report.toSpliced(i, 1);
            // @ts-ignore
            const reportB = report.toSpliced(i + 1, 1);

            return isSequence(reportA, dir, false) || isSequence(reportB, dir, false)
        }
    }

    return true;
}
