let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let math = require('mathjs');
let day = new Day(2020, 10, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
  let numbers = data.split('\r\n').map(n => +n);
  numbers.sort((a, b) => a - b);
  numbers.unshift(0);

  let ones = 0;
  let threes = 1;

  for (let n = 1; n < numbers.length; n++) {
    let diff = numbers[n] - numbers[n - 1];

    if (diff === 1) {
      ones += 1;
    }
    if (diff === 3) {
      threes += 1;
    }
  }

  return ones * threes;
})

day.task2(data => {
  let numbers = data.split('\r\n').map(n => +n);
  numbers.sort((a, b) => a - b);

  let sections = [];
  let start = 0;
  for (let i = 1; i < numbers.length; i++) {
    const sameSequence = numbers[i] - numbers[i - 1] === 1;

    if (sameSequence && i === numbers.length - 1) {
      sections.push({ start, end: i + 1 })
      break;
    }

    if (!sameSequence) {
      sections.push({ start, end: i })
      start = i;
    }
  }

  let filterSections = sections.filter(n => n.end - n.start > 2).map(({ start, end }) => {
    const mutation = mutations(end - start, start === 0 ? 1 : 2)
    console.log(numbers.slice(start, end), end - start);
    console.log('result', mutation)
    return mutation
  });

  return filterSections.reduce((acc, n) => acc * n, 1)
})

function factorial(n) {
  if (n <= 1) {
    return 1;
  }

  return n * factorial(n - 1);
}

function combinations(n, r) {
  if (n < r) {
    return 0;
  }
  if (n === r) {
    return 1;
  }

  return factorial(n) / (factorial(r) * factorial(n - r))
}

function mutations(n, offset) {
  return 1 + n - offset + combinations(n - offset, 2)
}
