# react-amphtml

Use [`amphtml`][amp repo] components inside your React apps easily!

## Usage

`react-amphtml` exports React components and functions to easily create AMP HTML
pages. Each exported React component has a TypeScript interface and PropTypes
derived from AMP HTML's own validator rules to speed up development and make it
safer. Boilerplate and the inclusion of AMP directive-specific scripts is all
handled for you!

```js
// All AMP elements
import * as Amp from 'react-amphtml';

// Helper render props for actions and bindings
import * as AmpHelpers from 'react-amphtml/helpers';

// Components and functions to render pages
import {
  AmpScripts,
  AmpScriptsManager,
  headerBoilerplate,
} from 'react-amphtml/setup';
```

### Amp Components

```js
import * as Amp from 'react-amphtml';
// ...
<Amp.AmpCarousel {...props} />
```

The main file exported by `react-amphtml` contains all of the AMP HTML
directives as React components. This includes the custom element `amp-*`
directives, normal HTML directives with validations required by AMP, and some
components with added functionality: `Html`, `AmpState` (`amp-state` directive)
and `Script`.

To see a list of available components and their relative documentation see the
official AMP components documentation: [The AMP component catalogue][].

[The AMP component catalogue]: https://amp.dev/documentation/components/

### Amp Helpers

```js
import * as Amp from 'react-amphtml';
import * as AmpHelpers from 'react-amphtml/helpers';

// Example of attaching actions to elements
<AmpHelpers.Action events={{...}}>
  {(props) => (
    <button type="button" {...props}>
      Do Something
    </button>
  )}
</AmpHelpers.Action>

// Example of using state and bindings together
const defaultHeading = {
  text: 'Hello, World!',
};
// ...
<Amp.AmpState specName="amp-state" id="heading">
  {defaultHeading}
</Amp.AmpState>
<AmpHelpers.Bind text="heading.text">
  {(props): ReactElement => <h1 {...props}>{defaultHeading.text}</h1>}
</AmpHelpers.Bind>
```

The `helpers` file contains render prop components that help add AMP attribute
directives for actions and bindings. Wondering what actions and bindings are all
about? Check out these official guides on the subjects:

*   [Actions and events][]
*   [Create interactive AMP pages][]

[Create interactive AMP pages]: https://amp.dev/documentation/guides-and-tutorials/develop/interactivity/
[Actions and events]: https://amp.dev/documentation/guides-and-tutorials/learn/amp-actions-and-events

### Amp Setup

```js
import * as Amp from 'react-amphtml';
import {
  AmpScripts,
  AmpScriptsManager,
  headerBoilerplate,
} from 'react-amphtml/setup';

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
```

The `setup` file makes creating pages for AMP HTML a breeze. It helps insert all
the necessary boilerplate and also the scripts needed for AMP directives.

The code is based on the requirements from AMP documented in
[Create your AMP HTML page: Required mark-up][].

[Create your AMP HTML page: Required mark-up]: https://amp.dev/documentation/guides-and-tutorials/start/create/basic_markup#required-mark-up

## Examples

### Full Example

**Go checkout [`ampreact`][]!**

If you are looking for an example that is in combination with one or more of
these tools:

*   [AMP HTML][]
*   [Next.js][]
*   [React][]
*   [styled-components][]
*   [GraphQL][]
*   [TypeScript][]

[`ampreact`][] gives a very nice setup to get started with or learn from!

[AMP HTML]: https://github.com/ampproject/amphtml/
[Next.js]: https://github.com/zeit/next.js/
[React]: https://github.com/facebook/react/
[styled-components]: https://github.com/styled-components/styled-components/
[GraphQL]: https://github.com/graphql/graphql-js
[TypeScript]: https://github.com/microsoft/TypeScript
[`ampreact`]: https://github.com/dfrankland/ampreact

### Simple Example

For simple usage examples of `react-amphtml`, check the Jest unit tests in
[`react-amphtml/src/__tests__/react-amphtml.spec.tsx`][]. The best test to look
at is `can server-side render valid html` for a good complete usage of
`react-amphtml`.

[`react-amphtml/src/__tests__/react-amphtml.spec.tsx`]: https://github.com/dfrankland/react-amphtml/blob/master/src/__tests__/react-amphtml.spec.tsx

## Development

### About

The code for `react-amphtml` is generated from [AMP HTML's own validator][] via
[`amphtml-validator-rules`][].

Want to learn about AMP HTML validation? See the guide: [Validate AMP pages][].

Need to run the validator? Use either the online tool [The AMP Validator][] or
the npm package [`amphtml-validator`][].

[AMP HTML's own validator]: https://amp.dev/documentation/guides-and-tutorials/learn/validation-workflow/validate_amp
[Validate AMP pages]: https://github.com/ampproject/amphtml/tree/master/validator#amp-html--validator
[The AMP Validator]: https://validator.ampproject.org/
[`amphtml-validator`]: https://www.npmjs.com/package/amphtml-validator

### Commands

Use the following commands to develop on `react-amphtml`.

*   `npm run codegen`: Create components based on AMP HTML's validator. This
    must be done at least once prior to running `npm run build`, and can be done
    afterwards anytime code in `codegen` is modified.

*   `npm run build`: Bundles the source files into `dist`.

*   `npm run typecheck`: Uses TypeScript to ensure type safety. Should be run
    after running `npm run build` to check the files in `dist` that are bundled.

*   `npm run lint`: Use ESLint to check source files.

*   `npm run test`: Use Jest to run tests.

## Resources

-   [`amphtml-validator-rules`][]: the rules that get used to generate
    components

-   AMP Project's [`amphtml` repo][amp repo]

    -   [Builtins][]

    -   [Extensions][]

[`amphtml-validator-rules`]: https://github.com/dfrankland/amphtml-validator-rules
[Builtins]: https://github.com/ampproject/amphtml/tree/master/builtins
[Extensions]: https://github.com/ampproject/amphtml/tree/master/extensions

[amp repo]: https://github.com/ampproject/amphtml
