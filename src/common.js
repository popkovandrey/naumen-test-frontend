const decOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const countWords = (num) => `${num} ${decOfNum(num, ['слово', 'слова', 'слов'])}`;

const countBytes = (num) => {
  let x = 0;

  x = num / 1048576;
  if (x > 1) {
    return `${Math.round(x)} Mb`;
  }

  x = num / 1024;
  if (x > 1) {
    return `${Math.round(x)} Kb`;
  }

  return `${num} b`;
};

export { countWords, countBytes };
