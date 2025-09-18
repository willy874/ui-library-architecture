import { defineTokens, defineRecipe, definePreset } from '@pandacss/dev';

export const token = defineTokens({
  colors: {
    button: {
      primary: {
        default: { value: '{colors.slate.800}' },
        inverse: { value: '{colors.white}' },
        hover: { value: '{colors.slate.950}' },
        active: { value: '{colors.slate.700}' },
        disabled: { value: '{colors.slate.300}' },
        disabledInverse: { value: '{colors.white}' },
        outline: {
          default: { value: '{colors.slate.800}' },
          hover: { value: '{colors.slate.950}' },
        },
        link: {
          default: { value: '{colors.sky.500}' },
          hover: { value: '{colors.sky.600}' },
          active: { value: '{colors.sky.400}' },
          disabled: { value: '{colors.sky.200}' },
        },
      },
      secondary: {
        default: { value: '{colors.slate.100}' },
        inverse: { value: '{colors.slate.800}' },
        hover: { value: '{colors.slate.200}' },
        active: { value: '{colors.slate.300}' },
        disabled: { value: '{colors.slate.200}' },
        disabledInverse: { value: '{colors.slate.300}' },
        outline: {
          default: { value: '{colors.slate.600}' },
          hover: { value: '{colors.slate.100}' },
        },
      },
      primaryBlue: {
        default: { value: '{colors.sky.500}' },
        inverse: { value: '{colors.white}' },
        hover: { value: '{colors.sky.600}' },
        active: { value: '{colors.sky.400}' },
        disabled: { value: '{colors.sky.200}' },
        disabledInverse: { value: '{colors.white}' },
        outline: {
          default: { value: '{colors.sky.300}' },
          hover: { value: '{colors.sky.500}' },
        },
      },
      inverse: {
        default: { value: '{colors.white}' },
        inverse: { value: '{colors.slate.950}' },
        hover: { value: '{colors.slate.50}' },
        active: { value: '{colors.slate.100}' },
        disabled: { value: '{colors.slate.300}' },
        disabledInverse: { value: '{colors.slate.600}' },
        outline: {
          default: { value: '{colors.white}' },
          hover: { value: '{colors.slate.50}' },
        },
      },
    },
  },
});

export const recipe = defineRecipe({
  className: 'ui-button',
  jsx: ['Button'],
  base: {
    display: 'inline-flex',
    cursor: 'pointer',
    _disabled: {
      cursor: 'not-allowed',
    },
    '--colors-button-link-default': '{colors.button.primary.link.default}',
    '--colors-button-link-hover': '{colors.button.primary.link.hover}',
    '--colors-button-link-active': '{colors.button.primary.link.active}',
    '--colors-button-link-disabled': '{colors.button.primary.link.disabled}',
  },
  variants: {
    theme: {
      primary: {
        '--colors-button-default': '{colors.button.primary.default}',
        '--colors-button-inverse': '{colors.button.primary.inverse}',
        '--colors-button-hover': '{colors.button.primary.hover}',
        '--colors-button-active': '{colors.button.primary.active}',
        '--colors-button-disabled': '{colors.button.primary.disabled}',
        '--colors-button-disabled-inverse': '{colors.button.primary.disabledInverse}',
        '--colors-button-outline-default': '{colors.button.primary.outline.default}',
        '--colors-button-outline-hover': '{colors.button.primary.outline.hover}',
      },
      secondary: {
        '--colors-button-default': '{colors.button.secondary.default}',
        '--colors-button-inverse': '{colors.button.secondary.inverse}',
        '--colors-button-hover': '{colors.button.secondary.hover}',
        '--colors-button-active': '{colors.button.secondary.active}',
        '--colors-button-disabled': '{colors.button.secondary.disabled}',
        '--colors-button-disabled-inverse': '{colors.button.secondary.disabledInverse}',
        '--colors-button-outline-default': '{colors.button.secondary.outline.default}',
        '--colors-button-outline-hover': '{colors.button.secondary.outline.hover}',
      },
      primaryBlue: {
        '--colors-button-default': '{colors.button.primaryBlue.default}',
        '--colors-button-inverse': '{colors.button.primaryBlue.inverse}',
        '--colors-button-hover': '{colors.button.primaryBlue.hover}',
        '--colors-button-active': '{colors.button.primaryBlue.active}',
        '--colors-button-disabled': '{colors.button.primaryBlue.disabled}',
        '--colors-button-disabled-inverse': '{colors.button.primaryBlue.disabledInverse}',
        '--colors-button-outline-default': '{colors.button.primaryBlue.outline.default}',
        '--colors-button-outline-hover': '{colors.button.primaryBlue.outline.hover}',
      },
      inverse: {
        '--colors-button-default': '{colors.button.inverse.default}',
        '--colors-button-inverse': '{colors.button.inverse.inverse}',
        '--colors-button-hover': '{colors.button.inverse.hover}',
        '--colors-button-active': '{colors.button.inverse.active}',
        '--colors-button-disabled': '{colors.button.inverse.disabled}',
        '--colors-button-disabled-inverse': '{colors.button.inverse.disabledInverse}',
        '--colors-button-outline-default': '{colors.button.inverse.outline.default}',
        '--colors-button-outline-hover': '{colors.button.inverse.outline.hover}',
      },
    },
    variant: {
      filled: {
        transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
        fontWeight: '{fontWeights.bold}',
        minWidth: '5.375rem',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        backgroundColor: 'var(--colors-button-default)',
        color: 'var(--colors-button-inverse)',
        '&:hover:not(:disabled)': {
          backgroundColor: 'var(--colors-button-hover)',
        },
        '&:active&:not(:disabled)': {
          backgroundColor: 'var(--colors-button-active)',
        },
        '&:disabled': {
          color: 'var(--colors-button-disabled-inverse)',
          backgroundColor: 'var(--colors-button-disabled)',
        },
      },
      outlined: {
        transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
        fontWeight: '{fontWeights.bold}',
        minWidth: '5.375rem',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: '0.0625rem',
        borderStyle: 'solid',
        borderColor: 'var(--colors-button-outline-default)',
        backgroundColor: 'transparent',
        color: 'var(--colors-button-outline-default)',
        '&:hover&:not(:disabled)': {
          backgroundColor: 'var(--colors-button-outline-hover)',
          borderColor: 'var(--colors-button-outline-hover)',
          color: 'var(--colors-button-inverse)',
        },
        '&:active&:not(:disabled)': {
          borderColor: 'var(--colors-button-active)',
          color: 'var(--colors-button-active)',
        },
        '&:disabled': {
          backgroundColor: 'transparent',
          borderColor: 'var(--colors-button-disabled)',
          color: 'var(--colors-button-disabled)',
        },
      },
      text: {
        transition: 'color 0.2s',
        fontWeight: '{fontWeights.regular}',
        border: 'none',
        backgroundColor: 'transparent',
        color: 'var(--colors-button-default)',
        '&:hover&:not(:disabled)': {
          color: 'var(--colors-button-hover)',
        },
        '&:active&:not(:disabled)': {
          color: 'var(--colors-button-active)',
        },
        '&:disabled': {
          color: 'var(--colors-button-disabled)',
        },
      },
      link: {
        transition: 'color 0.2s',
        fontWeight: '{fontWeights.regular}',
        textDecoration: 'underline',
        border: 'none',
        backgroundColor: 'transparent',
        color: 'var(--colors-button-link-default)',
        '&:hover&:not(:disabled)': {
          color: 'var(--colors-button-link-hover)',
        },
        '&:active&:not(:disabled)': {
          color: 'var(--colors-button-link-active)',
        },
        '&:disabled': {
          color: 'var(--colors-button-link-disabled)',
        },
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
        fontSize: 'sm',
        lineHeight: 'xs',
      },
    },
    {
      size: 'medium',
      space: 'text',
      css: {
        fontSize: 'md',
        lineHeight: 'sm',
      },
    },
    {
      size: 'large',
      space: 'text',
      css: {
        fontSize: 'lg',
        lineHeight: 'md',
      },
    },
    {
      size: 'small',
      space: 'icon',
      css: {
        padding: '{spacing.2}',
        fontSize: 'lg',
      },
    },
    {
      size: 'medium',
      space: 'icon',
      css: {
        padding: '{spacing.3}',
        fontSize: 'xl',
      },
    },
    {
      size: 'large',
      space: 'icon',
      css: {
        padding: '{spacing.4}',
        fontSize: '2xl',
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
