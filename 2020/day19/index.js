let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 19, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
  let [lines, inputLines] = data.split('\r\n\r\n');

  let rules = {};
  lines.split('\r\n').forEach(line => {
    let [key, value] = line.split(':');
    rules[key] = value.trim();
  })

  let getRegexMemo = memoizer((n) => {
    let value = rules[n];
    if (/"[ab]"/.test(value)) {
      return value.replace(/"/g, '');
    }

    let orRules = value.split('|');
    orRules = orRules.map(set => {
      let adjacentRules = set.trim().split` `.map(getRegexMemo).map(s => `(${s})`);
      return adjacentRules.join``;
    })

    return orRules.map(regex => regex.includes('|') ? `(${regex})` : regex).join('|');
  });

  let regexRules = {};
  Object.keys(rules).forEach(n => {
    regexRules[n] = getRegexMemo(n);
  })

  let rule0 = getRegexMemo('0');
  rule0 = rule0.substring(1, rule0.length - 1);
  regexRules[0] = rule0;
  let fullRegex = new RegExp(`^${rule0}$`);


  console.log(rules);
  console.log(regexRules);
  console.log(fullRegex);

  inputLines = inputLines.split('\r\n')
  return inputLines.reduce((sum, line) => {
    let validLine = fullRegex.test(line);

    return sum + (validLine ? 1 : 0)
  }, 0);
})

day.task2(data => {
  return '';
})

function memoizer(fun) {
  let cache = {}
  return function (n) {
    if (cache[n] !== undefined) {
      return cache[n]
    } else {
      let result = fun(n)
      cache[n] = result
      return result
    }
  }
}
