import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { render, shallow, mount } from 'enzyme';
import { renderToStaticMarkup } from 'react-dom/server';
import amphtmlValidator from 'amphtml-validator';
import * as Amp from '../amphtml/amphtml';
import * as AmpHelpers from '../helpers/helpers';
import {
  AmpScripts,
  AmpScriptsManager,
  headerBoilerplate,
} from '../setup/setup';

Enzyme.configure({ adapter: new Adapter() });

describe('react-amphtml', () => {
  it('renders amp-html built-ins, and does not generate extra script tags', () => {
    const ampScripts = new AmpScripts();
    render((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.AmpImg src="test" />
          <Amp.AmpPixel src="blah" />
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
          <Amp.AmpYoutube something="blah" />
          <Amp.AmpAccordion something="blah" />
          <Amp.Template type="amp-mustache">
            Hello, {'{{world}}'}!
          </Amp.Template>
        </div>
      </AmpScriptsManager>
    ));

    const ampScriptElements = ampScripts.getScriptElements();
    const wrapper = mount(<div>{ampScriptElements}</div>);

    expect(wrapper.find('[custom-element]').length).toEqual(2);
    expect(wrapper.find('[custom-template]').length).toEqual(1);
    expect(wrapper.find('script').length).toEqual(4);
  });

  it('renders amp-html, and works without context from AmpScriptsManager', () => {
    const wrapper = render((
      <div>
        <Amp.AmpYoutube something="blah" />
        <Amp.AmpAccordion something="blah" />
      </div>
    ));

    expect(wrapper.find('amp-youtube').length).toEqual(1);
    expect(wrapper.find('amp-accordion').length).toEqual(1);
  });

  it('renders amp-html, and passes `className` prop', () => {
    const wrapper = shallow((
      <Amp.AmpImg className="cool" src="blah" />
    ));

    expect(wrapper.find('[class="cool"]').length).toEqual(1);
  });

  it('renders amp-form, properly', () => {
    const ampScripts = new AmpScripts();
    const wrapper = render((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.Form specName="FORM [method=GET]" action="/" method="GET" target="self" />
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
          <Amp.AmpState id="myState">
            {{ text: 'Hello, World!' }}
          </Amp.AmpState>
          <AmpHelpers.Bind text="myState.text">
            {props => <div {...props} />}
          </AmpHelpers.Bind>
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
      <AmpHelpers.Action
        events={{
          tap: ['AMP.setState({ myState: { text: "tap!" }})', 'print'],
          change: ['AMP.setState({ myState: { input: event.value } })'],
        }}
      >
        {props => <input {...props} />}
      </AmpHelpers.Action>
    ));

    expect((
      wrapper.props()[' on']
    )).toEqual((
      'tap:AMP.setState({ myState: { text: "tap!" }}),print;change:AMP.setState({ myState: { input: event.value } })'
    ));
  });

  it('renders amp-action inside amp-bind properly', () => {
    const wrapper = shallow((
      <AmpHelpers.Bind text="myState.text">
        {props => (
          <AmpHelpers.Action
            {...props}
            events={{
              tap: ['print'],
            }}
          >
            {props1 => <input {...props1} />}
          </AmpHelpers.Action>
        )}
      </AmpHelpers.Bind>
    ));

    const props = wrapper.dive().dive().props();

    expect(props[' on']).toEqual('tap:print');
    expect(props['[text]']).toEqual('myState.text');
  });

  it('renders amp-bind inside amp-action properly', () => {
    const wrapper = shallow((
      <AmpHelpers.Action
        events={{
          tap: ['print'],
        }}
      >
        {props => (
          <AmpHelpers.Bind {...props} text="myState.text">
            {props1 => <input {...props1} />}
          </AmpHelpers.Bind>
        )}
      </AmpHelpers.Action>
    ));

    const props = wrapper.dive().dive().props();

    expect(props[' on']).toEqual('tap:print');
    expect(props['[text]']).toEqual('myState.text');
  });

  it('renders amp-bind inside amp-bind properly', () => {
    /* eslint-disable react/no-unknown-property */
    const wrapper = shallow((
      <AmpHelpers.Bind class="myState.class">
        {props => (
          <AmpHelpers.Bind {...props} text="myState.text">
            {props1 => <input {...props1} />}
          </AmpHelpers.Bind>
        )}
      </AmpHelpers.Bind>
    ));
    /* eslint-enable */

    const props = wrapper.dive().dive().dive().props();

    expect(props['[class]']).toEqual('myState.class');
    expect(props['[text]']).toEqual('myState.text');
  });

  it('can server-side render valid html', async () => {
    expect.assertions(2);

    const ampScripts = new AmpScripts();

    const bodyContent = renderToStaticMarkup((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.AmpImg src="/" width={0} height={0} layout="responsive" alt="test" />
          <Amp.AmpAccordion />
        </div>
      </AmpScriptsManager>
    ));

    /* eslint-disable react/no-danger */
    const html = renderToStaticMarkup((
      <Amp.Html specName="html ⚡ for top-level html" lang="en">
        <head>
          {headerBoilerplate('/')}
          <title>react-amphtml</title>
          {ampScripts.getScriptElements()}
        </head>
        <body dangerouslySetInnerHTML={{ __html: bodyContent }} />
      </Amp.Html>
    ));
    /* eslint-enable */

    const htmlPage = (
      `
        <!doctype html>
        ${html}
      `
    );

    expect(htmlPage).toMatchSnapshot();

    const validator = await amphtmlValidator.getInstance();
    const result = validator.validateString(htmlPage);

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
