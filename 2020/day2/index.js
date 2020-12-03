let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');
let isTest = false;

function formatData(data) {
  return data.split('\r\n').map(item => {
    let spaced = item.split(' ');
    let limits = spaced[0].split('-');

    return {
      min: +limits[0],
      max: +limits[1],
      letter: spaced[1].substring(0, 1),
      password: spaced[2]
    }
  })
}

function task1(rawData) {
  const items = formatData(rawData);

  const isValid = ({ min, max, letter, password }) => {
    const times = password.match(new RegExp(letter, 'g')) || [];
    return times.length >= min && times.length <= max;
  }

  return items.reduce((acc, item) => acc + (isValid(item) ? 1 : 0), 0)
}

function task2(data) {
  const items = formatData(data);

  const isValid2 = ({ min, max, letter, password }) => {
    const minPos = password[min - 1] === letter;
    const maxPos = password[max - 1] === letter;
    return minPos !== maxPos;
  }

  return items.reduce((acc, item) => acc + (isValid2(item) ? 1 : 0), 0)
}

const day = new Day(2020, 2, isTest);
day.task(1, task1);
day.task(2, task2);
