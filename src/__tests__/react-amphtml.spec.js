import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
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
    mount((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.AmpImg specName="default" src="test" />
          <Amp.AmpPixel src="blah" />
        </div>
      </AmpScriptsManager>
    ));

    const ampScriptElements = ampScripts.getScriptElements();
    expect(ampScriptElements.length).toBe(1);
  });

  it('renders amp-html extensions, and generates script tags', () => {
    const ampScripts = new AmpScripts();
    mount((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.AmpYoutube something="blah" />
          <Amp.AmpAccordion something="blah" />
          <Amp.Template specName="default" type="amp-mustache">
            Hello,
            {' '}
            {'{{world}}'}
            !
          </Amp.Template>
        </div>
      </AmpScriptsManager>
    ));

    const ampScriptElements = ampScripts.getScriptElements();
    const wrapper = mount(<div>{ampScriptElements}</div>);

    expect(wrapper.find('[custom-element]').length).toBe(2);
    expect(wrapper.find('[custom-template]').length).toBe(1);
    expect(wrapper.find('script').length).toBe(4);
  });

  it('renders amp-html, and works without context from AmpScriptsManager', () => {
    const wrapper = mount((
      <div>
        <Amp.AmpYoutube something="blah" />
        <Amp.AmpAccordion something="blah" />
      </div>
    ));

    expect(wrapper.find('amp-youtube').length).toBe(1);
    expect(wrapper.find('amp-accordion').length).toBe(1);
  });

  it('renders amp-html, and passes `className` prop', () => {
    const wrapper = mount((
      <Amp.AmpImg specName="default" className="cool" src="blah" />
    ));

    expect(wrapper.find('[class="cool"]').length).toBe(1);
  });

  it('renders amp-form, properly', () => {
    const ampScripts = new AmpScripts();
    const wrapper = mount((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.Form specName="FORM [method=GET]" action="/" method="GET" target="self" />
        </div>
      </AmpScriptsManager>
    ));

    const ampScriptElements = ampScripts.getScriptElements();

    expect(ampScriptElements.length).toBe(2);
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders amp-state & amp-bind properly, and only appends the amp-bind script', () => {
    const ampScripts = new AmpScripts();
    const wrapper = mount((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.AmpState specName="amp-state" id="myState">
            {{ text: 'Hello, World!' }}
          </Amp.AmpState>
          <AmpHelpers.Bind text="myState.text">
            {props => <div {...props} />}
          </AmpHelpers.Bind>
        </div>
      </AmpScriptsManager>
    ));

    const ampScriptElements = ampScripts.getScriptElements();

    expect(ampScriptElements.length).toBe(2);
    expect(wrapper.find('[data-amp-bind-text="myState.text"]').length).toBe(1);
    expect(wrapper.find('amp-state').length).toBe(1);
  });

  it('renders amphtml action `on` attribute properly', () => {
    const wrapper = mount((
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
      wrapper.find('[on="tap:AMP.setState({ myState: { text: \\"tap!\\" }}),print;change:AMP.setState({ myState: { input: event.value } })"]').exists()
    )).toBe(true);
  });

  it('renders amp-action inside amp-bind properly', () => {
    const myStateText = 'myState.text';

    const wrapper = mount((
      <AmpHelpers.Bind text={myStateText}>
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

    expect(wrapper.find('[on="tap:print"]').exists()).toBe(true);
    expect(wrapper.find(`[data-amp-bind-text="${myStateText}"]`).exists()).toBe(true);
  });

  it('renders amp-bind inside amp-action properly', () => {
    const myStateText = 'myState.text';

    const wrapper = mount((
      <AmpHelpers.Action
        events={{
          tap: ['print'],
        }}
      >
        {props => (
          <AmpHelpers.Bind {...props} text={myStateText}>
            {props1 => <input {...props1} />}
          </AmpHelpers.Bind>
        )}
      </AmpHelpers.Action>
    ));

    expect(wrapper.find('[on="tap:print"]').exists()).toBe(true);
    expect(wrapper.find(`[data-amp-bind-text="${myStateText}"]`).exists()).toBe(true);
  });

  it('renders amp-bind inside amp-bind properly', () => {
    const myStateClass = 'myState.class';
    const myStateText = 'myState.text';

    /* eslint-disable react/no-unknown-property */
    const wrapper = mount((
      <AmpHelpers.Bind class={myStateClass}>
        {props => (
          <AmpHelpers.Bind {...props} text={myStateText}>
            {props1 => <input {...props1} />}
          </AmpHelpers.Bind>
        )}
      </AmpHelpers.Bind>
    ));
    /* eslint-enable */

    expect(wrapper.find(`[data-amp-bind-class="${myStateClass}"]`).exists()).toBe(true);
    expect(wrapper.find(`[data-amp-bind-text="${myStateText}"]`).exists()).toBe(true);
  });

  it(
    (
      'renders non-standard attributes on non-standard elements (this '
      + 'shouldn\'t throw warnings, otherwise this won\'t work with React '
      + 'normally even if this test passes; see '
      + 'https://github.com/facebook/react/pull/12568)'
    ),
    () => {
      const myStateClass = 'myState.class';
      const myStateText = 'myState.text';

      /* eslint-disable react/no-unknown-property */
      const wrapper = mount((
        <AmpHelpers.Bind class="myState.class">
          {props => (
            <AmpHelpers.Bind {...props} text="myState.text">
              {props1 => <Amp.AmpList specName="default" src="" {...props1} />}
            </AmpHelpers.Bind>
          )}
        </AmpHelpers.Bind>
      ));
      /* eslint-enable */

      expect(wrapper.find(`[data-amp-bind-class="${myStateClass}"]`).exists()).toBe(true);
      expect(wrapper.find(`[data-amp-bind-text="${myStateText}"]`).exists()).toBe(true);
    },
  );

  it('can server-side render valid html', async () => {
    expect.assertions(2);

    const ampScripts = new AmpScripts();

    const bodyContent = renderToStaticMarkup((
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.AmpImg
            specName="default"
            src="/"
            width={0}
            height={0}
            layout="responsive"
            alt="test"
          />
          <Amp.AmpAccordion />
        </div>
      </AmpScriptsManager>
    ));

    /* eslint-disable react/no-danger */
    const html = renderToStaticMarkup((
      // TODO: Should use `<Amp.Html />` component, but it currently tries to
      // use `⚡` as a prop name. React throws that prop out since React
      // considers it invalid.
      <html amp="amp" lang="en">
        <head>
          {headerBoilerplate('/')}
          <title>react-amphtml</title>
          {ampScripts.getScriptElements()}
        </head>
        <body dangerouslySetInnerHTML={{ __html: bodyContent }} />
      </html>
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

    expect(result.status).toBe('PASS');
  });
});
