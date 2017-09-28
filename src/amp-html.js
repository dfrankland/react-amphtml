const { resolve: resolvePath, basename } = require('path');
const { sync: globSync } = require('glob');

const AMP_DIR = resolvePath(__dirname, '../node_modules/amp-html');
const AMP_DIR_BUILTINS = resolvePath(AMP_DIR, './builtins');
const AMP_DIR_EXTENSIONS = resolvePath(AMP_DIR, './extensions');

module.exports = {
  builtins: globSync(
    resolvePath(AMP_DIR_BUILTINS, './amp-*.js'),
  ).map(
    path => basename(path, '.js'),
  ),
  extensions: globSync(
    resolvePath(AMP_DIR_EXTENSIONS, './amp-*/'),
  ).map(
    path => basename(path),
  ),
};
