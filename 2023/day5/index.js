const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));
const _ = require('lodash');

// Solution below
// -------------------------------------------------------------------------------------

function seedToLocation(seed, maps) {
    let current = seed;
    // console.log(current);
    maps.forEach((map) => {
        current = sourceToDestination(current, map.items);
        // console.log(current);
    });

    return current;
}

function locationToSeed(location, maps) {
    let current = location;
    // console.log(current);
    [...maps].reverse().forEach((map) => {
        current = destinationToSource(current, map.items);
        // console.log(current);
    });

    return current;
}

function sourceToDestination(source, rules) {
    let destination = source;

    for (let rule of rules) {
        // [destination, source, range]
        const diff = source - rule[1];
        if (diff >= 0 && diff <= rule[2]) {
            return diff + rule[0];
        }
    }

    return destination;
}

function destinationToSource(destination, rules) {
    let source = destination;

    for (let rule of rules) {
        // [destination, source, range]
        let diff = destination - rule[0];
        if (diff >= 0 && diff <= rule[2]) {
            return diff + rule[1]
        }
    }

    return source;
}

function isValidSeed(seed, seedRanges) {
    return seedRanges.some(([seedStart, seedRange]) => {
        if (seed >= seedStart && seed <= seedStart + seedRange) {
            return true;
        }
    })
}

function task1(data) {
    let seeds = [];
    const maps = [];

    data.split('\r\n\r\n').forEach((section, index) => {
        if (index === 0) {
            seeds = section.split(' ').slice(1).map(n => +n);
            return;
        }

        const lines = section.split('\r\n');
        maps.push({
            title: lines[0],
            items: lines.slice(1).map(numbers => numbers.split(' ').map(n => +n)),
        })
    });

    let minLocation = Number.MAX_SAFE_INTEGER;
    seeds.forEach(seed => {
        const location = seedToLocation(seed, maps);
        minLocation = Math.min(minLocation, location);
    });

    return minLocation;
}

function task2(data) {
    const seedRanges = [];
    const maps = [];

    data.split('\r\n\r\n').forEach((section, index) => {
        if (index === 0) {
            const seedNumbers = section.split(' ').slice(1).map(n => +n);
            for (let i = 0; i < seedNumbers.length; i += 2) {
                seedRanges.push([seedNumbers[i], seedNumbers[i + 1]])
            }
            return;
        }

        const lines = section.split('\r\n');
        maps.push({
            title: lines[0],
            items: lines.slice(1).map(numbers => numbers.split(' ').map(n => +n)),
        })
    });


    let minLocation = 0;
    console.log('task2 start');
    while (true) {
        const seed = locationToSeed(minLocation, maps);
        if (isValidSeed(seed, seedRanges)) {
            return minLocation;
        }
        minLocation += 1;
    }
}

new DayNew(2023, 5, task1, task2);
