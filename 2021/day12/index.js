let isTest = false;
const path = require('path');
const Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));

// Solution below
// -------------------------------------------------------------------------------------

String.prototype.isLowerCase = function () {
    return /^[a-z]*$/.test(this)
};

function task1(data) {
    const pathsGraph = new Map();

    data.split('\r\n').forEach(line => {
        const [first, second] = line.split('-');

        const firstConnections = pathsGraph.get(first) || new Set();
        firstConnections.add(second);
        pathsGraph.set(first, firstConnections);

        const secondConnections = pathsGraph.get(second) || new Set();
        secondConnections.add(first);
        pathsGraph.set(second, secondConnections);
    });

    function collectPaths(current, passedPaths, pathsGraph, allFoundPaths) {
        if (current === 'end') {
            allFoundPaths.push([...passedPaths, 'end']);
            return;
        }

        const isSmallCaveOrStart = current.isLowerCase();
        if (isSmallCaveOrStart && passedPaths.includes(current)) {
            return;
        }

        passedPaths.push(current);
        pathsGraph.get(current).forEach(next => {
            collectPaths(next, [...passedPaths], pathsGraph, allFoundPaths);
        });
    }

    const allPaths = [];
    collectPaths('start', [], pathsGraph, allPaths);

    return allPaths.length;
}

function task2(data) {
    const pathsGraph = new Map();

    data.split('\r\n').forEach(line => {
        const [first, second] = line.split('-');

        const firstConnections = pathsGraph.get(first) || new Set();
        firstConnections.add(second);
        pathsGraph.set(first, firstConnections);

        const secondConnections = pathsGraph.get(second) || new Set();
        secondConnections.add(first);
        pathsGraph.set(second, secondConnections);
    });

    function collectPaths(current, passedPaths, pathsGraph, allFoundPaths) {
        if (current === 'end') {
            allFoundPaths.push([...passedPaths, 'end']);
            return;
        }

        if (current === 'start' && passedPaths.length > 0) {
            return;
        }

        if (current.isLowerCase()) {
            const smallCaveCounts = passedPaths
                .filter(path => path.isLowerCase())
                .reduce((acc, path) => {
                    acc[path] = (acc[path] || 0) + 1;
                    return acc;
                }, {});

            const currentSmallCaveCount = smallCaveCounts[current];
            const anySmallCaveTwice = Object.values(smallCaveCounts).some(value => value > 1);

            // currentCount === 0 -> Pass
            // currentCount === 1 && other caves lower than 2 -> Pass
            // currentCount === 1 && any other cave already 2 -> Fail
            // currentCount === 2 -> Fail
            if (currentSmallCaveCount === 1 && anySmallCaveTwice) {
                return;
            }
            if (currentSmallCaveCount === 2) {
                return;
            }
        }

        passedPaths.push(current);
        pathsGraph.get(current).forEach(next => {
            collectPaths(next, [...passedPaths], pathsGraph, allFoundPaths);
        });
    }

    const allPaths = [];
    collectPaths('start', [], pathsGraph, allPaths);

    return allPaths.length;
}

new Day(2021, 12, isTest, false, task1, task2);