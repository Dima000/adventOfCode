// Console color info
// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
function logResult(result, taskNr) {
  const name = taskNr === 1 ? 'First' : 'Second';
  console.log(`${name} Task Result:\x1b[36m`, result, '\x1b[0m');
}

function charCount(str, char = '#') {
  const match = str.match(new RegExp(char, 'g'));
  return match ? match.length : 0;
}

function digitArray(number) {
  const digits = [];

  while (number > 0) {
    digits.push(number % 10);
    number = Math.floor(number / 10);
  }

  return digits;
}

function permutator(inputArr) {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  };

  permute(inputArr);
  return result;
}

function isSuperSet(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false
    }
  }
  return true
}

function union(setA, setB) {
  let _union = new Set(setA)
  for (let elem of setB) {
    _union.add(elem)
  }
  return _union
}

function difference(setA, setB) {
  let _difference = new Set(setA)
  for (let elem of setB) {
    _difference.delete(elem)
  }
  return _difference
}

module.exports.logResult = logResult;
module.exports.digitArray = digitArray;
module.exports.permutator = permutator;
module.exports.isSuperSet = isSuperSet;
module.exports.union = union;
module.exports.difference = difference;
