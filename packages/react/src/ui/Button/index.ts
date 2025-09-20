import { defineTokens, defineRecipe, definePreset } from '@pandacss/dev';
import { theme } from './theme';

export const token = defineTokens({
  colors: {
    button: {
      primary: {
        default: { value: '{colors.primary}' },
        inverse: { value: '{colors.white}' },
      },
      secondary: {
        default: { value: '{colors.secondary}' },
        inverse: { value: '{colors.white}' },
      },
      tertiary: {
        default: { value: '{colors.tertiary}' },
        inverse: { value: '{colors.black}' },
      },
      neutral: {
        default: { value: '{colors.neutral.normal}' },
        inverse: { value: '{colors.white}' },
      },
      info: {
        default: { value: '{colors.info}' },
        inverse: { value: '{colors.white}' },
      },
      success: {
        default: { value: '{colors.success}' },
        inverse: { value: '{colors.white}' },
      },
      warning: {
        default: { value: '{colors.warning}' },
        inverse: { value: '{colors.white}' },
      },
      danger: {
        default: { value: '{colors.danger}' },
        inverse: { value: '{colors.white}' },
      },
    },
  },
});

export const recipe = defineRecipe({
  className: 'ui-button',
  jsx: ['Button'],
  base: {
    display: 'inline-flex',
    lineHeight: '{lineHeights.base}',
    fontWeight: '{fontWeights.regular}',
    cursor: 'pointer',
    borderStyle: 'solid',
    borderWidth: '{borderWidths.1}',
    borderColor: 'var(--colors-button-border)',
    backgroundColor: 'var(--colors-button-bg)',
    color: 'var(--colors-button-text)',
    transition: 'background-color 0.2s, color 0.2s, border-color 0.2s, transform 0.2s',
    '&:focus&:not(:disabled)': {
      boxShadow: '0 0 0 3px var(--colors-button-outline-focus)',
      outlineStyle: 'solid',
      outlineWidth: '{borderWidths.1}',
      outlineColor: 'var(--colors-button-outline-focus)',
    },
    '&:hover&:not(:disabled)': {
      backgroundColor: 'var(--colors-button-bg-hover)',
      borderColor: 'var(--colors-button-border-hover)',
      color: 'var(--colors-button-text-hover)',
    },
    '&:active&:not(:disabled)': {
      transform: 'scale(1.02)',
    },
    _disabled: {
      cursor: 'not-allowed',
      backgroundColor: 'var(--colors-button-bg-disabled)',
      borderColor: 'var(--colors-button-border-disabled)',
      color: 'var(--colors-button-text-disabled)',
    },
    '&:link': {
      color: 'var(--colors-button-link)',
      '&:visited:not(:disabled)': {
        color: 'var(--colors-button-link-visited)',
      },
      '&:hover&:not(:disabled)': {
        color: 'var(--colors-button-link-hover)',
      },
      '&:active&:not(:disabled)': {
        color: 'var(--colors-button-link-active)',
      },
      '&:focus&:not(:disabled)': {
        boxShadow: '0 0 0 3px var(--colors-button-link-outline-focus)',
        outlineStyle: 'solid',
        outlineWidth: '{borderWidths.2}',
        outlineColor: 'var(--colors-button-link-outline-focus)',
      },
      '&:disabled': {
        color: 'var(--colors-button-link-disabled)',
      },
    },
  },
  variants: {
    theme,
    variant: {
      filled: {
        minWidth: '5.375rem',
        justifyContent: 'center',
        alignItems: 'center',
        outline: 'none',
        '&[data-icon]': {
          minWidth: 'auto',
        },
      },
      outlined: {
        minWidth: '5.375rem',
        justifyContent: 'center',
        alignItems: 'center',
        outline: 'none',
        '&[data-icon]': {
          minWidth: 'auto',
        },
      },
      text: {
        backgroundColor: '{colors.transparent}',
        border: 'none',
        padding: '0',
        boxShadow: 'none',
      },
      link: {
        textDecoration: 'underline',
        backgroundColor: '{colors.transparent}',
        border: 'none',
        padding: '0',
        boxShadow: 'none',
      },
    },
    size: {
      small: {
        fontSize: '{fontSizes.xs}',
        py: '{spacing.1}',
        px: '{spacing.2}',
        gap: '0.625rem',
        '&[data-icon]': {
          padding: '{spacing.1}',
        },
      },
      medium: {
        fontSize: '{fontSizes.md}',
        py: '{spacing.2}',
        px: '{spacing.3}',
        gap: '0.625rem',
        '&[data-icon]': {
          padding: '{spacing.2}',
        },
      },
      large: {
        fontSize: '{fontSizes.lg}',
        py: '{spacing.3}',
        px: '{spacing.4}',
        gap: '0.625rem',
        '&[data-icon]': {
          padding: '{spacing.3}',
        },
      },
    },
    shape: {
      rounded: {
        borderRadius: '{radii.md}',
      },
      square: {
        borderRadius: '0',
      },
      pill: {
        borderRadius: '{radii.full}',
      },
      circle: {
        borderRadius: '{radii.circle}',
        minWidth: 'auto',
      },
    },
  },
  defaultVariants: {
    variant: 'filled',
    theme: 'neutral',
    size: 'medium',
    shape: 'rounded',
  },
});

export function createButtonPreset() {
  return definePreset({
    name: 'ui-Button',
    theme: {
      extend: {
        recipes: {
          button: recipe,
        },
        semanticTokens: token,
      },
    },
  });
}
