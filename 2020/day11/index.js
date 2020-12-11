let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');
let day = new Day(2020, 11, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

const EMPTY = 'L';
const OCCUPIED = '#';
const WALL = '.';

class Matrix {
  constructor(lines = [[]]) {
    this.matrix = {};

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[0].length; j++) {
        this.set(i, j, lines[i][j]);
      }
    }
  }

  get(y, x) {
    return this.matrix[`${x}#${y}`];
  }

  set(y, x, value) {
    this.matrix[`${x}#${y}`] = value;
  }

  static DIR = {
    'N': { j: 0, i: -1, },
    'NE': { j: 1, i: -1, },
    'NW': { j: -1, i: -1, },
    'S': { j: 0, i: 1, },
    'SE': { j: 1, i: 1, },
    'SW': { j: -1, i: 1, },
    'E': { j: 1, i: 0, },
    'W': { j: -1, i: 0, },
  };
}

day.task1(data => {
  return task(data, false);
})

day.task2(data => {
  return task(data, true);
})

function task(data, secondTask) {
  let lines = data.split('\r\n');
  let H = lines.length;
  let L = lines[0].length;
  let matrix = new Matrix(lines);
  let history = [matrix];

  while (1) {
    generateStates(history, 10, H, L, secondTask);
    let n = history.length;

    if (_.isEqual(history[n - 1], history[n - 2])) {
      break;
    }
  }

  let allValues = Object.values(history[history.length - 1].matrix);
  return allValues.reduce((acc, item) => acc + (item === OCCUPIED ? 1 : 0), 0);
}

function generateStates(history, number, H, L, secondTask) {
  for (let i = 0; i < number; i++) {
    let previous = history[history.length - 1];

    const nextState = new Matrix();
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < L; j++) {
        nextState.set(i, j, computeCell(previous, i, j, secondTask))
      }
    }

    history.push(nextState)
  }
}

function computeCell(state, i, j, secondTask) {
  let current = state.get(i, j);
  if (current === WALL) {
    return WALL
  }

  let occupied = 0;
  if (!secondTask) {
    for (let offset of Object.values(Matrix.DIR)) {
      const offsetI = i + offset.i;
      const offsetJ = j + offset.j;
      const neighbor = state.get(offsetI, offsetJ);
      if (neighbor === OCCUPIED) {
        occupied += 1;
      }
    }
  } else {
    for (let offset of Object.values(Matrix.DIR)) {
      let neighbor = WALL;
      let offsetI = i;
      let offsetJ = j;

      while (neighbor === WALL) {
        offsetI += offset.i;
        offsetJ += offset.j;
        neighbor = state.get(offsetI, offsetJ);
      }

      if (neighbor === OCCUPIED) {
        occupied += 1;
      }
    }
  }

  if (current === EMPTY && !occupied) {
    return OCCUPIED;
  }

  if (current === OCCUPIED && occupied >= (secondTask ? 5 : 4)) {
    return EMPTY;
  }

  return current;
}
