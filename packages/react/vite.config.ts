import { resolve, parse } from 'node:path';
import type { ParsedPath } from 'node:path';
import { copyFileSync, readFileSync } from 'node:fs';
import { defineConfig, withFilter } from 'vite';
import { globbySync } from 'globby';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { NODEJS_EXTERNALS } from '@ui-library-architecture/builder-base';

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
    react(),
  ],
  build: {
    target: 'ES2017',
    minify: false,
    lib: {
      entry: globbySync(['src/main.ts', 'src/**/index.tsx?']),
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
        },
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].esm.js',
          banner: (x) => renderBanner(x.fileName),
        },
      ],
    },
  },
});
