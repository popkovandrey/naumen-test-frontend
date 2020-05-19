const parseListLinks = (data) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(data, 'text/xml');

  const totalHits = doc.querySelector('searchinfo').attributes.totalhits.value;
  console.log(totalHits);
  const [...items] = doc.querySelectorAll('p');

  const prefixLink = 'https://ru.wikipedia.org/wiki/';

  const listLinks = items.map((item) => {
    const title = item.attributes.title.value;
    const link = prefixLink + title.split(' ').join('_');
    const snippet = item.attributes.snippet.value;
    const wordcount = item.attributes.wordcount.value;
    const timestamp = item.attributes.timestamp.value;
    const size = item.attributes.size.value;

    return {
      title, link, snippet, wordcount, timestamp, size,
    };
  });

  return listLinks;
};

const parseTotalHits = (data) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(data, 'text/xml');

  return doc.querySelector('searchinfo').attributes.totalhits.value;
};

export { parseListLinks, parseTotalHits };
