const decOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];

  return titles[
    (number % 100 > 4 && number % 100 < 20)
      ? 2
      : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const countWords = (num, texts) => `${num} ${decOfNum(num, [
  texts('countWords.1'),
  texts('countWords.2'),
  texts('countWords.3'),
])}`;

const countBytes = (num, texts) => {
  let x = 0;

  x = num / 1048576;
  if (x > 1) {
    return `${Math.round(x)} ${texts('sizeFile.MB')}`;
  }

  x = num / 1024;
  if (x > 1) {
    return `${Math.round(x)} ${texts('sizeFile.KB')}`;
  }

  return `${num} ${texts('sizeFile.B')}`;
};

const translate = (texts) => {
  const input = document.getElementById('text_search');
  const btnSubmit = document.getElementById('btn_submit');
  const countRes = document.getElementById('count_res');

  btnSubmit.textContent = texts('btnFindCaption');
  input.attributes.placeholder.value = texts('placeholder');
  countRes.textContent = texts('countRes');
};

const getCookie = (name, def = 'default') => {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
  ));
  return matches ? decodeURIComponent(matches[1]) : def;
};

export {
  countWords,
  countBytes,
  translate,
  getCookie,
};
