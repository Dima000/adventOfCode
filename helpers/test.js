function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false
    }
  }
  return true
}

const setA = new Set([1,2,3,4]);
const setB = new Set([1,4]);

console.log(setA)
console.log(setB)

console.log(isSuperset(setA, setB))
console.log(isSuperset(setB, setA))
