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

  it('renders amp-html, and passes `className` prop', () => {
    const wrapper = shallow((
      <Amp.Img className="cool" />
    ));

    expect(wrapper.find('[class="cool"]').length).toEqual(1);
  });

  it('renders amp-form, properly', () => {
    const ampScripts = new AmpScripts();
    const wrapper = render((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.Form />
        </div>
      </AmpScriptsManager>
    ));

    const ampScriptElements = ampScripts.getScriptElements();

    expect(ampScriptElements.length).toEqual(2);
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders amp-state & amp-bind properly, and only appends the amp-bind script', () => {
    const ampScripts = new AmpScripts();
    const wrapper = render((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.State id="myState">
            {{ text: 'Hello, World!' }}
          </Amp.State>
          <Amp.Bind text="myState.text">
            <div />
          </Amp.Bind>
        </div>
      </AmpScriptsManager>
    ));

    const ampScriptElements = ampScripts.getScriptElements();

    expect(ampScriptElements.length).toEqual(2);
    expect(wrapper.find('[\\[text\\]="myState.text"]').length).toEqual(1);
    expect(wrapper.find('amp-state').length).toEqual(1);
  });

  it('renders amphtml action `on` attribute properly', () => {
    const wrapper = shallow((
      <Amp.Action
        events={{
          tap: ['AMP.setState({ myState: { text: "tap!" }})', 'print'],
          change: ['AMP.setState({ myState: { input: event.value } })'],
        }}
      >
        <input />
      </Amp.Action>
    ));

    expect((
      wrapper.props()[' on']
    )).toEqual((
      'tap:AMP.setState({ myState: { text: "tap!" }}),print;change:AMP.setState({ myState: { input: event.value } })'
    ));
  });

  it('renders amp-action inside amp-bind properly', () => {
    const wrapper = shallow((
      <Amp.Bind text="myState.text">
        <Amp.Action
          events={{
            tap: ['print'],
          }}
        >
          <input />
        </Amp.Action>
      </Amp.Bind>
    ));

    const props = wrapper.dive().dive().props();

    expect(props[' on']).toEqual('tap:print');
    expect(props['[text]']).toEqual('myState.text');
  });

  it('renders amp-bind inside amp-action properly', () => {
    const wrapper = shallow((
      <Amp.Action
        events={{
          tap: ['print'],
        }}
      >
        <Amp.Bind text="myState.text">
          <input />
        </Amp.Bind>
      </Amp.Action>
    ));

    const props = wrapper.dive().dive().props();

    expect(props[' on']).toEqual('tap:print');
    expect(props['[text]']).toEqual('myState.text');
  });

  it('renders amp-bind inside amp-bind properly', () => {
    /* eslint-disable react/no-unknown-property */
    const wrapper = shallow((
      <Amp.Bind class="myState.class">
        <Amp.Bind text="myState.text">
          <input />
        </Amp.Bind>
      </Amp.Bind>
    ));
    /* eslint-enable */

    const props = wrapper.dive().dive().dive().props();

    expect(props['[class]']).toEqual('myState.class');
    expect(props['[text]']).toEqual('myState.text');
  });

  it('creates async script tags', () => {
    const wrapper = shallow(<AmpScript src="test" />);
    expect(wrapper.find('script[async]').length).toEqual(1);
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

    result.errors.forEach(({
      line,
      col,
      message,
      specUrl,
      severity,
    }) => {
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
