import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { dependencies, peerDependencies } from './package.json';

export default {
  input: [
    './src/amphtml/amphtml.js',
    './src/helpers/helpers.js',
    './src/setup/setup.js',
  ],
  output: {
    dir: './dist',
    format: 'cjs',
    sourcemap: true,
  },
  experimentalCodeSplitting: true,
  experimentalDynamicImport: true,
  plugins: [
    nodeResolve(),
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            targets: {
              node: '8',
              browsers: ['last 2 versions', '> 1%'],
            },
          },
        ],
        'stage-0',
        'react',
      ],
      plugins: [
        'external-helpers',
        'codegen',
      ],
    }),
  ],
  external: [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies),
  ],
};
