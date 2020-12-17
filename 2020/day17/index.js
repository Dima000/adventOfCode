let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 17, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

class Matrix {
  constructor(dimensions, lines = [[]]) {
    this.matrix = {};
    this.nrOfDimensions = dimensions;
    let extraArguments = dimensions === 3 ? [0] : [0,0]

    for (let x = 0; x < lines.length; x++) {
      for (let y = 0; y < lines[0].length; y++) {
        let value = lines[x][y] === '#' ? 1 : 0;
        this.set(value, x, y, ...extraArguments);
      }
    }
  }

  get(...coordinates) {
    let key = coordinates.join('#');
    return this.matrix[key];
  }

  set(value, ...coordinates) {
    let key = coordinates.join('#')
    this.matrix[key] = value;
  }

  getBoundaries() {
    let boundaries = new Array(this.nrOfDimensions);

    Object.keys(this.matrix).forEach(key => {
      let dimensions = key.split('#').map(n => +n);

      for (let coordinate = 0; coordinate < this.nrOfDimensions; coordinate++) {
        let boundary = boundaries[coordinate] || [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
        let min = Math.min(dimensions[coordinate], boundary[0]);
        let max = Math.max(dimensions[coordinate], boundary[1]);
        boundaries[coordinate] = [min, max];
      }
    })

    return boundaries;
  }

  printZ(...restDimensions) {
    let [xBoundaries, yBoundaries] = this.getBoundaries();

    for (let x = xBoundaries[0]; x <= xBoundaries[1]; x++) {
      let line = [];
      for (let y = yBoundaries[0]; y <= yBoundaries[1]; y++) {
        line.push(this.get(x, y, ...restDimensions) ? '#' : '.');
      }
      console.log(line.join(''))
    }
  }
}

day.task1(data => {
  let matrix = new Matrix(3, data.split('\r\n'));
  // matrix.printZ();

  let k = 1;
  while (k <= 6) {
    matrix = generateState3(matrix);
    // matrix.printZ();
    k += 1;
  }

  return _.sum(Object.values(matrix.matrix));
})

day.task2(data => {
  let matrix = new Matrix(4, data.split('\r\n'));
  // matrix.printZ(0, 0);

  let k = 1;
  while (k <= 6) {
    matrix = generateState4(matrix);
    // matrix.printZ();
    k += 1;
  }

  return _.sum(Object.values(matrix.matrix));
})

function generateState3(matrix) {
  let newMatrix = new Matrix(3);
  let boundaries = matrix.getBoundaries();

  for (let [min, max] of boundaries) {
    for (let x = min - 1; x <= max + 1; x++) {
      for (let y = min - 1; y <= max + 1; y++) {
        for (let z = min - 1; z <= max + 1; z++) {
          setNewValue(newMatrix, matrix, x, y, z);
        }
      }
    }
  }

  return newMatrix;
}

function generateState4(matrix) {
  let newMatrix = new Matrix(4);
  let boundaries = matrix.getBoundaries();

  for (let [min, max] of boundaries) {
    for (let x = min - 1; x <= max + 1; x++) {
      for (let y = min - 1; y <= max + 1; y++) {
        for (let z = min - 1; z <= max + 1; z++) {
          for (let w = min - 1; w <= max + 1; w++) {
            setNewValue(newMatrix, matrix, x, y, z, w);
          }
        }
      }
    }
  }

  return newMatrix;
}

function findActiveNeighbours3(matrix, ...dimensions) {
  let [x0, y0, z0] = dimensions;

  let neighbours = 0;
  for (let x of [-1, 0, 1]) {
    for (let y of [-1, 0, 1]) {
      for (let z of [-1, 0, 1]) {
        let isNeighbor = x || y || z;
        let neighborActive = matrix.get(x0 + x, y0 + y, z0 + z);
        neighbours += isNeighbor && neighborActive ? 1 : 0;
      }
    }
  }

  return neighbours;
}

function findActiveNeighbours4(matrix, ...dimensions) {
  let [x0, y0, z0, w0] = dimensions;

  let neighbours = 0;
  for (let x of [-1, 0, 1]) {
    for (let y of [-1, 0, 1]) {
      for (let z of [-1, 0, 1]) {
        for (let w of [-1, 0, 1]) {
          let isNeighbor = x || y || z || w;
          let neighborActive = matrix.get(x0 + x, y0 + y, z0 + z, w0 + w);
          neighbours += isNeighbor && neighborActive ? 1 : 0;
        }
      }
    }
  }

  return neighbours;
}

function setNewValue(newMatrix, matrix, ...dimensions) {
  let findNeighboursFunc = dimensions.length === 3 ? findActiveNeighbours3 : findActiveNeighbours4;
  let activeNeighbours = findNeighboursFunc(matrix, ...dimensions);
  let currentValue = matrix.get(...dimensions);

  let newValue = 0;
  if (activeNeighbours === 3 || (currentValue && activeNeighbours === 2)) {
    newValue = 1;
  }

  newMatrix.set(newValue, ...dimensions);
}
