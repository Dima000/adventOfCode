let math = require('mathjs');

function matrixOfZeros(width, height) {
  return math.zeros(width, height).toArray();
}

function matrixOfChars(width, height, char) {
  const matrix = [];

  for (let i = 0; i < height; i++) {
    matrix.push(new Array(width).fill(char))
  }

  return matrix;
}

function prettyPrintMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join(' '));
  }
}

function printSet(set) {
  return Array.from(set.values()).join(' ');
}

function printGraphMatrix(matrix, normalDir, replaces = {}, separator = '#') {
  let maxX = 0;
  let maxY = 0;
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;

  Object.keys(matrix).forEach(key => {
    let [x, y] = key.split(separator).map(n => +n);
    maxX = Math.max(x, maxX);
    minX = Math.min(x, minX);
    maxY = Math.max(y, maxY);
    minY = Math.min(y, minY);
  });

  if (!normalDir) {
    for (let y = maxY; y >= minY; y--) {
      for (let x = maxX; x >= minX; x--) {
        process.stdout.write(matrix[`${x}${separator}${y}`].toString() || ' ')
      }
      console.log();
    }
  }

  if (normalDir) {
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        let val = matrix[`${x}${separator}${y}`];
        if (replaces.hasOwnProperty(val)) {
          val = replaces[val];
        }

        process.stdout.write((val || ' ').toString())
      }
      console.log();
    }

  }
}


module.exports.matrixOfZeros = matrixOfZeros;
module.exports.matrixOfChars = matrixOfChars;
module.exports.prettyPrintMatrix = prettyPrintMatrix;
module.exports.printGraphMatrix = printGraphMatrix;
