let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');
let day = new Day(2020, 13, isTest);

/*
* -------------------------------------------------------------------------------------
* Solution below
* -------------------------------------------------------------------------------------
*/

day.task1(data => {
  let [timestampString, numbersLine] = data.split('\r\n');
  let timestamp = +timestampString;
  let numbers = numbersLine.split(',').filter(n => n !== 'x').map(n => +n);

  let depart = timestamp;
  while (1) {
    let departBus = numbers.find(n => depart % n === 0);
    if (departBus) {
      return (depart - timestamp) * departBus
    }
    depart += 1
  }
})

day.task2(data => {
  let [timestampString, numbersLine] = data.split('\r\n');
  let numbers = [];
  numbersLine.split(',').forEach((n, index) => {
    if (n !== 'x') {
      numbers.push({ number: +n, index })
    }
  });

  let products = [];
  for (let i = 0; i < numbers.length; i++) {
    let prod = 1;
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j) {
        prod *= numbers[j].number;
      }
    }
    products.push(prod);
  }

  console.log(numbers);
  products = products.map((p, i) => {
    let number = numbers[i];
    let newP = p;

    while (newP % number.number !== number.index % number.number) {
      newP += p;
    }
    return newP;
  })

  let sum = _.sum(products);
  let prod = numbers.reduce((res, n) => res * n.number, 1);

  while (sum > 0) {
    sum = sum - prod;
  }

  return Math.abs(sum);
})
