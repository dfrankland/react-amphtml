# react-amphtml
Use amphtml components inside your React apps easily!

## Install
```bash
$ npm install --saved react-amphtml
```

## Usage
```js
import amphtml from 'react-amphtml';
/* OR */
var amphtml = require('react-amphtml').default;
```

### `amphtml('component-name', callback)`
Returns a React component of the requested `'component-name'`.

#### `'component-name'`
Pass a string of the name of the amphtml component without the `amp-` prefix. Throws exception if it doesn't exist.
Ex: `'facebook'`, `'font'`, `'list'`, `'img'`

#### `callback`
Function that will be called with an argument passed containing an object of the amphtml component name and script URL.
Will only be called if the component is an extension, not a builtin.
Ex:
```js
{
  customElement: 'amp-analytics',
  src: 'https://cdn.ampproject.org/v0/amp-analytics-0.1.js'
}
```

## Example
```js
import React, { Component } from 'react';
import amphtml from 'react-amphtml';

const ampScripts = [];
const addScript = script => ampScripts.push(script);

const AmpImg = amphtml('img', addScript);
const AmpAnalytics = amphtml('analytics', addScript);

// Outputs list of component names and src to be used in HTML head
// Builtin components (like amp-img) don't add to the list, but extensions (like amp-analytics) will
// Ex: [ { customElement: 'amp-analytics', src: 'https://cdn.ampproject.org/v0/amp-analytics-0.1.js' } ]
console.log(ampScripts);

const Example => (props) => (
  <div>
    <AmpImg height={300} width={100} src="/awesome.png" /> // Returns <amp-image height="100" width={300} src="/awesome.png"></amp-image>
    <AmpAnalytics /> // Returns <amp-analytics></amp-analytics>
  </div>
);

export default Example;
```

## Resources
### AMP Project's [amphtml](https://github.com/ampproject/amphtml) repo
For a list of builtin components and extensions:
* [Builtins](https://github.com/ampproject/amphtml/tree/master/builtins)
* [Extensions](https://github.com/ampproject/amphtml/tree/master/extensions)
