let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 16, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
  const tickets = data.split('\r\n\r\n').map(lines => lines.split('\r\n'));

  let ranges = [];
  tickets[0].forEach(line => {
    let [min1, max1, min2, max2] = line.match(/\d+/g).map(n => +n);
    ranges.push([min1, max1]);
    ranges.push([min2, max2]);
  })

  let allTickets = _.flatten(getTickets(tickets[2]));
  return allTickets.reduce((sum, n) => {
    if (!validValue(ranges, n)) {
      sum += n;
    }

    return sum;
  }, 0);
})

day.task2(data => {
  const tickets = data.split('\r\n\r\n').map(lines => lines.split('\r\n'));

  // Rules
  let rulesMap = new Map();
  tickets[0].forEach(line => {
    let ruleName = line.split(':')[0];
    let [min1, max1, min2, max2] = line.match(/\d+/g).map(n => +n);
    rulesMap.set(ruleName, [[min1, max1], [min2, max2]])
  })

  // Other tickets
  let allRanges = _.flatten(Array.from(rulesMap.values()));

  let otherTickets = getTickets(tickets[2]);
  otherTickets = otherTickets.filter(numbers => {
    for (let n of numbers) {
      if (!validValue(allRanges, n)) {
        return false;
      }
    }

    return true;
  });

  // Sorted classes
  let sortedClasses = [];
  for (let [className, rules] of rulesMap) {
    sortedClasses.push({
      name: className,
      positions: findClassPositions(rules, otherTickets)
    });
  }

  let sortedNames = new Array(rulesMap.size);
  for (let i = 0; i < rulesMap.size; i++) {
    sortedClasses.sort((a, b) => a.positions.length - b.positions.length);

    //get first element
    let first = sortedClasses.shift();
    let index = first.positions[0];
    sortedNames[index] = first.name;

    // remove used index
    sortedClasses = sortedClasses.map(item => ({
      name: item.name,
      positions: item.positions.filter(n => n !== index)
    }));
  }

  //Your ticket product
  let yourTicket = getTickets(tickets[1])[0];
  return yourTicket.reduce((acc, n, index) => {
    let isSpecial = sortedNames[index].startsWith('departure');
    return acc * (isSpecial ? n : 1);
  }, 1)
})

function getTickets(ticketsLines) {
  let tickets = [];

  ticketsLines.shift();
  ticketsLines.forEach(line => {
    tickets.push(line.split(',').map(n => +n));
  });

  return tickets;
}

function validValue(ranges, value) {
  for (let range of ranges) {
    let [min, max] = range;
    if (value >= min && value <= max) {
      return true;
    }
  }
}

function findClassPositions(ranges, tickets) {
  let validPositions = [];
  let i = 0;
  while (i < tickets[0].length) {

    let validRule = true;
    for (let ticket of tickets) {
      let isValid = validValue(ranges, ticket[i]);
      if (!isValid) {
        validRule = false;
        break;
      }
    }

    if (validRule) {
      validPositions.push(i);
    }
    i += 1;
  }

  return validPositions;
}
