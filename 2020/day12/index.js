let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 12, isTest);


//wrong - 29699
/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

class Matrix {
  constructor() {
    this.currentDir = 'E';
    this.x = 0;
    this.y = 0;
    this.waypointY = 1;
    this.waypointX = 10;
  }

  static DIR = ['N', 'E', 'S', 'W'];

  turn(turnDir, degrees) {
    let offset = Math.floor(degrees / 90);
    if (turnDir === 'L') {
      offset = -offset;
    }

    const oldIndex = Matrix.DIR.indexOf(this.currentDir);
    const newIndex = (oldIndex + offset + 4) % 4;
    this.currentDir = Matrix.DIR[newIndex];
  }

  move(dir, value) {
    let moveDir = dir === 'F' ? this.currentDir : dir;

    if (moveDir === 'N') {
      this.y += value;
    }
    if (moveDir === 'E') {
      this.x += value;
    }
    if (moveDir === 'S') {
      this.y -= value;
    }
    if (moveDir === 'W') {
      this.x -= value;
    }
  }

  turnWaypoint(turn, degrees) {
    let x = this.waypointX;
    let y = this.waypointY;

    if (turn === 'L' && degrees === 90 || turn === 'R' && degrees === 270) {
      this.waypointX = -y;
      this.waypointY = x;
    }

    if (degrees === 180) {
      this.waypointX = -x;
      this.waypointY = -y;
    }

    if (turn === 'L' && degrees === 270 || turn === 'R' && degrees === 90) {
      this.waypointX = y;
      this.waypointY = -x;
    }
  }

  moveWaypoint(dir, value) {
    if (dir === 'N') {
      this.waypointY += value;
    }
    if (dir === 'E') {
      this.waypointX += value;
    }
    if (dir === 'S') {
      this.waypointY -= value;
    }
    if (dir === 'W') {
      this.waypointX -= value;
    }
  }

  moveShip(value) {
    this.x += this.waypointX * value;
    this.y += this.waypointY * value;
  }
}

day.task1(data => {
  const instructions = data.split('\r\n');
  const matrix = new Matrix();

  for (let step of instructions) {
    let dir = step[0];
    let value = +step.substring(1);

    if (dir === 'L' || dir === 'R') {
      matrix.turn(dir, value)
    } else {
      matrix.move(dir, value)
    }
  }

  return Math.abs(matrix.x) + Math.abs(matrix.y);
})

day.task2(data => {
  const instructions = data.split('\r\n');
  const matrix = new Matrix();

  for (let step of instructions) {
    let dir = step[0];
    let value = +step.substring(1);

    if (dir === 'L' || dir === 'R') {
      matrix.turnWaypoint(dir, value)
    } else if (dir === 'F') {
      matrix.moveShip(value)
    } else {
      matrix.moveWaypoint(dir, value);
    }
  }

  return Math.abs(matrix.x) + Math.abs(matrix.y);

})
