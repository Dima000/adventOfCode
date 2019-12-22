let path = require('path');
let _ = require('lodash');
let { isSuperSet, difference } = require(path.join(__dirname, '..', '..', 'helpers', 'general'));

const WALL = '#';
const START = '@';
let DIRECTIONS = {
  UP: { name: 'up', offsetX: -1, offsetY: 0 },
  DOWN: { name: 'down', offsetX: 1, offsetY: 0 },
  LEFT: { name: 'left', offsetX: 0, offsetY: -1 },
  RIGHT: { name: 'right', offsetX: 0, offsetY: 1 },
};

function findMain(allKeys, memory, current, i, j, found) {
  // return value from memory
  let sortedFound = _.sortBy(found).join();
  const memoryKey = `${sortedFound}#${current}`;
  let validNextKeys;

  if (memory.has(memoryKey)) {
    console.log('Fetched from memory', memoryKey);
    validNextKeys = memory.get(memoryKey);
    found.push(current);
  } else {
    found.push(current);

    // find all available keys from current key
    validNextKeys = allKeys[current].filter(nextKey => {
      if (_.includes(found, nextKey.key)) {
        return false;
      }

      return isSuperSet(new Set(found), nextKey.doors);
    });

    memory.set(memoryKey, validNextKeys);
  }


  if (validNextKeys.length === 0) {
    console.log('Path Found', found.join());
    console.log();
    return 0;
  }

  // iterate next available keys
  const results = validNextKeys.map(nextKey => {
    return nextKey.depth + findMain(allKeys, memory, nextKey.key, nextKey.i, nextKey.j, [...found]);
  });

  return _.min(results);
}

function findPathToKeys(matrix, i, j, doors, keys, depth) {
  let current = matrix.get(j, i);
  if (current.isLowerCase() || current === START) {
    keys.push({
      key: current,
      i,
      j,
      depth,
      doors: new Set(doors),
      doorsStr: doors.join()
    });
  }
  if (current.isUpperCase()) {
    doors.push(current.toLowerCase());
  }

  matrix.set(j, i, WALL);

  const allowedPositions = findNextPositions(matrix, i, j);

  allowedPositions.forEach(pos => {
    findPathToKeys(matrix, pos.i, pos.j, [...doors], keys, depth + 1);
  })
}

function findNextPositions(matrix, i, j) {
  return Object.values(DIRECTIONS)
    .map(dir => ({ i: i + dir.offsetX, j: j + dir.offsetY }))
    .filter(({ i, j }) => {
      const char = matrix.get(j, i);
      return char !== WALL;
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
