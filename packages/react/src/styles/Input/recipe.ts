import { defineRecipe } from '@pandacss/dev'

export const recipe = defineRecipe({
  className: 'ui-input',
  jsx: ['Input'],
  base: {
    color: '{colors.input.text}',
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: '{colors.input.default}',
    borderRadius: 'xl',
    py: '3',
    px: '4',
    fontSize: 'sm',
    fontWeight: 'normal',
    lineHeight: 'sm',
    _focus: {
      outline: 'none',
      borderColor: '{colors.input.focus}',
      boxShadow: 'none',
    },
    _placeholder: {
      color: '{colors.input.placeholder}',
    },
    _disabled: {
      color: '{colors.input.disabledText}',
      borderColor: '{colors.input.disabled}',
      backgroundColor: '{colors.input.disabledFill}',
      cursor: 'not-allowed',
      _placeholder: {
        color: '{colors.input.disabledPlaceholder}',
      },
    },
  },
})
