const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const esbuild = require('rollup-plugin-esbuild');
const dts = require('rollup-plugin-dts');

const rootPath = process.cwd();
const plugins = [
  resolve.default(),
  commonjs.default(),
  esbuild.default({
    sourceMap: true,
    target: 'es2015',
    tsconfig: path.resolve(rootPath, 'tsconfig.json'),
  }),
].filter(Boolean);

/**
 * @type {import('rollup').RollupOptions[]}
 */
module.exports = [
  {
    input: path.resolve(rootPath, 'src/main.ts'),
    output: {
      file: path.resolve(rootPath, 'dist/main.common.js'),
      format: 'cjs',
      interop: 'auto',
      exports: 'named',
      footer: 'module.exports = Object.assign(exports.default || {}, exports);',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: path.resolve(rootPath, 'src/main.ts'),
    output: {
      file: path.resolve(rootPath, 'dist/main.esm.js'),
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/main.d.ts',
      format: 'esm',
    },
    plugins: [dts.default()],
  },
];
