import { defineConfig } from '@pandacss/dev';
import { createUIPreset } from '@ui-library-architecture/core-ui';

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  jsxFramework: 'react',

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  layers: {
    reset: 'ui-reset',
    base: 'ui-base',
    tokens: 'ui-theme',
    recipes: 'ui-components',
    utilities: 'ui-utilities',
  },

  presets: [createUIPreset()],

  // Files to exclude
  exclude: ['assets/**/*'],

  // The output directory for your css system
  outdir: 'src/styled-system',

  staticCss: {
    recipes: '*',
  },
});
