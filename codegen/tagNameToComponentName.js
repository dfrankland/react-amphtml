module.exports = tagName =>
  tagName
    .toLowerCase()
    .replace(/(^.|-.)/g, (m, p1) => p1.replace('-', '').toUpperCase());
