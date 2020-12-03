let path = require('path');
let _ = require('lodash');
let Day = require(path.join(__dirname, '..', '..', '..', 'helpers', 'Day'));
let IntCode = require(path.join(__dirname, '..', '..', 'helpers', 'Amplifier'));
let Matrix = require(path.join(__dirname, '..', '..', '..', 'helpers', 'GraphMatrix'));

let isTest = false;

const SCAFFOLD = '#';
const UP = '^';
const LEFT = 'L';
const RIGHT = 'R';

let DIRECTIONS = {
  UP: { name: 'up', offsetX: -1, offsetY: 0 },
  DOWN: { name: 'down', offsetX: 1, offsetY: 0 },
  LEFT: { name: 'left', offsetX: 0, offsetY: -1 },
  RIGHT: { name: 'right', offsetX: 0, offsetY: 1 },
};
const ROTOR = [DIRECTIONS.UP, DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.LEFT];

function task1(data) {
  const { matrix } = initMap(data);

  matrix.print();
  return matrix.entries().reduce((res, [key, value]) => {
    if (value === SCAFFOLD) {
      const [j, i] = key.split('#').map(n => +n);

      const up = matrix.get(j, i - 1);
      const down = matrix.get(j, i + 1);
      const left = matrix.get(j - 1, i);
      const right = matrix.get(j + 1, i);

      if (_.every([up, down, left, right], v => v === SCAFFOLD)) {
        return res + j * i;
      }
    }

    return res;
  }, 0);
}

function task2(data) {
  let matrix, regs;

  if (isTest) {
    matrix = new Matrix();
    regs = [];

    const lines = data.split('\r\n');

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[0].length; j++) {
        matrix.set(j, i, lines[i][j])
      }
    }

  } else {
    const dataR = initMap(data);
    matrix = dataR.matrix;
    regs = dataR.regs;
  }

  let { x, y } = matrix.findCoordinates(UP);

  let path = [];
  let lastDir = DIRECTIONS.UP;
  let steps = 0;

  while (1) {
    const dirIndex = ROTOR.indexOf(lastDir);
    const canUp = canDir(DIRECTIONS.UP, matrix, x, y);
    const canDown = canDir(DIRECTIONS.DOWN, matrix, x, y);
    const canLeft = canDir(DIRECTIONS.LEFT, matrix, x, y);
    const canRight = canDir(DIRECTIONS.RIGHT, matrix, x, y);

    const canContinue = canUp && lastDir === DIRECTIONS.UP ||
      canDown && lastDir === DIRECTIONS.DOWN ||
      canLeft && lastDir === DIRECTIONS.LEFT ||
      canRight && lastDir === DIRECTIONS.RIGHT;

    const turnRight = lastDir === DIRECTIONS.LEFT && canUp ||
      lastDir === DIRECTIONS.UP && canRight ||
      lastDir === DIRECTIONS.RIGHT && canDown ||
      lastDir === DIRECTIONS.DOWN && canLeft;

    const turnLeft = lastDir === DIRECTIONS.LEFT && canDown ||
      lastDir === DIRECTIONS.UP && canLeft ||
      lastDir === DIRECTIONS.RIGHT && canUp ||
      lastDir === DIRECTIONS.DOWN && canRight;

    if (canContinue) {
      steps += 1;
      x += lastDir.offsetX;
      y += lastDir.offsetY;
      continue;
    }

    if (turnLeft) {
      if (steps) {
        path.push(steps);
      }

      path.push(LEFT);
      steps = 0;

      lastDir = ROTOR[(dirIndex - 1 + 4) % 4];
      continue;
    }

    if (turnRight) {
      if (steps) {
        path.push(steps);
      }

      path.push(RIGHT);
      steps = 0;

      lastDir = ROTOR[(dirIndex + 1 + 4) % 4];
      continue;
    }

    path.push(steps);
    break;
  }

  // Input dependent. Was computed by hand
  let A, B, C, main;
  if (!isTest) {
    B = 'R,8,L,6,L,4,L,10,R,8';
    A = 'L,6,L,4,R,8';
    C = 'L,4,R,4,L,4,R,8';
    main = 'A,B,C,B,A,C'
  } else {
    A = 'R,8,R,8';
    B = 'R,4,R,4,R,8';
    C = 'L,6,L,2';
  }

  let inputString = path.join();
  inputString = inputString.replace(new RegExp(A, 'g'), 'A');
  inputString = inputString.replace(new RegExp(B, 'g'), 'B');
  inputString = inputString.replace(new RegExp(C, 'g'), 'C');

  let finalInput = `${inputString}\n${A}\n${B}\n${C}\nn\n`;
  finalInput = finalInput.split('').map(c => c.charCodeAt(0));

  //Start IntCode
  regs[0] = 2;
  const intCode = new IntCode(0, regs);
  let dust = '\n';

  while (1) {
    const run = intCode.run(finalInput, regs, true);

    if (run.halt) {
      break;
    } else {
      const isFinalStep = dust.substring(dust.length - 2) === '\n\n';
      dust += !isFinalStep ? String.fromCharCode(run.output) : run.output;
    }
  }

  return dust;
}

function initMap(data) {
  const regs = data.split(',').map(n => +n);
  let intCode = new IntCode('name', regs);
  let matrix = new Matrix();

  let i = 0, j = 0;

  while (1) {
    const run = intCode.run();
    if (run.halt) {
      break;
    }

    const char = String.fromCharCode(run.output);
    if (char === '\n') {
      i += 1;
      j = 0;
    } else {
      matrix.set(j, i, char);
      j += 1;
    }
  }

  return { matrix, regs };
}

function canDir(dir, matrix, x, y) {
  return matrix.get(y + dir.offsetY, x + dir.offsetX) === SCAFFOLD
}

let day = new Day(2019,  17, isTest);
// day.task(1, task1);
day.task(2, task2);
