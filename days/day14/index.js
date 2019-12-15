let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
const _ = require('lodash');

let isTest = true;

const ORE = 'ORE';
const FUEL = 'FUEL';

function task1(data) {
  const matrix = parseInputData(data);
  return findOreCost(matrix, FUEL, 1, {});
}

function task2(data) {
  const matrix = parseInputData(data);
  const TOTAL_ORE = 1000000000000;

  const estimatedOrePerFuel = findOreCost(matrix, FUEL, 1, {});
  const estimatedFuel = Math.floor(TOTAL_ORE / estimatedOrePerFuel);
  let currentFuel = estimatedFuel;
  let currentOre = estimatedOrePerFuel * estimatedFuel;

  while (currentOre < TOTAL_ORE) {
    currentFuel += 100;
    currentOre = findOreCost(matrix, FUEL, currentFuel, {});
  }

  while (currentOre > TOTAL_ORE) {
    currentFuel -= 1;
    currentOre = findOreCost(matrix, FUEL, currentFuel, {});
  }

  return currentFuel;
}

function parseInputData(data) {
  const matrix = {};

  for (let line of data.split('\r\n')) {
    let [input, output] = line.split(' => ');

    let [quantity, element] = output.trim().split(' ');

    const params = input.split(',').map(p => {
      let [quantity, element] = p.trim().split(' ');
      return { quantity: +quantity, element }
    });

    matrix[element] = { quantity: +quantity, params };
  }

  return matrix;
}

function findOreCost(matrix, element, needed, extras) {
  const { params, quantity } = matrix[element];

  const extra = extras[element] || 0;
  const nrOfReactions = Math.ceil((needed - extra) / quantity);
  extras[element] = extra + nrOfReactions * quantity - needed;

  if (params.length === 1 && params[0].element === ORE) {
    return nrOfReactions * params[0].quantity;
  }

  return params.reduce((res, paramData) => {
    const paramsNeeded = nrOfReactions * paramData.quantity;
    return res + findOreCost(matrix, paramData.element, paramsNeeded, extras);
  }, 0)
}

const day1 = new Day(14, isTest);
day1.task(1, task1);
day1.task(2, task2);
