import babel from 'rollup-plugin-babel';
import { resolve as resolvePath, basename } from 'path';
import { sync as globSync } from 'glob';
import { dependencies, peerDependencies } from './package.json';

const AMP_DIR = resolvePath(__dirname, './node_modules/amp-html');
const AMP_DIR_BUILTINS = resolvePath(AMP_DIR, './builtins');
const AMP_DIR_EXTENSIONS = resolvePath(AMP_DIR, './extensions');

const builtins = globSync(
  resolvePath(AMP_DIR_BUILTINS, './amp-*.js'),
).map(
  path => basename(path, '.js'),
);

const extensions = globSync(
  resolvePath(AMP_DIR_EXTENSIONS, './amp-*/'),
).map(
  path => basename(path),
);

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    {
      name: 'amp-html',
      transform: (code, id) => {
        if (!/amp-html\.js$/.test(id)) return null;
        return  {
          code: `
            export const builtins = ${JSON.stringify(builtins)}
            export const extensions = ${JSON.stringify(extensions)}
          `,
          map: {
            version: 3,
            file: 'amp-html',
            sources: [],
            sourcesContent: [],
            names: [],
            mappings: '',
          },
        };
      },
    },
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            targets: {
              node: '6',
              browsers: ['last 2 versions', '> 1%'],
            },
          },
        ],
        'stage-0',
        'react',
      ],
      plugins: [
        'external-helpers',
      ],
    }),
  ],
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
};
