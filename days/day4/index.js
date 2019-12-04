let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');

let isTest = false;


function task1(data) {
  const [start, end] = data.split('-').map(n => n.trim().split('').map(d => +d));
  let passwords = 0;

  while (1) {
    let { valid, rule, index } = isValid(start);

    //correct number to minimum higher
    if (!valid && rule === 'higher') {
      start.fill(start[index], index);
      valid = true;
    }

    if (isGreater(start, end)) {
      break;
    }

    if (valid) {
      passwords++;
    }

    //add digit to number
    let k = start.length - 1;
    start[k] += 1;
    while (start[k] > 9 && k >= 1) {
      start[k - 1] += 1;
      start.fill(start[k - 1], k);
      k--;
    }
  }

  return passwords;
}

function task2(data) {

}

function isValid(number) {
  let duplicateDigit = false;

  for (let i = 0; i < number.length - 1; i++) {
    if (number[i] > number[i + 1]) {
      return {
        valid: false,
        rule: 'higher',
        index: i
      }
    }

    if (number[i] === number[i + 1]) {
      duplicateDigit = true;
    }
  }

  return {
    valid: duplicateDigit,
    rule: 'duplicate'
  };
}

function validGroup(number) {
  let i = number.length;

  return !(number[i - 1] === number[i - 2] && number[i - 1] === number[i - 3]);
}

function isGreater(arr1, arr2) {
  return +arr1.join('') > +arr2.join('')
}

const day1 = new Day(4, isTest);
day1.task(1, task1);
day1.task(2, task2);
