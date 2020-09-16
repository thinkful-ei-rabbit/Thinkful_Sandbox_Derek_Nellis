function divide(a, b) {
  if (b == 0) {
    throw new Error('Cannot divide by 0');
  }

  return a / b;
}

const list = [5, 1, 2, 3, 4, 5];

function sort(list) {
  for (let i = 1; i < list.length; i++) {
    let j = i;
    while (j > 0 && list[j - 1] > list[j]) {
      let temp = list[j];
      list[j] = list[j - 1];
      list[j - 1] = temp;
      j--;
    }
  }
  return list;
}

module.exports = divide;
module.exports = sort;
