export default (tagName: string): string =>
  tagName
    .toLowerCase()
    .replace(
      /(^.|-.)/g,
      (_: string, p1: string): string => p1.replace('-', '').toUpperCase(),
    );
