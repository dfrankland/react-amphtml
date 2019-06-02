import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { exec } from 'child_process';
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
    {
      writeBundle: async () => {
        await new Promise((resolve, reject) => {
          exec(
            'npm run ts-declarations',
            { cwd: __dirname, env: process.env },
            (err, stdout, stderr) => {
              process.stdout.write(stdout);
              process.stderr.write(stderr);
              return err ? reject(err) : resolve();
            },
          );
        });
      },
    },
  ],
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
};
