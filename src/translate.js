const translate = (texts) => {
  const btnSubmit = document.getElementById('btn_submit');

  btnSubmit.textContent = texts('btnFindCaption');
};

export default translate;
