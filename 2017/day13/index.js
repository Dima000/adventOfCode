let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');

let isTest = false;

function parseData(data) {
  const map = {};
  data.split('\r\n').map(entry => {
    const [index, depth] = entry.split(': ');
    map[index] = +depth;
  })

  let keys = Object.keys(map);
  let last = +keys[keys.length - 1]

  return { map, last };
}

function task1(data) {
  let { map, last } = parseData(data);
  let severity = 0;

  for (let time = 0; time <= last; time++) {
    const depth = map[time];
    if (!checkPassed(time, depth)) {
      severity += time * depth;
    }
  }

  return severity;
}

function task2(data) {
  let { map, last } = parseData(data);

  let i = 0;
  let offset = 0;
  while (i <= last) {
    const depth = map[i];
    if (!checkPassed(i + offset, depth)) {
      i = 0;
      offset += 1;
    } else {
      i += 1;
    }
  }

  return offset;
}

function checkPassed(time, depth) {
  if (!depth) {
    return true;
  }

  const length = depth * 2 - 2;
  return time % length !== 0
}

const day1 = new Day(2017, 13, isTest);
day1.task(1, task1);
day1.task(2, task2);
