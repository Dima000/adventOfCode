let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let Matrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));
let _ = require('lodash');

let isTest = false;

function findSeats(data) {
  return data.split('\r\n').map(fullWord => {
    let row = lettersToNumber('F', fullWord.substring(0, 7))
    let column = lettersToNumber('L', fullWord.substring(7))

    return row * 8 + column;
  })
}

function lettersToNumber(lowerBit, word) {
  return Number.parseInt(word.split('').map(x => x === lowerBit ? '0' : '1').join(''), 2)
}

function task1(data) {
  const seats = findSeats(data);
  return _.max(seats)
}

function task2(data) {
  const seats = findSeats(data);
  const TOTAL_SEATS = 128 * 8 + 8;
  for (let i = 1; i < TOTAL_SEATS - 1; i++) {
    const prevSeat = _.includes(seats, i - 1);
    const currentSeat = _.includes(seats, i);
    const nextSeat = _.includes(seats, i + 1);

    if (prevSeat && nextSeat && !currentSeat) {
      return i;
    }
  }
}

let day = new Day(2020, 5, isTest);
day.task(1, task1);
day.task(2, task2);
