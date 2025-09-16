import { definePreset, defineSemanticTokens, defineSlotRecipe } from '@pandacss/dev';
import { fieldAnatomy } from '@ui-library-architecture/anatomy';

export const token = defineSemanticTokens({
  colors: {
    field: {
      valid: {
        default: { value: '{colors.success}' },
        hover: { value: 'color-mix(in oklch, {colors.success} 85%, transparent)' },
        shadow: { value: 'color-mix(in oklab, {colors.success} 20%, transparent)' },
      },
      invalid: {
        default: { value: '{colors.danger}' },
        hover: { value: 'color-mix(in oklch, {colors.danger} 85%, transparent)' },
        shadow: { value: 'color-mix(in oklab, {colors.danger} 20%, transparent)' },
      },
      disabled: {
        valid: { value: 'color-mix(in oklch, {colors.success} 40%, transparent)' },
        invalid: { value: 'color-mix(in oklch, {colors.danger} 40%, transparent)' },
      },
    },
  },
});

export const slotRecipe = defineSlotRecipe({
  className: 'ui-field',
  slots: fieldAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      color: '{colors.input.normal.text}',
      '& svg': {
        fontSize: '{lineHeights.md}',
      },
    },
    label: {
      mb: '{spacing.3}',
      fontSize: '{fontSizes.md}',
    },
    prefix: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '{spacing.2}',
      flexShrink: 0,
    },
    suffix: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '{spacing.2}',
      flexShrink: 0,
    },
    helper: {
      display: 'flex',
      fontSize: '{fontSizes.sm}',
      padding: '{spacing.1}',
    },
    errorText: {
      color: '{colors.field.invalid.default}',
    },
    passwordControl: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '{spacing.2}',
      my: '-2px',
      flexShrink: 0,
      cursor: 'pointer',
      color: '{colors.input.normal.text}',
      _hover: {
        color: '{colors.input.normal.hover}',
      },
    },
    wrapper: {
      display: 'flex',
    },
    input: {
      flexGrow: 1,
      _focus: {
        outline: 'none',
      },
    },
    select: {
      flexGrow: 1,
      _focus: {
        outline: 'none',
      },
    },
    textarea: {
      flexGrow: 1,
      _focus: {
        outline: 'none',
      },
    },
  },
  variants: {
    variant: {
      outlined: {
        wrapper: {
          backgroundColor: '{colors.input.normal.bg}',
          borderColor: '{colors.input.normal.border}',
          borderRadius: '{radii.md}',
          _focusWithin: {
            outline: 'none',
            '&:not([data-invalid]):not([data-valid])': {
              borderColor: '{colors.input.selected.default}',
              boxShadow: '0 0 0 3px {colors.input.selected.shadow}',
            },
          },
          borderWidth: '{borderWidths.1}',
          borderStyle: 'solid',
          py: '{spacing.3}',
          px: '{spacing.4}',
          '&[data-valid]': {
            borderColor: '{colors.field.valid.default}',
            _focusWithin: {
              boxShadow: '0 0 0 3px {colors.field.valid.shadow}',
            },
          },
          '&[data-invalid]': {
            borderColor: '{colors.field.invalid.default}',
            _focusWithin: {
              boxShadow: '0 0 0 3px {colors.field.invalid.shadow}',
            },
          },
          _disabled: {
            color: '{colors.input.disabled.text}',
            borderColor: '{colors.input.disabled.border}',
            backgroundColor: '{colors.input.disabled.bg}',
            cursor: 'not-allowed',
            '&[data-valid]': {
              borderColor: '{colors.field.disabled.valid}',
            },
            '&[data-invalid]': {
              borderColor: '{colors.field.disabled.invalid}',
            },
          },
        },
        input: {
          color: 'inherit',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          padding: '0',
          _disabled: {
            borderColor: 'none',
            backgroundColor: 'transparent',
          },
        },
        textarea: {
          color: 'inherit',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          padding: '0',
          _disabled: {
            borderColor: 'none',
            backgroundColor: 'transparent',
          },
        },
        select: {
          color: 'inherit',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          padding: '0',
          _disabled: {
            borderColor: 'none',
            backgroundColor: 'transparent',
          },
        },
      },
      none: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          color: '{colors.input.normal.text}',
        },
        input: {
          color: 'inherit',
        },
        textarea: {
          color: 'inherit',
        },
        select: {
          color: 'inherit',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'outlined',
  },
});

export function createFieldPreset() {
  return definePreset({
    name: 'ui-Field',
    theme: {
      extend: {
        slotRecipes: {
          field: slotRecipe,
        },
        semanticTokens: token,
      },
    },
  });
}
