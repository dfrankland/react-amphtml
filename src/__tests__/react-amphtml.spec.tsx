import React, { ReactElement } from 'react';
import { mount } from 'enzyme';
import { renderToStaticMarkup } from 'react-dom/server';
import amphtmlValidator from 'amphtml-validator';
import * as Amp from '../amphtml/amphtml';
import * as AmpHelpers from '../helpers/helpers';
import { ActionOnProps } from '../helpers/Action';
import {
  AmpScripts,
  AmpScriptsManager,
  headerBoilerplate,
} from '../setup/setup';

describe('react-amphtml', (): void => {
  it('renders amp-html built-ins, and does not generate extra script tags', (): void => {
    const ampScripts = new AmpScripts();
    mount(
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.AmpImg specName="default" src="test" />
          <Amp.AmpPixel src="blah" />
        </div>
      </AmpScriptsManager>,
    );

    const ampScriptElements = ampScripts.getScriptElements();
    expect(ampScriptElements.length).toBe(1);
  });

  it('renders amp-html extensions, and generates script tags', (): void => {
    const ampScripts = new AmpScripts();
    mount(
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.AmpYoutube />
          <Amp.AmpAccordion />
          <Amp.Template specName="default" type="amp-mustache">
            Hello, {'{{world}}'}!
          </Amp.Template>
        </div>
      </AmpScriptsManager>,
    );

    const ampScriptElements = ampScripts.getScriptElements();
    const wrapper = mount(<div>{ampScriptElements}</div>);

    expect(wrapper.find('[custom-element]').length).toBe(2);
    expect(wrapper.find('[custom-template]').length).toBe(1);
    expect(wrapper.find('script').length).toBe(4);
  });

  it('should be able to statically export script sources', (): void => {
    const ampScripts = new AmpScripts();
    mount(
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.AmpYoutube />
          <Amp.AmpScript src="test.js" />
          <Amp.AmpAccordion />
        </div>
      </AmpScriptsManager>,
    );

    const ampScriptSources = ampScripts.getScripts();

    expect(ampScriptSources).toEqual(
      expect.arrayContaining([
        'https://cdn.ampproject.org/v0/amp-youtube-latest.js',
        'https://cdn.ampproject.org/v0/amp-script-latest.js',
        'https://cdn.ampproject.org/v0/amp-accordion-latest.js',
      ]),
    );
  });

  it('can specify versions of script tags', (): void => {
    const ampScripts = new AmpScripts();
    mount(
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.Template specName="default" type="amp-mustache" version="0.2">
            Hello
          </Amp.Template>
        </div>
      </AmpScriptsManager>,
    );

    const ampScriptsSources = ampScripts.getScripts();
    expect(ampScriptsSources).toEqual(
      expect.arrayContaining([
        'https://cdn.ampproject.org/v0/amp-mustache-0.2.js',
      ]),
    );
  });

  it('warns on invalid versions of script tags', (): void => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const ampScripts = new AmpScripts();
    mount(
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.Template specName="default" type="amp-mustache" version="bad">
            Hello
          </Amp.Template>
        </div>
      </AmpScriptsManager>,
    );

    mount(<div>{ampScripts.getScriptElements()}</div>);
    expect(consoleSpy).toHaveBeenCalledTimes(2);
    consoleSpy.mockRestore();
  });

  it('renders amp-html, and works without context from AmpScriptsManager', (): void => {
    const wrapper = mount(
      <div>
        <Amp.AmpYoutube />
        <Amp.AmpAccordion />
      </div>,
    );

    expect(wrapper.find('amp-youtube').length).toBe(1);
    expect(wrapper.find('amp-accordion').length).toBe(1);
  });

  it('renders amp-html, and passes `className` prop', (): void => {
    const wrapper = mount(
      <Amp.AmpImg specName="default" className="cool" src="blah" />,
    );

    expect(wrapper.find('[class="cool"]').length).toBe(1);
  });

  it('renders amp-form, properly', (): void => {
    const ampScripts = new AmpScripts();
    const wrapper = mount(
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.Form
            specName="FORM [method=GET]"
            action="/"
            method="GET"
            target="self"
          />
        </div>
      </AmpScriptsManager>,
    );

    const ampScriptElements = ampScripts.getScriptElements();

    expect(ampScriptElements.length).toBe(2);
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders amp-state & amp-bind properly, and only appends the amp-bind script', (): void => {
    const ampScripts = new AmpScripts();
    const initialState = { text: 'Hello, World!' };
    const wrapper = mount(
      <AmpScriptsManager ampScripts={ampScripts}>
        <div>
          <Amp.AmpState specName="amp-state" id="myState">
            {initialState}
          </Amp.AmpState>
          <AmpHelpers.Bind text="myState.text">
            {(props): ReactElement => <div {...props} />}
          </AmpHelpers.Bind>
        </div>
      </AmpScriptsManager>,
    );

    const ampScriptElements = ampScripts.getScriptElements();

    expect(ampScriptElements.length).toBe(2);
    expect(wrapper.find('[data-amp-bind-text="myState.text"]').length).toBe(1);
    expect(wrapper.find('amp-state').length).toBe(1);
    expect(wrapper.find('amp-state').text()).toBe(JSON.stringify(initialState));
  });

  it('renders amphtml action `on` attribute properly', (): void => {
    const wrapper = mount(
      <AmpHelpers.Action
        events={{
          tap: ['AMP.setState({ myState: { text: "tap!" }})', 'print'],
          change: ['AMP.setState({ myState: { input: event.value } })'],
        }}
      >
        {(props: ActionOnProps): ReactElement => <input {...(props as any)} />}
      </AmpHelpers.Action>,
    );

    expect(
      wrapper
        .find(
          '[on="tap:AMP.setState({ myState: { text: \\"tap!\\" }}),print;change:AMP.setState({ myState: { input: event.value } })"]',
        )
        .exists(),
    ).toBe(true);
  });

  it('renders amp-action inside amp-bind properly', (): void => {
    const myStateText = 'myState.text';

    const wrapper = mount(
      <AmpHelpers.Bind text={myStateText}>
        {(props): ReactElement => (
          <AmpHelpers.Action
            {...props}
            events={{
              tap: ['print'],
            }}
          >
            {(props1: ActionOnProps): ReactElement => (
              <input {...(props1 as any)} />
            )}
          </AmpHelpers.Action>
        )}
      </AmpHelpers.Bind>,
    );

    expect(wrapper.find('[on="tap:print"]').exists()).toBe(true);
    expect(wrapper.find(`[data-amp-bind-text="${myStateText}"]`).exists()).toBe(
      true,
    );
  });

  it('renders amp-bind inside amp-action properly', (): void => {
    const myStateText = 'myState.text';

    const wrapper = mount(
      <AmpHelpers.Action
        events={{
          tap: ['print'],
        }}
      >
        {(props): ReactElement => (
          <AmpHelpers.Bind {...props} text={myStateText}>
            {(props1): ReactElement => <input {...props1} />}
          </AmpHelpers.Bind>
        )}
      </AmpHelpers.Action>,
    );

    expect(wrapper.find('[on="tap:print"]').exists()).toBe(true);
    expect(wrapper.find(`[data-amp-bind-text="${myStateText}"]`).exists()).toBe(
      true,
    );
  });

  it('renders amp-bind inside amp-bind properly', (): void => {
    const myStateClass = 'myState.class';
    const myStateText = 'myState.text';

    /* eslint-disable react/no-unknown-property */
    const wrapper = mount(
      <AmpHelpers.Bind class={myStateClass}>
        {(props): ReactElement => (
          <AmpHelpers.Bind {...props} text={myStateText}>
            {(props1): ReactElement => <input {...props1} />}
          </AmpHelpers.Bind>
        )}
      </AmpHelpers.Bind>,
    );
    /* eslint-enable */

    expect(
      wrapper.find(`[data-amp-bind-class="${myStateClass}"]`).exists(),
    ).toBe(true);
    expect(wrapper.find(`[data-amp-bind-text="${myStateText}"]`).exists()).toBe(
      true,
    );
  });

  it(
    'renders non-standard attributes on non-standard elements (this ' +
      "shouldn't throw warnings, otherwise this won't work with React " +
      'normally even if this test passes; see ' +
      'https://github.com/facebook/react/pull/12568)',
    (): void => {
      const myStateClass = 'myState.class';
      const myStateText = 'myState.text';

      /* eslint-disable react/no-unknown-property */
      const wrapper = mount(
        <AmpHelpers.Bind class="myState.class">
          {(props): ReactElement => (
            <AmpHelpers.Bind {...props} text="myState.text">
              {(props1): ReactElement => (
                <Amp.AmpList specName="default" src="" {...props1} />
              )}
            </AmpHelpers.Bind>
          )}
        </AmpHelpers.Bind>,
      );
      /* eslint-enable */

      expect(
        wrapper.find(`[data-amp-bind-class="${myStateClass}"]`).exists(),
      ).toBe(true);
      expect(
        wrapper.find(`[data-amp-bind-text="${myStateText}"]`).exists(),
      ).toBe(true);
    },
  );

  it('can server-side render valid html', async (): Promise<void> => {
    expect.assertions(2);

    const ampScripts = new AmpScripts();

    const bodyContent = renderToStaticMarkup(
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
      </AmpScriptsManager>,
    );

    /* eslint-disable react/no-danger */
    const html = renderToStaticMarkup(
      <Amp.Html>
        <head>
          {headerBoilerplate('/')}
          <title>react-amphtml</title>
          {ampScripts.getScriptElements()}
        </head>
        <body dangerouslySetInnerHTML={{ __html: bodyContent }} />
      </Amp.Html>,
    );
    /* eslint-enable */

    const htmlPage = `
        <!doctype html>
        ${html}
      `;

    expect(htmlPage).toMatchSnapshot();

    const validator = await amphtmlValidator.getInstance();
    const result = validator.validateString(htmlPage);

    result.errors.forEach(({ line, col, message, specUrl, severity }): void => {
      // eslint-disable-next-line no-console
      (severity === 'ERROR' ? console.error : console.warn)(
        // eslint-disable-line no-console
        `line ${line}, col ${col}: ${message} ${
          specUrl ? ` (see ${specUrl})` : ''
        }`,
      );
    });

    expect(result.status).toBe('PASS');
  });
});
