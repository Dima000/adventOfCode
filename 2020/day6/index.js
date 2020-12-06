let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 6, isTest);
day.task(1, part1);
day.task(2, part2);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

function part1(data) {
  const groups = data.split('\r\n\r\n').map(groupData => groupData.split('\r\n'));

  const groupSets = groups.map(group => {
    const letters = new Set();
    group.forEach(word => {
      word.split('').forEach(letter => {
        letters.add(letter)
      });
    })
    return letters;
  })

  return _.sumBy(groupSets, set => set.size)
}

function part2(data) {
  const groups = data.split('\r\n\r\n').map(groupData => groupData.split('\r\n'));

  const groupSets = groups.map(group => {
    const letters = {
      length: group.length
    };
    group.forEach(word => {
      word.split('').forEach(letter => {
        letters[letter] = letters[letter] ? letters[letter] + 1 : 1;
      });
    })
    return letters;
  })

  const counts = groupSets.map(group => {
    let sum = 0;
    for (let [key, value] of Object.entries(group)) {
      if (key !== 'length' && group.length === value) {
        sum += 1;
      }
    }

    return sum;
  })


  return _.sum(counts);
}
