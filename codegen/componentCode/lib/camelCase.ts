export default (tagName: string): string =>
  tagName.toLowerCase().replace(/-(.)/, (_, m): string => m.toUpperCase());
