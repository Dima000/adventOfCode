let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));

let isTest = true;

function task1(data) {
  let input = data.trim();

  for (let i = 0; i < 100; i++) {
    input = findInput(input);
  }

  return input.substring(0, 8);
}

function task2(data) {
  let input = data.trim();

  const longInput = input.repeat(50);
  let inputSeq = findInput(longInput);
  return inputSeq;
}

function findInput(input, offset = 0) {
  let auxInput = [];
  for (let i = 1; i <= input.length; i++) {
    auxInput.push(findDigit(input, i, offset))
  }

  return auxInput.join('');
}

function findDigit(input, index) {
  let n = 1;
  let positive = true;

  let sum = 0;
  while (n * index <= input.length) {
    let start = n * index - 1;
    let end = (n + 1) * index - 1 - 1;

    for (let k = start; k <= end && k < input.length; k++) {
      sum = positive ? sum + (+input[k]) : sum - input[k]
    }

    positive = !positive;
    n += 2;
  }

  return Math.abs(sum % 10);
}

let day = new Day(2019,  16, isTest);
day.task(1, task1);
day.task(2, task2);
