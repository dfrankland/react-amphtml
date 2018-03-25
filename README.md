# react-amphtml

Use [`amphtml`][amp repo] components inside your React apps easily!

## Usage

```js
import * as Amp from 'react-amphtml';
import * as AmpHelpers from 'react-amphtml/helpers';
import { AmpScripts, AmpScriptsManager, headerBoilerplate } from 'react-amphtml/setup';
```

### Amp

An object containing React components that correspond to all built-ins and
extensions of [`amphtml`][amp repo].

The properties of this object are the names of each built-in or extension of
[`amphtml`][amp repo].

#### Amp.ComponentName(\[props\]\[, context\])

*   `props` [`<Object>`][mdn object]

*   `context` [`<Object>`][mdn object]

    *   `[CONTEXT_KEY]` `<AmpScripts>`

Amp components will accept any `props` given to them. If `AmpScriptsManager` is
passing an instance of `AmpScripts` through `context`, these components will add
the appropriate `<script />` tag to it.

### Overrides

Some of the components of the `Amp` object are overridden to provide more
ergonomics to using them in React.

#### Amp.State(props, context)

*   `props` [`<Object>`][mdn object]

    *   `children` [`<Object>`][mdn object]

    *   `id` [`<string>`][mdn string]

*   `context` [`<Object>`][mdn object]

    *   `[CONTEXT_KEY]` `<AmpScripts>`

`amp-state`, a component included in the `amp-bind` component script, requires
a single `<script type="application/json" />` element, with JSON as a child. In
React, the requires using `dangerouslySetInnerHTML`. To make this easier,
`Amp.State` does the heavy lifting.

##### Example

###### Target HTML

```html
<amp-state id="allAnimals">
  <script type="application/json">
    {
      "currentAnimal": "dog"
    }
  </script>
</amp-state>
```

###### JSX

```js
<Amp.State id="allAnimals">
  {{
    currentAnimal: 'dog',
  }}
</Amp.State>
```

### AmpHelpers

Some [`amphtml`][amp repo] components do not lend well to React or the way in
which `react-amphtml` was written. In these cases, the following components have
been added to make things easier.

#### AmpHelpers.Bind

[`amp-bind`][amp docs amp-bind] is a special extension of [`amphtml`][amp repo]
which allows for defining a state object, using `amp-state`, and also `[*]`
bound attributes. JSX does not like any props or attributes which use `[*]`
notation so `AmpHelpers.Bind` can be used to make it easier to read in these cases.

*   `props` [`<Object>`][mdn object]

    *   `children` [`<Function>`][mdn function]

    *   `[bound attribute]` [`<string>`][mdn string]

##### Example

###### Target HTML

```html
<p [text]="'Hello ' + foo">Hello World</p>
```

###### JSX

```js
<AmpHelpers.Bind text="'Hello ' + foo">
  {props => <p {...props}>Hello World</p>}
</AmpHelpers.Bind>
```

[amp docs amp-bind]: https://www.ampproject.org/docs/reference/components/amp-bind

#### AmpHelpers.Action

> The `on` attribute is used to install event handlers on elements. The events
> that are supported depend on the element. &mdash; [AMP Docs][amp docs on]

`on` is an attribute that is commonly used for actions, not just in
[`amphtml` repo][amp repo], but React too. React will remove any `on` attributes
from elements and try to set the appropriate event handlers, but
`AmpHelpers.Action`, has a small work-around to prevent this from happening. It's
also a bit easier to write the syntax for the events and actions that are to be
applied to an element.

*   `props` [`<Object>`][mdn object]

    *   `children` [`<Function>`][mdn function]

    *   `events` [`<Object>`][mdn object]

        *   `[eventName]` [`<Array>`][mdn array]

##### Example

###### Target HTML

```html
<button on="tap:AMP.setState({ foo: 'amp-bind' })">
```

###### JSX

```js
<AmpHelpers.Action
  events={{
    tap: ['AMP.setState({ foo: "amp-bind" })'],
  }}
>
  {props => <button {...props} />}
</AmpHelpers.Action>
```

[amp docs on]: https://www.ampproject.org/docs/reference/common_attributes#on

### Setup

#### Setup.AmpScript(props)

*   `props` [`<Object>`][mdn object]

    *   `src` [`<string>`][mdn string]

A component used to generate `amphtml` `<script />` tags to be rendered in the
`<head />` of the document. More than likely, you will not need to use this, as
these are created by an `AmpScripts` instance.

#### Class: Setup.AmpScripts

A class that is used to keep track of generated `amphtml` `<script />` tags. An
instance of this should be given to `AmpScriptsManager` for `Amp` components to
utilize through context.

##### new AmpScripts(defaultHtml)

*   `htmlFormat` [`<string>`][mdn string]

Pass either `'amphtml engine v0.js script'` or
`'amp4ads engine amp4ads-v0.js script'` to setup a normal `amphtml` page or an
`amp4ads` page, respectively. Defaults to `'amphtml engine v0.js script'` for a
normal `amphtml` page.

##### ampScripts.addExtension(extension)

Used to add a new `<script />` tag for use in the `<head />` of the
document.

*   `extension` [`<string>`][mdn string]

Pass the name of an extension (ex `'amp-youtube'`) which corresponds to a
`<script />` tag.

##### ampScripts.getScriptElements()

Returns an array of `AmpScripts`, `<script />` tags, to be rendered in the
`<head />` of the document.

#### Setup.AmpScriptsManager(props)

*   `props` [`<Object>`][mdn object]

    *   `children` `<Component>`

    *   `ampScripts` `<AmpScripts>`

A component that passes an instance of `AmpScripts` as context to `Amp`
components.

#### Setup.headerBoilerplate(href)

*   `href` [`<string>`][mdn string]

An function that returns an array of components for use in the `<head />` of the
document. `href` is the canonical reference to the source page. The array should
include everything that [`amphtml`][amp repo] validates for, excluding the
scripts generated by `AmpScripts`.

## Resources

*   AMP Project's [`amphtml` repo][amp repo]

    *   [Builtins][amp repo builtins]

    *   [Extensions][amp repo extensions]

[amp repo]: https://github.com/ampproject/amphtml
[amp repo builtins]: ttps://github.com/ampproject/amphtml/tree/master/builtins
[amp repo extensions]: https://github.com/ampproject/amphtml/tree/master/extensions
[mdn object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[mdn string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[mdn array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[mdn function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
