import { defineSemanticTokens } from '@pandacss/dev';

export const seedTokens = defineSemanticTokens.colors({
  colors: {
    neutral: {
      strong: { value: '{colors.gray.900}' },
      normal: { value: '{colors.gray.700}' },
      muted: { value: '{colors.gray.500}' },
      understated: { value: '{colors.gray.300}' },
      inverted: { value: '{colors.white}' },
    },

    primary: { value: '{colors.blue.500}' },
    secondary: { value: '{colors.gray.500}' },
    tertiary: { value: '{colors.white}' },
    success: { value: '{colors.green.500}' },
    warning: { value: '{colors.orange.500}' },
    danger: { value: '{colors.red.500}' },
    info: { value: '{colors.cyan.500}' },
  },
});
