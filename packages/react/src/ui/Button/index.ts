import { defineTokens, defineRecipe, definePreset } from '@pandacss/dev';
import { compoundVariants } from './theme';

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
        inverse: { value: '{colors.black}' },
      },
      success: {
        default: { value: '{colors.success}' },
        inverse: { value: '{colors.white}' },
      },
      warning: {
        default: { value: '{colors.warning}' },
        inverse: { value: '{colors.black}' },
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
    outline: 'none',
    transition: 'background-color 0.2s, color 0.2s, border-color 0.2s, transform 0.2s',
    '&:focus&:not(:disabled)': {
      boxShadow: '0 0 0 3px var(--colors-button-outline-focus)',
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
  },
  variants: {
    theme: {
      primary: {},
      secondary: {},
      tertiary: {},
      neutral: {},
      info: {},
      success: {},
      warning: {},
      danger: {},
    },
    variant: {
      filled: {
        minWidth: '5.375rem',
        justifyContent: 'center',
        alignItems: 'center',
      },
      outlined: {
        minWidth: '5.375rem',
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        backgroundColor: '{colors.transparent}',
        border: 'none',
      },
      link: {
        backgroundColor: '{colors.transparent}',
        border: 'none',
        textDecoration: 'underline',
      },
    },
    size: {
      small: {},
      medium: {},
      large: {},
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
        minWidth: '0',
      },
    },
    space: {
      icon: {},
      text: {},
    },
  },
  defaultVariants: {
    variant: 'filled',
    theme: 'primary',
    size: 'medium',
    shape: 'rounded',
    space: 'text',
  },
  compoundVariants: [
    ...compoundVariants,
    {
      variant: 'filled',
      space: 'text',
      css: {
        minWidth: '0',
      },
    },
    {
      variant: 'outlined',
      space: 'text',
      css: {
        minWidth: '0',
      },
    },
    {
      variant: 'filled',
      size: 'small',
      space: 'text',
      css: {
        py: '{spacing.2}',
        px: '{spacing.3}',
        gap: '0.625rem',
      },
    },
    {
      variant: 'filled',
      size: 'medium',
      space: 'text',
      css: {
        py: '{spacing.3}',
        px: '{spacing.4}',
        gap: '0.625rem',
      },
    },
    {
      variant: 'filled',
      size: 'large',
      space: 'text',
      css: {
        py: '{spacing.4}',
        px: '{spacing.5}',
        gap: '0.625rem',
      },
    },
    {
      variant: 'outlined',
      size: 'small',
      space: 'text',
      css: {
        py: '{spacing.2}',
        px: '{spacing.3}',
        gap: '0.625rem',
      },
    },
    {
      variant: 'outlined',
      size: 'medium',
      space: 'text',
      css: {
        py: '{spacing.3}',
        px: '{spacing.4}',
        gap: '0.625rem',
      },
    },
    {
      variant: 'outlined',
      size: 'large',
      space: 'text',
      css: {
        py: '{spacing.4}',
        px: '{spacing.5}',
        gap: '0.625rem',
      },
    },
    {
      variant: 'text',
      theme: 'secondary',
      css: {
        color: 'var(--colors-button-secondary-inverse)',
        '&:disabled': {
          color: 'var(--colors-button-secondary-disabled)',
        },
      },
    },
    {
      size: 'small',
      space: 'text',
      css: {
        fontSize: '{fontSizes.xs}',
      },
    },
    {
      size: 'medium',
      space: 'text',
      css: {
        fontSize: '{fontSizes.md}',
      },
    },
    {
      size: 'large',
      space: 'text',
      css: {
        fontSize: '{fontSizes.lg}',
      },
    },
    {
      size: 'small',
      space: 'icon',
      css: {
        padding: '{spacing.2}',
        fontSize: '{fontSizes.lg}',
      },
    },
    {
      size: 'medium',
      space: 'icon',
      css: {
        padding: '{spacing.3}',
        fontSize: '{fontSizes.xl}',
      },
    },
    {
      size: 'large',
      space: 'icon',
      css: {
        padding: '{spacing.4}',
        fontSize: '{fontSizes.xl}',
      },
    },
  ],
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
