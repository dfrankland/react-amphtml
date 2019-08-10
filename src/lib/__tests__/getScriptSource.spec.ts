import getScriptSource from '../getScriptSource';

describe('getScriptSource', (): void => {
  it('returns a url', (): void => {
    const src = 'test-src';
    const extension = 'test-extension';
    const version = 'test-version';

    expect(getScriptSource({ src, extension, version })).toBe(src);
    expect(getScriptSource({ src })).toBe(src);
    expect(getScriptSource({ extension, version })).toBe(
      `https://cdn.ampproject.org/v0/${extension}-${version}.js`,
    );
    expect(getScriptSource({ version })).toBe(
      `https://cdn.ampproject.org/v0/-${version}.js`,
    );
    expect(getScriptSource({ extension })).toBe(
      `https://cdn.ampproject.org/v0/${extension}-latest.js`,
    );
  });
});
