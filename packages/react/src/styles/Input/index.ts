import { definePreset } from '@pandacss/dev'
import { token } from './token'
import { recipe } from './recipe'

export const createInputPreset = () => {
  return definePreset({
    name: 'input',
    theme: {
      extend: {
        recipes: {
          input: recipe,
        },
        semanticTokens: token,
      },
    },
  })
}
