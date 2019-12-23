let path = require('path');
let _ = require('lodash');
let { isSuperSet, difference } = require(path.join(__dirname, '..', '..', 'helpers', 'general'));

const WALL = '#';
const START = '@';
const VISITED = '*';
const PATH = '.';
let DIRECTIONS = {
  UP: { name: 'up', offsetX: -1, offsetY: 0 },
  DOWN: { name: 'down', offsetX: 1, offsetY: 0 },
  LEFT: { name: 'left', offsetX: 0, offsetY: -1 },
  RIGHT: { name: 'right', offsetX: 0, offsetY: 1 },
};

function findMain(allKeys, memory, current, i, j, found) {
  const sortedFound = _.sortBy(found);
  let memKey = `${sortedFound}:${current}`;

  if (memory.has(memKey)) {
    return memory.get(memKey);
  }

  found.push(current);
  let validNextKeys = allKeys[current].filter(nextKey => {
    if (_.includes(found, nextKey.key)) {
      return false;
    }

    return isSuperSet(new Set(found), nextKey.doors);
  });


  if (validNextKeys.length === 0) {
    console.log('Path Found', found.join());
    return 0;
  }

  // iterate next available keys
  const results = validNextKeys.map(nextKey => {
    return nextKey.depth + findMain(allKeys, memory, nextKey.key, nextKey.i, nextKey.j, [...found]);
  });

  let min = _.min(results);
  memory.set(memKey, min);
  return min;
}

function findPathToKeys(matrix, current, i, j) {
  // console.log('Find path to keys for', matrix.get(j, i));
  const start = { key: current, i, j, depth: 0, found: [], doors: [] };
  const queue = [start];
  const result = {};

  while (queue.length > 0) {
    let node = queue.shift();
    let { key, i, j, depth, doors, found } = node;

    if ((key.isLowerCase() || key === START) && (!result[key] || result[key].depth >= depth)) {
      result[key] = node;
    }

    if (matrix.get(j, i) === VISITED) {
      // continue;
    }

    let newDoors = [...doors];
    let newFound = [...found];

    if (key.isUpperCase()) {
      newDoors.push(key.toLowerCase());
    }
    if (key.isLowerCase()) {
      newFound.push(key);
    }

    const allowedPositions = findNextPositions(matrix, i, j);
    allowedPositions.forEach(({ i, j }) => {
      queue.push({
        key: matrix.get(j, i),
        i, j,
        depth: depth + 1,
        found: newFound,
        doors: new Set(newDoors),
        doorsStr: newDoors.join()
      });
    });

    matrix.set(j, i, VISITED);
    // matrix.print();
    // console.log()
  }

  delete result[PATH];
  return result;
}

function findNextPositions(matrix, i, j, found) {
  return Object.values(DIRECTIONS)
    .map(dir => ({ i: i + dir.offsetX, j: j + dir.offsetY }))
    .filter(({ i, j }) => {
      const char = matrix.get(j, i);
      return char !== WALL && char !== VISITED;
    });
}

function memoization(allKeys) {
  let memory = {};

  return function (found, callback) {
    let remaining = Array.from(difference(allKeys, found));
    // remaining.sort();
    let key = remaining.join();

    if (_.isNumber(memory[key])) {
      return memory[key];
    } else {
      const result = callback();
      memory[key] = result;
      return result;
    }
  };
}

String.prototype.isLowerCase = function () {
  return /^[a-z]*$/.test(this)
};
String.prototype.isUpperCase = function () {
  return /^[A-Z]*$/.test(this)
};

module.exports = {
  findMain,
  findPathToKeys,
  memoization
};
