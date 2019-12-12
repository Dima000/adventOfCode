function isCircular(array) {
  const length = array.length;
  for (let i = 0; i < length / 2; i++) {
    if (array[i] !== array[length - 1 - i]) {
      return false;
    }
  }

  return true;
}

const circular = isCircular([1, 2, 3, 4, 3, 2, 1,1])
console.log(circular);
