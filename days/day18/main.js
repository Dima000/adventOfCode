let path = require('path');
let _ = require('lodash');
let { isSuperSet, difference } = require(path.join(__dirname, '..', '..', 'helpers', 'general'));

const WALL = '#';
const START = '@';
const ENTRANCE = '@';
let DIRECTIONS = {
  UP: { name: 'up', offsetX: -1, offsetY: 0 },
  DOWN: { name: 'down', offsetX: 1, offsetY: 0 },
  LEFT: { name: 'left', offsetX: 0, offsetY: -1 },
  RIGHT: { name: 'right', offsetX: 0, offsetY: 1 },
};

function findMain(allKeys, memory, current, i, j, found) {
  found.push(current);

  // // return value from memory
  // const memoryKey = `${current}${found.length}`;
  // if (memory.has(memoryKey)) {
  //   console.log('Fetched from memory', memoryKey);
  //   return memory.get(memoryKey)
  // }

  // find all available keys from current key
  const validNextKeys = allKeys[current].filter(nextKey => {
    if (_.includes(found, nextKey.key)) {
      return false;
    }

    return isSuperSet(new Set(found), nextKey.doors);
  });


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
  // memory.set(memoryKey, min);
  // return min;
}

function findMainDijkstra(allKeys, matrix) {
  let finalLength = Object.values(allKeys).length;
  let { x, y } = matrix.findCoordinates(ENTRANCE);
  let startNode = { key: ENTRANCE, i: x, j: y, depth: 0, found: [ENTRANCE], length: 1 };
  let queue = [startNode];
  let minDepth = Number.MAX_SAFE_INTEGER;
  let minPath;
  let memory = new Map();

  while (queue.length > 0) {
    // _.sortBy(queue, next => next.depth);
    queue = _.orderBy(queue, ['length', 'depth'], ['desc', 'asc']);
    let t = queue.shift();
    let { key, found, depth } = t;

    if (depth > minDepth) {
      continue;
    }

    // console.log('Key', key, 'found', found.join(), 'depth', depth);
    if (found.length === finalLength) {
      console.log('Solution found', depth, 'found', found.join());
      if (depth < minDepth) {
        minDepth = depth;
        minPath = found;
      }

      minDepth = Math.min(minDepth, depth);
      continue;
    }

    // find all available keys from current key
    const sortedFound = _.sortBy(found, i => i).join();
    const memoryKey = `${sortedFound}#${key}`;

    if (memory.has(memoryKey)) {
      let memDepth = memory.get(memoryKey);
      if (depth >= memDepth) {
        continue;
      }
    }

    memory.set(memoryKey, depth);

    const validNextKeys = allKeys[key].filter(nextKey => {
      if (_.includes(found, nextKey.key)) {
        return false;
      }

      return isSuperSet(new Set(found), nextKey.doors);
    });

    for (let nextKey of validNextKeys) {
      queue.push({
        key: nextKey.key,
        i: nextKey.i,
        j: nextKey.j,
        depth: nextKey.depth + depth,
        found: [...found, nextKey.key],
        length: found.length + 1
      });
    }
  }

  return minDepth;
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

String.prototype.isLowerCase = function () {
  return /^[a-z]*$/.test(this)
};
String.prototype.isUpperCase = function () {
  return /^[A-Z]*$/.test(this)
};

module.exports = {
  findPathToKeys,
  findMainDijkstra
};