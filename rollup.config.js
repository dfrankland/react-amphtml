import babel from 'rollup-plugin-babel';
import { dependencies, peerDependencies } from './package.json';

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
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
        'preval',
      ],
    }),
  ],
  external: [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies),
  ],
};
