import React from 'react';
import { DOMProperty } from 'react-dom/lib/ReactInjection';
import { properties as DOMProperties } from 'react-dom/lib/DOMProperty';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme, { render, shallow } from 'enzyme';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'http';
import fetch from 'node-fetch';
import amphtmlValidator from 'amphtml-validator';
import {
  Amp,
  AmpScripts,
  AmpScriptsManager,
  AmpScript,
} from '../';

// By default React limit the set of valid DOM elements and attributes
// (https://github.com/facebook/react/issues/140) this config whitelist
// Amp elements/attributes
if (typeof DOMProperties.amp === 'undefined') {
  DOMProperty.injectDOMPropertyConfig({
    Properties: { amp: DOMProperty.MUST_USE_ATTRIBUTE },
    isCustomAttribute: attributeName => attributeName.startsWith('amp-'),
  });
}
if (typeof DOMProperties.customElement === 'undefined') {
  DOMProperty.injectDOMPropertyConfig({
    Properties: { customElement: DOMProperty.MUST_USE_ATTRIBUTE },
    isCustomAttribute: attributeName => attributeName === 'custom-element',
  });
}

Enzyme.configure({ adapter: new Adapter() });

describe('react-amphtml', () => {
  it('renders amp-html built-ins, and does not generate extra script tags', () => {
    const ampScripts = new AmpScripts();
    render((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.Img src="test" />
          <Amp.Pixel something="blah" />
        </div>
      </AmpScriptsManager>
    ));

    const ampScriptElements = ampScripts.getScriptElements();
    expect(ampScriptElements.length).toEqual(1);
  });

  it('renders amp-html extensions, and generates script tags', () => {
    const ampScripts = new AmpScripts();
    render((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.Youtube something="blah" />
          <Amp.Accordion something="blah" />
        </div>
      </AmpScriptsManager>
    ));

    const ampScriptElements = ampScripts.getScriptElements();
    expect(ampScriptElements.length).toEqual(3);
  });

  it('renders amp-html, and works without context from AmpScriptsManager', () => {
    const wrapper = render((
      <div>
        <Amp.Youtube something="blah" />
        <Amp.Accordion something="blah" />
      </div>
    ));

    expect(wrapper.find('amp-youtube').length).toEqual(1);
    expect(wrapper.find('amp-accordion').length).toEqual(1);
  });

  it('creates async script tags', () => {
    const wrapper = shallow(<AmpScript src="test" />);
    expect(wrapper.html()).toEqual('<script async="" src="test"></script>');
  });

  it('the README example works', async () => {
    expect.assertions(2);

    const app = createServer((req, res) => {
      const ampScripts = new AmpScripts();

      const body = renderToStaticMarkup((
        <AmpScriptsManager ampScripts={ampScripts}>
          <div>
            <Amp.Img src="/" width={0} height={0} layout="responsive" alt="test" />
            <Amp.Accordion />
          </div>
        </AmpScriptsManager>
      ));

      const ampScriptElements = ampScripts.getScriptElements();

      /* eslint-disable react/no-danger */
      const head = renderToStaticMarkup((
        <head>
          <meta charSet="utf-8" />
          <link rel="canonical" href="/" />
          <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
          <style
            amp-boilerplate=""
            dangerouslySetInnerHTML={{
              __html: `
                body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
              `,
            }}
          />
          <noscript>
            <style
              amp-boilerplate=""
              dangerouslySetInnerHTML={{
                __html: `
                  body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}
                `,
              }}
            />
          </noscript>
          <title>react-amphtml</title>
          {ampScriptElements}
        </head>
      ));
      /* eslint-enable */

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(`
        <!doctype html>
        <html lang="en" ⚡>
          ${head}
          <body>
            ${body}
          </head>
        </html>
      `);
    });

    const PORT = 3000;

    await new Promise((resolve) => {
      app.listen(PORT, (err) => {
        if (err) throw err;
        resolve();
      });
    });

    const response = await fetch(`http://localhost:${PORT}/`);
    const buffer = await response.buffer();

    app.close();

    const html = buffer.toString('utf8');

    expect(html).toMatchSnapshot();

    const validator = await amphtmlValidator.getInstance();
    const result = validator.validateString(html);

    result.errors.forEach(({ line, col, message, specUrl, severity }) => {
      ((severity === 'ERROR') ? console.error : console.warn)(( // eslint-disable-line no-console
        `line ${
          line
        }, col ${
          col
        }: ${
          message
        } ${
          specUrl ? ` (see ${specUrl})` : ''
        }`
      ));
    });

    expect(result.status).toEqual('PASS');
  });
});
