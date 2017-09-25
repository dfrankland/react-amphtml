const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const {
  Amp,
  AmpScripts,
  AmpScriptsManager,
} = require('../dist');

const ampScripts = new AmpScripts();

const html = renderToStaticMarkup(
  React.createElement(
    AmpScriptsManager,
    { ampScripts },
    React.createElement(
      'div',
      {},
      [
        React.createElement(
          Amp.Img,
          { src: 'test' },
        ),
        React.createElement(
          Amp.Pixel,
          { src: 'test' },
        ),
        React.createElement(
          Amp.Youtube,
          { src: 'test' },
        ),
      ],
    ),
  ),
);

const head = renderToStaticMarkup(
  React.createElement(
    'head',
    {},
    ampScripts.getScriptElements(),
  ),
);

console.log('<html>');
console.log(head);
console.log('<body>');
console.log(html);
console.log('</body>');
console.log('</html>');
