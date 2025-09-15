import { defineTokens } from "@pandacss/dev";

export const token = defineTokens({
  colors: {
    input: {
      default: { value: 'slate.300' },
      text: { value: 'slate.800' },
      placeholder: { value: 'slate.400' },
      focus: { value: 'sky.400' },
      invalid: { value: 'rose.400' },
      invalidFocus: { value: 'rose.500' },
      disabled: { value: 'slate.200' },
      disabledFill: { value: 'slate.100' },
      disabledText: { value: 'slate.400' },
      disabledPlaceholder: { value: 'slate.400' },
      info: { value: 'sky.500' },
      warning: { value: 'amber.500' },
      success: { value: 'green.500' },
    },
  },
})
