import { defineTokens, defineRecipe, definePreset } from '@pandacss/dev';

export const token = defineTokens({
  colors: {
    input: {
      normal: {
        text: { value: '{colors.neutral.normal}' },
        border: { value: '{colors.neutral.muted}' },
        placeholder: {
          value: 'color-mix(in oklch, {colors.neutral.muted} 80%, transparent)',
        },
        bg: { value: 'color-mix(in oklch, {colors.neutral.understated} 5%, transparent)' },
        hover: { value: 'color-mix(in oklch, {colors.info} 85%, transparent)' },
      },
      selected: {
        default: { value: '{colors.info}' },
        shadow: { value: 'color-mix(in oklab, {colors.info} 20%, transparent)' },
      },
      disabled: {
        text: { value: 'color-mix(in oklch, {colors.neutral.normal} 40%, transparent)' },
        border: { value: 'color-mix(in oklch, {colors.neutral.muted} 40%, transparent)' },
        placeholder: {
          value: 'color-mix(in oklch, {colors.neutral.muted} 40%, transparent)',
        },
        bg: { value: 'color-mix(in oklch, {colors.neutral.understated} 10%, transparent)' },
      },
    },
  },
});

export const recipe = defineRecipe({
  className: 'ui-input',
  jsx: ['Input'],
  base: {
    color: '{colors.input.normal.text}',
    backgroundColor: '{colors.input.normal.bg}',
    borderWidth: '{borderWidths.1}',
    borderStyle: 'solid',
    borderColor: '{colors.input.normal.border}',
    borderRadius: '{radii.md}',
    py: '{spacing.2}',
    px: '{spacing.3}',
    fontSize: '{fontSizes.lg}',
    fontWeight: '{fontWeights.regular}',
    lineHeight: '{lineHeights.base}',
    _focus: {
      outline: 'none',
      borderColor: '{colors.input.selected.default}',
      boxShadow: '0 0 0 3px {colors.input.selected.shadow}',
    },
    _placeholder: {
      color: '{colors.input.normal.placeholder}',
    },
    _disabled: {
      color: '{colors.input.disabled.text}',
      borderColor: '{colors.input.disabled.border}',
      backgroundColor: '{colors.input.disabled.bg}',
      cursor: 'not-allowed',
      _placeholder: {
        color: '{colors.input.disabled.placeholder}',
      },
    },
  },
});

export function createInputPreset() {
  return definePreset({
    name: 'ui-Input',
    theme: {
      extend: {
        recipes: {
          input: recipe,
        },
        semanticTokens: token,
      },
    },
  });
}
