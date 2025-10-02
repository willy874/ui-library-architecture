const path = require('path');
const fs = require('fs');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const esbuild = require('rollup-plugin-esbuild');
const json = require('@rollup/plugin-json');
const dts = require('rollup-plugin-dts');
const alias = require('@rollup/plugin-alias');
const { NODEJS_EXTERNALS } = require('@ui-library-architecture/builder-base');

const rootPath = process.cwd();

const pkgPath = path.resolve(rootPath, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const external = [
  ...NODEJS_EXTERNALS,
  /^node:/,
  ...Object.keys(pkg?.dependencies || {}),
  ...Object.keys(pkg?.peerDependencies || {}),
];

const plugins = [
  json.default(),
  resolve.default(),
  commonjs.default(),
  esbuild.default({
    sourceMap: true,
    target: 'es2015',
    tsconfig: path.resolve(rootPath, 'tsconfig.json'),
  }),
  alias.default({
    entries: [
      {
        find: /^@\/(.*)$/,
        replacement: path.resolve(rootPath, 'src/$1'),
        customResolver: resolve({
          extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
        }),
      },
    ],
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
    external,
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
    external,
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/main.d.ts',
      format: 'esm',
    },
    plugins: [dts.default()],
    external,
  },
];
