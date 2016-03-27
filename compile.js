import fs from 'fs';
import { render } from 'ejs';
import { transform } from 'babel-core';

const template = fs.readFileSync('./index.ejs', 'utf8');
const builtinsDir = fs.readdirSync('./node_modules/amp-html/builtins/');
const extensionsDir = fs.readdirSync('./node_modules/amp-html/extensions/');

const getAmpComponents = (dirItems, regex) => {
  const ampComponents = dirItems.reduce(
    (components, dirItem) => {
      const component = dirItem.match(regex);
      if (component !== null && component[1]) components.push(component[1]);
      return components;
    }, []
  );

  return JSON.stringify(ampComponents);
};

const builtins = getAmpComponents(builtinsDir, /^amp-(.*?)\.js$/);
const extensions = getAmpComponents(extensionsDir, /^amp-(.*?)$/);

const code = render(template, { builtins, extensions });
const result = transform(code, { presets: ['react', 'node5', 'stage-0'] });

fs.writeFile('./index.js', result.code, err => {
  if (err) throw err;
  console.log('Compilation complete.');
});
