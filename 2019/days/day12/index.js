let path = require('path');
let Day = require(path.join(__dirname, '..', '..', '..', 'helpers', 'Day'));
let _ = require('lodash');
let math = require('mathjs');

let isTest = false;

function task1(data) {
  let TIME = 200;
  let satellites = data.split('\n')
    .map(line => line.match(/-?\d+/g))
    .map(([x, y, z], index) => ({
      x: +x, y: +y, z: +z,
      vx: 0, vy: 0, vz: 0,
      id: index
    }));

  for (let i = 1; i <= TIME; i++) {
    satellites = satellites.map(sat => {
      let satVelocity = findVelocity(sat, satellites);
      let satPosition = findPosition(sat, satVelocity);
      return { id: sat.id, ...satVelocity, ...satPosition };
    });
  }

  return findEnergy(satellites);
}

function task2(data) {
  let satellites = data.split('\n')
    .map(line => line.match(/-?\d+/g))
    .map(([x, y, z], index) => ({
      x: +x, y: +y, z: +z,
      vx: 0, vy: 0, vz: 0,
      id: index
    }));

  let initial = _.cloneDeep(satellites);

  let NUMBER = 1;
  let xL, yL, zL;
  let seqx = [initial[NUMBER].x];
  let seqy = [initial[NUMBER].y];
  let seqz = [initial[NUMBER].z];

  while (1) {
    satellites = satellites.map(sat => {
      let satVelocity = findVelocity(sat, satellites);
      let satPosition = findPosition(sat, satVelocity);
      return { id: sat.id, ...satVelocity, ...satPosition };
    });

    seqx.push(satellites[NUMBER].x);
    seqy.push(satellites[NUMBER].y);
    seqz.push(satellites[NUMBER].z);

    if (isCircular(seqx) && !xL) {
      xL = seqx.length;
    }
    if (isCircular(seqy) && !yL) {
      yL = seqy.length;
    }
    if (isCircular(seqz) && !zL) {
      zL = seqz.length;
    }

    if (zL && xL && yL) {
      break;
    }
  }

  return math.lcm(xL, yL, zL);
}

function findVelocity(sat, satellites) {
  let velocity = _.pick(sat, ['vx', 'vy', 'vz']);

  for (let key of ['x', 'y', 'z']) {
    for (let i = 0; i < 4; i++) {
      let auxSat = satellites[i];

      if (auxSat.id !== sat.id) {
        let increment = 0;
        if (auxSat[key] < sat[key]) {
          increment = -1;
        }
        if (auxSat[key] > sat[key]) {
          increment = 1;
        }

        velocity[`v${key}`] += increment;
      }
    }
  }

  return velocity;
}

function findPosition({ x, y, z }, { vx, vy, vz }) {
  return {
    x: x + vx,
    y: y + vy,
    z: z + vz,
  }
}

function isCircular(array) {
  const length = array.length;
  for (let i = 0; i < length / 2; i++) {
    if (array[i] !== array[length - 1 - i]) {
      return false;
    }
  }

  return true;
}

function print(satellites, index, step, special) {
  for (let i = 0; i < 4; i++) {
    if ((_.isNumber(index) && i === index) || !_.isNumber(index) && !special) {
      const { x, y, z, vx, vy, vz } = satellites[i];
      // console.log(`Ast${i}:\tpos=<\tx=${x},\ty=${y},\tz=${z}>,\tvel=<\tx=${vx},\ty=${vy},\tz=${vz}> :: ${step}`)
    }

    if (i === 0 && special) {
      const { x, y, z, vx, vy, vz } = satellites[i];
      console.log(`Ast${i}: x=\t${x}           :${step}`)
    }
  }
}

function findEnergy(satellites) {
  return satellites.reduce((res, sat) => {
    const kinetic = Math.abs(sat.vx) + Math.abs(sat.vy) + Math.abs(sat.vz);
    const pot = Math.abs(sat.x) + Math.abs(sat.y) + Math.abs(sat.z);
    return res + kinetic * pot;
  }, 0)
}


let day = new Day(2019,  12, isTest);
day.task(1, task1);
day.task(2, task2);
