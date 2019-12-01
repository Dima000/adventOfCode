let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let isTest = false;

const day1 = new Day(1, isTest);
day1.task(1, task1);
day1.task(2, task2);

function task1(data) {
  const numbers = data.split('\r\n').filter(n => n).map(n => +n);

  return numbers.reduce((result, mass) => {
    const fuel = Math.floor(mass / 3) - 2;
    return result + fuel;
  }, 0);
}

function task2(data) {
  const numbers = data.split('\r\n').filter(n => n).map(n => +n);

  return numbers.reduce((result, mass) => {
    const totalFuel = getRecursiveFuel(mass);
    return result + totalFuel;
  }, 0);
}

function getRecursiveFuel(mass) {
  let totalFuel = 0;
  let fuel = mass;

  while (fuel > 0) {
    let newFuel = Math.floor(fuel / 3) - 2;
    fuel = newFuel < 0 ? 0 : newFuel;
    totalFuel += fuel;
  }

  return totalFuel;
}

