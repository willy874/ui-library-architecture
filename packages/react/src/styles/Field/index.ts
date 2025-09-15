import { defineSlotRecipe, definePreset } from '@pandacss/dev'
import { fieldAnatomy } from '@ui-library-architecture/anatomy'

const recipe = defineSlotRecipe({
  className: 'ui-field',
  slots: fieldAnatomy.keys(),
  base: {
    root: {
      'display': 'flex',
      'flexDirection': 'column',
      'color': '{colors.input.text}',
      '& svg': {
        fontSize: '{lineHeights.md}',
      },
    },
    label: {
      mb: '{spacing.3}',
      fontSize: '{fontSizes.md}'
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
      color: '{slate.500}',
    },
    errorText: {
      color: '{colors.input.invalid}',
    },
    passwordControl: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '2',
      my: '-2px',
      flexShrink: 0,
      cursor: 'pointer',
      color: 'slate.500',
      _hover: {
        color: 'slate.700',
      },
    },
    wrapper: {
      borderWidth: '0',
      borderStyle: 'solid',
      display: 'flex',
      backgroundColor: 'white',
      borderColor: 'slate.300',
      borderRadius: '{radii.xl}',
      minHeight: '{spacing.12}',
      _focusWithin: {
        outline: 'none',
        borderColor: 'sky.400',
        boxShadow: 'none',
      },
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
          'borderWidth': '1px',
          'py': '{spacing.3}',
          'px': '{spacing.4}',
          '&[data-invalid]': {
            borderColor: '{colors.input.invalid}',
            _focusWithin: {
              borderColor: '{colors.input.invalidFocus}',
            },
          },
          '&[data-disabled]': {
            color: '{colors.input.disabledText}',
            borderColor: '{colors.input.disabled}',
            backgroundColor: '{colors.input.disabledFill}',
            cursor: 'not-allowed',
          },
        },
        input: {
          border: 'none',
          backgroundColor: 'transparent',
          padding: '0',
          _disabled: {
            borderColor: 'none',
            backgroundColor: 'transparent',
            _placeholder: {
              color: '{colors.input.disabledPlaceholder}',
            },
          },
        },
        textarea: {
          border: 'none',
          backgroundColor: 'transparent',
          padding: '0',
          _disabled: {
            borderColor: 'none',
            backgroundColor: 'transparent',
            _placeholder: {
              color: '{colors.input.disabledPlaceholder}',
            },
          },
        },
        select: {
          border: 'none',
          backgroundColor: 'transparent',
          padding: '0',
          _disabled: {
            borderColor: 'none',
            backgroundColor: 'transparent',
            _placeholder: {
              color: '{colors.input.disabledPlaceholder}',
            },
          },
        },
      },
      none: {},
    },
  },
  defaultVariants: {
    variant: 'outlined',
  },
})

export const createFieldPreset = () => {
  return definePreset({
    name: 'field',
    theme: {
      extend: {
        recipes: {
          field: recipe,
        },
      },
    },
  })
}