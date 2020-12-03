let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');

let isTest = false;

function task1(data) {
  const lines = data.split('\r\n');
  const asteroids = [];

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === '#') {
        asteroids.push({ x, y })
      }
    }
  }

  let max = 0;
  let point = null;
  for (let a of asteroids) {
    const asteroidStats = findAsteroidsStats(asteroids, a);
    let visibleAsteroids = _.uniqBy(asteroidStats, i => i.radius).length;

    if (visibleAsteroids > max) {
      max = visibleAsteroids;
      point = a;
    }
  }

  return `Coord: ${point.x},${point.y}  ${max}`;
}

function task2(data) {
  const lines = data.split('\r\n');
  const asteroids = [];

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === '#') {
        asteroids.push({ x, y })
      }
    }
  }

  let asteroidStats = findAsteroidsStats(asteroids, { x: 23, y: 20 });
  let mapped = asteroidStats.map(a => ({
    ...a,
    radius: a.radius > 0 ? a.radius - 360 : a.radius
  }));

  let ordered = _.orderBy(mapped, ['radius', 'distance'], ['desc', 'asc']);
  let count = 0;
  let prevRadius = ordered[0].radius;
  for (let i = 1; i < ordered.length; i++) {
    if (ordered[i].radius === prevRadius) {
      count += 1
    } else {
      count = 0;
      prevRadius = ordered[i].radius
    }
    ordered[i].radius -= 360 * count;
  }

  let sorted = _.orderBy(ordered, ['radius'], 'desc');
  let point = sorted[199];

  return point.x * 100 + point.y;
}

function findAsteroidsStats(asteroids, start) {
  let asteroidStats = [];

  for (let { x, y } of asteroids) {
    let X = x - start.x;
    let Y = start.y - y;
    let radius = calcAngleDegrees(X, Y, -90);
    let distance = calcManhattanDistance(X, Y);

    asteroidStats.push({ radius, distance, X, Y, x, y });
  }

  return asteroidStats;
}

function calcAngleDegrees(x, y, offset = 0) {
  return Math.atan2(y, x) * 180 / Math.PI + offset;
}

function calcManhattanDistance(x, y) {
  return Math.abs(x) + Math.abs(y);
}


let day = new Day(2019,  10, isTest);
day.task(1, task1);
day.task(2, task2);
