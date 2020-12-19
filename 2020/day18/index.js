let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 18, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

let START = '(';
let END = ')';
let ADD = '+';
let MULTIPLY = '*';

day.task1(data => {
  let values = data.split('\r\n').map(line => evaluateExpression1(`+ ${line}`));
  return _.sum(values);
})

day.task2(data => {
  let values = data.split('\r\n').map(line => evaluateExpression2(line));
  return _.sum(values);
})

function evaluateExpression2(line) {
  if (typeof line !== 'string') {
    return line;
  }

  if (!line.includes(ADD) && !line.includes(MULTIPLY)) {
    return +line;
  }

  if (!line.includes(MULTIPLY)) {
    return evaluateExpression1(`+ ${line}`);
  }

  let newLine = [];
  for (let k = 0; k < line.length; k++) {
    if (line[k] === START) {
      let seq = subsequence(line, k);
      k += seq.length + 1;
      newLine.push(evaluateExpression2(seq));
    } else {
      newLine.push(line[k]);
    }
  }

  const parts = newLine.join``.split`*`.map(p => p.trim());

  return parts.reduce((res, exp) => {
    return res * evaluateExpression2(exp);
  }, 1)
}

function evaluateExpression1(line) {
  let i = 0;
  let total = 0;

  while (i < line.length) {
    let { digit, offset, operator } = evaluatePart(i, line, evaluateExpression1);
    i += offset;

    if (operator === ADD) {
      total += +digit;
    } else {
      total *= +digit;
    }
  }

  return total;
}

function evaluatePart(i, line, recursiveFunc) {
  let auxLine = line.substring(i);
  let operator = line.substring(i, i + 1);
  let digitStr = auxLine.match(/\(?[0-9]+/)[0];
  let offset, digit;

  if (digitStr[0] === START) {
    let subLine = subsequence(auxLine, 2);
    digit = recursiveFunc(`+ ${subLine}`);
    offset = subLine.length + 2 + 3;
  } else {
    digit = +digitStr;
    offset = digitStr.length + 3;
  }

  return {
    offset,
    digit,
    operator
  }
}

function subsequence(line, offset) {
  if (line[offset] !== START) {
    throw 'Invalid data';
  }

  let i = offset + 1;
  let count = 1;
  while (count !== 0) {
    if (line[i] === START)
      count += 1;

    if (line[i] === END)
      count -= 1;

    i += 1;
  }

  return line.substring(offset + 1, i - 1);
}
