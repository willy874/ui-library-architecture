import { definePreset, defineTokens, defineSemanticTokens } from '@pandacss/dev';
import atomicTokens from './ui/tokens/atomic.json';
import colorsTokens from './ui/tokens/colors.json';
import seedTokens from './ui/tokens/seed.json';
import { createInputPreset } from './ui/Input';
import { createFieldPreset } from './ui/Field';
import { createButtonPreset } from './ui/Button';
import { createGlobalVars } from './ui/tokens/globalVars';

const createTokenPreset = () => {
  return definePreset({
    name: 'tokens',
    globalVars: createGlobalVars(),
    theme: {
      extend: {
        tokens: defineTokens({ ...atomicTokens, ...colorsTokens }),
        semanticTokens: defineSemanticTokens(seedTokens),
      },
    },
  });
};

export function createUIPreset() {
  return definePreset({
    name: 'ui-preset',
    presets: [createTokenPreset(), createInputPreset(), createFieldPreset(), createButtonPreset()],
  });
}
