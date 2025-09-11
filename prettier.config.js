/**
 * @type {import('prettier').Config}
 */
module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 100,
  overrides: [
    {
      files: '**/*.{js,mjs,cjs,jsx}',
      options: {
        parser: 'oxc',
        plugins: ['@prettier/plugin-oxc'],
      },
    },
    {
      files: '**/*.{ts,mts,cts,tsx}',
      options: {
        parser: 'oxc-ts',
        plugins: ['@prettier/plugin-oxc'],
      },
    },
  ],
};
