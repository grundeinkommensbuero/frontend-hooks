import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import less from 'rollup-plugin-less';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';
import babelConfig from '../../babel.config.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      ...babelConfig,
    }),
    resolve(),
    less(),
    json(),
    commonjs(),
  ],
  external: ['react', 'react-dom', /@babel\/runtime/, '@aws-amplify/auth'],
};
