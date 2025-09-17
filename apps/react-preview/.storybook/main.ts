import type { StorybookConfig } from '@storybook/react-vite';

import svgr from '@ui-library-architecture/rollup-plugin-svgr';

const config: StorybookConfig = {
  viteFinal: async (config) => {
    config.plugins?.push(svgr());
    return config;
  },

  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
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
