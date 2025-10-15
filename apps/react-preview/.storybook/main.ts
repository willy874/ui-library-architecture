import { cwd } from 'node:process';
import { resolve } from 'node:path';

import svgr from '@ui-library-architecture/rollup-plugin-svgr';

import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig, withFilter } from 'vite';

const rootPath = cwd();

const config: StorybookConfig = {
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [
        withFilter(
          svgr({
            esbuildOptions: { jsx: 'automatic' },
          }),
          { load: { id: /\.svg\?react$/ } },
        ),
      ],
      resolve: {
        alias: {
          '@': resolve(rootPath, 'src'),
          'styled-system': resolve(rootPath, 'src', 'styled-system'),
        },
      },
    });
  },
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
export default config;
