# react-amphtml

Use amphtml components inside your React apps easily!

## Usage

```js
import * as amphtml from 'react-amphtml';
```

### amphtml.Amp

An object containing React components that correspond to all built-ins and
extensions of [`amphtml`][amp repo].

The properties of this object are the names of each built-in or extension of
[`amphtml`][amp repo], but with the `amp-` prefix removed, and camel-cased,
instead of kebab-cased.

#### amphtml.Amp\[Amp Component\](\[props\]\[, context\])

*   `props` [`<Object>`][mdn object]

*   `context` [`<Object>`][mdn object]

    *   `[CONTEXT_KEY]` `<AmpScripts>`

Amp Components will accept any `props` given to them. If `AmpScriptsManager` is
passing an instance of `AmpScripts` through `context`, these components will add
the appropriate `<script />` tag to it.

### amphtml.AmpScript(props)

*   `props` [`<Object>`][mdn object]

    *   `src` [`<string>`][mdn string]

A component used to generate `amphtml` `<script />` tags to be rendered in the
`<head />` of the document. More than likely, you will not need to use this, as
these are created by an `AmpScripts` instance.

### Class: amphtml.AmpScripts

A class that is used to keep track of generated `amphtml` `<script />` tags. An
instance of this should be given to `AmpScriptsManager` for `Amp` components to
utilize through context.

#### new AmpScripts()

No constructor options.

#### ampScripts.addComponent(component)

Used to add a new `<script />` tag for use in the `<head />` of the
document.

*   `component` [`<string>`][mdn string]

    The name of the component (ex `"amp-youtube"`).

#### ampScripts.getScriptElements()

Returns an array of `AmpScripts`, `<script />` tags, to be rendered in the
`<head />` of the document.

### amphtml.AmpScriptsManager(props)

*   `props` [`<Object>`][mdn object]

    *   `children`  `<Component>`

    *   `ampScripts` `<AmpScripts>`

A component that passes an instance of `AmpScripts` as context to `Amp`
components.

## Resources

*   AMP Project's [`amphtml` repo][amp repo]

    *   [Builtins][amp repo builtins]

    *   [Extensions][amp repo extensions]

[amp repo]: https://github.com/ampproject/amphtml
[amp repo builtins]: ttps://github.com/ampproject/amphtml/tree/master/builtins
[amp repo extensions]: https://github.com/ampproject/amphtml/tree/master/extensions
[mdn object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[mdn string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
