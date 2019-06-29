import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import renameExtensions from '@betit/rollup-plugin-rename-extensions';
import { dependencies, peerDependencies } from './package.json';

process.env.BABEL_DISABLE_CACHE = 1;

export default {
  preserveModules: true,
  input: [
    './src/amphtml/amphtml.tsx',
    './src/helpers/helpers.ts',
    './src/setup/setup.ts',
  ],
  output: {
    dir: './dist',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts', '.tsx'],
    }),
    babel({
      extensions: ['.js', '.ts', '.tsx'],
      exclude: 'node_modules/**',
    }),
    renameExtensions({
      include: ['**/*.ts', '**/*.tsx'],
      mappings: {
        '.ts': '.js',
        '.tsx': '.js',
      },
    }),
  ],
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
};
