import { defineTokens } from "@pandacss/dev";

export const token = defineTokens({
  colors: {
    input: {
      default: { value: '{colors.slate.300}' },
      text: { value: '{colors.slate.800}' },
      placeholder: { value: '{colors.slate.400}' },
      focus: { value: '{colors.sky.400}' },
      invalid: { value: '{colors.rose.400}' },
      invalidFocus: { value: '{colors.rose.500}' },
      disabled: { value: '{colors.slate.200}' },
      disabledFill: { value: '{colors.slate.100}' },
      disabledText: { value: '{colors.slate.400}' },
      disabledPlaceholder: { value: '{colors.slate.400}' },
      info: { value: '{colors.sky.500}' },
      warning: { value: '{colors.amber.500}' },
      success: { value: '{colors.green.500}' },
    },
  },
})
