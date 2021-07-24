let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let day = new Day(2020, 14, isTest);
let applyMask = require('./apply-mask');
let getMaskedPermutations = require('./get-masked-permutations');

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
    let mask = null;
    const memMap = {};
    const operations = parseData(data);

    operations.forEach(op => {
        if (op.type === 'MASK') {
            mask = op.mask;
        } else {
            memMap[op.address] = applyMask(op.value, mask);
        }
    });

    return Object.values(memMap).reduce((sum, a) => sum + a, 0);
})

day.task2(data => {
    const operations = parseData(data);
    let mask = null;
    let memMap = {};

    operations.forEach(op => {
        if (op.type === 'MASK') {
            mask = op.mask;
        } else {
            const addresses = getMaskedPermutations(op.address, mask);

            addresses.forEach(item => {
                memMap[item] = op.value;
            });
        }
    });

    return Object.values(memMap).reduce((sum, a) => sum + a, 0);
})

function parseData(data) {
    return data.split('\r\n').map(line => {
        const type = line.includes('mask') ? 'MASK' : 'MEM';

        if (type === 'MASK') {
            const mask = line.split(' = ')[1];
            return {
                type,
                mask,
            }
        }

        const [address, value] = line.match(/\d+/g);
        return {
            type,
            address: +address,
            value: +value,
        }
    });
}