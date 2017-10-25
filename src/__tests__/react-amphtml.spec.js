import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
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
  headerBoilerplate,
} from '../';

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

  it('can server-side render valid html', async () => {
    expect.assertions(2);

    const app = createServer((req, res) => {
      const ampScripts = new AmpScripts();

      const bodyContent = renderToStaticMarkup((
        <AmpScriptsManager ampScripts={ampScripts}>
          <div>
            <Amp.Img src="/" width={0} height={0} layout="responsive" alt="test" />
            <Amp.Accordion />
          </div>
        </AmpScriptsManager>
      ));

      /* eslint-disable react/no-danger */
      const html = renderToStaticMarkup((
        <html lang="en" amp="">
          <head>
            {headerBoilerplate('/')}
            <title>react-amphtml</title>
            {ampScripts.getScriptElements()}
          </head>
          <body dangerouslySetInnerHTML={{ __html: bodyContent }} />
        </html>
      ));
      /* eslint-enable */

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(`
        <!doctype html>
        ${html}
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
