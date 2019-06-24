# react-amphtml

Use [`amphtml`][amp repo] components inside your React apps easily!

## Usage

```js
import * as Amp from 'react-amphtml';
import * as AmpHelpers from 'react-amphtml/helpers';
import {
  AmpScripts,
  AmpScriptsManager,
  headerBoilerplate,
} from 'react-amphtml/setup';
```

## Resources

- [`amphtml-validator-rules`][amp rules]: the rules that get used to generate
  components

- AMP Project's [`amphtml` repo][amp repo]

  - [Builtins][amp repo builtins]

  - [Extensions][amp repo extensions]

[amp rules]: https://github.com/dfrankland/amphtml-validator-rules
[amp repo]: https://github.com/ampproject/amphtml
[amp repo builtins]: ttps://github.com/ampproject/amphtml/tree/master/builtins
[amp repo extensions]: https://github.com/ampproject/amphtml/tree/master/extensions
