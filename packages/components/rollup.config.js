import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import less from 'rollup-plugin-less';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import css from 'rollup-plugin-css-only';
import csv from '@rollup/plugin-dsv';

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
    resolve({ preferBuiltins: false }),
    css(),
    less(),
    csv(),
    json(),
    image(),
    commonjs(),
  ],
  external: [
    'react',
    'react-dom',
    'react-dom/server',
    'gatsby',
    'gatsby-image',
    /@babel\/runtime/,
    '@aws-amplify/auth',
    'html2plaintext',
    'canvas-confetti'
  ],
};
