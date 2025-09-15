import { resolve, parse } from 'node:path';
import type { ParsedPath } from 'node:path';
import { copyFileSync, readFileSync } from 'node:fs';
import { defineConfig, withFilter } from 'vite';
import { globbySync } from 'globby';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { NODEJS_EXTERNALS } from '@ui-library-architecture/builder-base';
import svgr from '@ui-library-architecture/rollup-plugin-svgr';

const rootPath = process.cwd();

const pkgPath = resolve(rootPath, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
const external = [
  ...NODEJS_EXTERNALS,
  /^node:/,
  ...Object.keys(pkg?.dependencies || {}),
  ...Object.keys(pkg?.peerDependencies || {}),
  'react/jsx-runtime',
];

const renderBanner = (fileName: string) => {
  const file = parse(fileName);
  if (/\.(server|action)\.tsx?/.test(file.name)) {
    return `'use server';`;
  }
  if (isSpecialFile(file)) {
    return '';
  }
  return `'use client';`;
};

const isSpecialFile = (file: ParsedPath) => ['index', 'styles', 'assets'].includes(file.name);

const assetFileNames = (assetInfo: { name?: string }) => {
  if (assetInfo.name?.endsWith('.css')) {
    return 'styles.css';
  }
  return assetInfo.name || 'assets/[name].[ext]';
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    withFilter(
      dts({
        tsconfigPath: resolve(rootPath, 'tsconfig.app.json'),
        entryRoot: 'src',
        staticImport: true,
        afterBuild: () => {
          globbySync(['dist/**/*.d.ts', 'dist/**.d.ts']).map((file) => {
            // support nodejs commonjs modules consumers
            copyFileSync(file, file.replace(/\.d\.ts$/, '.d.cts'));
          });
        },
      }),
      { load: { id: /\.(d\.)?[cm]?tsx?$/ } },
    ),
    withFilter(
      svgr({
        esbuildOptions: { jsx: 'automatic' },
      }),
      { load: { id: /\.svg\?react$/ } },
    ),
    react(),
  ],
  build: {
    target: 'ES2017',
    minify: false,
    lib: {
      entry: globbySync(['src/main.ts', 'src/**/index.ts']),
      fileName: (format) => (format === 'es' ? 'index.esm.js' : 'index.cjs.js'),
    },
    rollupOptions: {
      logLevel: 'silent',
      external,
      output: [
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].cjs.js',
          banner: (x) => renderBanner(x.fileName),
          assetFileNames,
          inlineDynamicImports: true,
        },
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].esm.js',
          banner: (x) => renderBanner(x.fileName),
          assetFileNames,
          inlineDynamicImports: true,
        },
      ],
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': resolve(rootPath, 'src'),
      'styled-system': resolve(rootPath, 'src/styled-system'),
    },
  },
});
