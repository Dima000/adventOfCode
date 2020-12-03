let path = require('path');
let _ = require('lodash');
let { isSuperSet } = require(path.join(__dirname, '..', '..', '..', 'helpers', 'general'));

const WALL = '#';
const VISITED = '*';
const PATH = '.';
let DIRECTIONS = {
  UP: { name: 'up', offsetX: -1, offsetY: 0 },
  DOWN: { name: 'down', offsetX: 1, offsetY: 0 },
  LEFT: { name: 'left', offsetX: 0, offsetY: -1 },
  RIGHT: { name: 'right', offsetX: 0, offsetY: 1 },
};

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

function findPathToKeys(matrix, current, i, j) {
  const start = { key: current, i, j, depth: 0, found: [], doors: [] };
  const queue = [start];
  const result = {};

  while (queue.length > 0) {
    let node = queue.shift();
    let { key, i, j, depth, doors, found } = node;

    if ((key.isLowerCase() || key.isDigit()) && (!result[key] || result[key].depth >= depth)) {
      result[key] = node;
    }

    if (matrix.get(j, i) === VISITED) {
      continue;
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

String.prototype.isLowerCase = function () {
  return /^[a-z]*$/.test(this)
};
String.prototype.isUpperCase = function () {
  return /^[A-Z]*$/.test(this)
};
String.prototype.isDigit = function () {
  return /^[0-9]*$/.test(this)
};


module.exports = {
  findMain,
  findPathToKeys,
  findMainDijkstra
};
