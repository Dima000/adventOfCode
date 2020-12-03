let path = require('path');
let Day = require(path.join(__dirname, '..', '..', '..', 'helpers', 'Day'));
let _ = require('lodash');
let { matrixOfChars, prettyPrintMatrix } = require(path.join(__dirname, '..', '..', '..', 'helpers', 'matrix'));

let isTest = false;

function task1(data) {
  let W = 25, H = 6;
  let L = W * H;

  let max = Number.MAX_SAFE_INTEGER;
  let seq = '';
  for (let i = 0; i < data.length; i += L) {
    let aux = data.substr(i, L);
    let count = _.countBy(aux, i => i === '0').true;
    if (count < max) {
      seq = aux;
      max = count;
    }
  }

  const counter = _.countBy(seq, i => i);
  return counter['2'] * counter['1'];
}

function task2(data) {
  let W = 25, H = 6;
  let L = W * H;
  let matrix = matrixOfChars(W, H, '2');

  for (let i = 0; i < data.length; i += L) {

    for (let x = 0; x < H; x++) {
      for (let y = 0; y < W; y++) {
        let pixel = data[i + y + x * W];
        if (matrix[x][y] !== '1' && matrix[x][y] !== '.') {
          matrix[x][y] = pixel === '0' ? '.' : pixel;
        }
      }
    }
  }

  prettyPrintMatrix(matrix);

  return 'PRINTED RESULT';
}


let day = new Day(2019,  8, isTest);
day.task(1, task1);
day.task(2, task2);
