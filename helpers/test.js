const data = {
  'n': ['a', 'b'],
  'a': [],
  'b': []
};

const res = test(Object.entries(data), 'a')
console.log(res);


function test(matrixEntries, node) {
  return matrixEntries.find(entry => entry[1].find(n => n === node))[0];
}
