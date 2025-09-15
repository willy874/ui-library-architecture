import { Args, Meta } from '@storybook/react-vite'

export function defineArgs<T extends Args>(argTypesDict: Record<string, NonNullable<Meta<T>>['argTypes']>): NonNullable<Meta<T>>['argTypes'] {
  const allArgTypes: NonNullable<Meta<T>>['argTypes'] = {}
  Object.entries(argTypesDict).forEach(([name, argTypes]) => {
    if (argTypes) {
      Object.entries(argTypes).forEach(([key, inputType]) => {
        if (inputType) {
          Reflect.set(allArgTypes, `${name}:${key}`, inputType)
        }
      })
    }
  })
  return allArgTypes
}
