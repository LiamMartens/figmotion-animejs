const path = require('path');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const ts = require('rollup-plugin-typescript2');
const { babel } = require('@rollup/plugin-babel');

module.exports = {
  input: path.join(__dirname, './src/index.ts'),
  output: {
    file: path.join(__dirname, './lib/index.js'),
    format: 'commonjs'
  },
  external: [
    'animejs'
  ],
  plugins: [
    resolve({
      preferBuiltins: false
    }),
    commonjs(),
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            corejs: 3,
            useBuiltIns: 'entry',
            targets: {
              browsers: ['last 2 versions']
            }
          }
        ]
      ],
      babelHelpers: 'bundled'
    }),
    ts()
  ],
};
