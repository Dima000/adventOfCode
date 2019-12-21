let _ = require('lodash');

const WALL = '#';
const PATH = '.';
let DIRECTIONS = {
  UP: { name: 'up', offsetX: -1, offsetY: 0 },
  DOWN: { name: 'down', offsetX: 1, offsetY: 0 },
  LEFT: { name: 'left', offsetX: 0, offsetY: -1 },
  RIGHT: { name: 'right', offsetX: 0, offsetY: 1 },
};

function findMain(matrix, i, j, foundKeys, allKeys, depth, minDepth, HARD_LIMIT = Number.MAX_SAFE_INTEGER) {
  if (foundKeys.length === allKeys.length) {
    console.log('Solution', depth, minDepth.depth);
    minDepth.depth = Math.min(depth, minDepth.depth);
    return 0;
  }

  // find all available keys
  let minPaths = [];
  findAllAvailableKeys(_.cloneDeep(matrix), i, j, minPaths, 0);
  minPaths = _.sortBy(minPaths, 'min');

  // console.log(minPaths);
  // update map by removing the key and door and run sub-problem again
  let minLocal = minDepth.depth;
  minPaths.forEach(({ min, key }) => {
    const nextMatrix = _.cloneDeep(matrix);
    const coords = nextMatrix.findCoordinates(key);
    const nextKeys = [...foundKeys, key];
    resetPosition(nextMatrix, key);
    resetPosition(nextMatrix, key.toUpperCase());

    if (nextKeys.length === 8) {
      console.log(nextKeys.join());
      console.timeLog('Entry');
    }

    if (minLocal > min + depth && HARD_LIMIT > min + depth) {
      const minKey = findMain(nextMatrix, coords.x, coords.y, nextKeys, allKeys, depth + min, minDepth);
      minLocal = Math.min(minLocal, min + minKey);
    }
  });

  return minLocal;
}

function findAllAvailableKeys(matrix, i, j, keys, depth) {
  let current = matrix.get(j, i);
  if (current.isLowerCase()) {
    keys.push({ key: current, min: depth });
  }

  matrix.set(j, i, WALL);

  const allowedPositions = findNextPositions(matrix, i, j);

  allowedPositions.forEach(pos => {
    findAllAvailableKeys(matrix, pos.i, pos.j, keys, depth + 1);
  })
}

function findNextPositions(matrix, i, j) {
  return Object.values(DIRECTIONS)
    .map(dir => ({ i: i + dir.offsetX, j: j + dir.offsetY }))
    .filter(({ i, j }) => {
      const char = matrix.get(j, i);
      return char.isLowerCase() || char === PATH;
    });
}

function resetPosition(matrix, char) {
  const { x, y } = matrix.findCoordinates(char);
  matrix.set(y, x, PATH);
  return { i: x, j: y }
}

String.prototype.isLowerCase = function () {
  return /^[a-z]*$/.test(this)
};

module.exports = {
  findMain,
  findAllAvailableKeys,
  resetPosition
};
