let ADD = '+';
let MULTIPLY = '*';
let START = '(';
let END = ')';
let _ = require('lodash');

let line = '1 + 2 * 3 + 4 * 5 + 6'



console.log(evaluateExpression2(line));

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
