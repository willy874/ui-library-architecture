import { definePreset, defineTokens, defineSemanticTokens } from '@pandacss/dev'
import atomicTokens from './styles/tokens/atomic.json'
import seedTokens from './styles/tokens/seed.json'
import { createInputPreset } from './styles/Input'
import { createFieldPreset } from './styles/Field'

const createTokenPreset = () => {
  return definePreset({
    name: 'tokens',
    theme: {
      extend: {
        tokens: defineTokens(atomicTokens),
        semanticTokens: defineSemanticTokens(seedTokens),
      },
    },
  })
}

function createComponentPreset() {
  return definePreset({
    name: 'components',
    presets: [
      createTokenPreset(),
      createInputPreset(),
      createFieldPreset()
    ],
  })
}

export function createUIPreset() {
  return definePreset({
    name: 'ui-preset',
    presets: [createComponentPreset()],
  })
}
