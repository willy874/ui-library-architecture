import { definePreset, defineTokens, defineSemanticTokens } from '@pandacss/dev';
import type { Preset } from '@pandacss/dev';
import { atomicTokens } from './theme/atomic';
import { colorTokens } from './theme/colors';
import { seedTokens } from './theme/seed';
import { createInputPreset } from './components/Input';
import { createFieldPreset } from './components/Field';
import { createButtonPreset } from './components/Button';
import { createDialogPreset } from './components/Dialog';
import { createGlobalVars } from '../utils/globalVars';

const createTokenPreset = () => {
  return definePreset({
    name: 'tokens',
    globalVars: createGlobalVars(),
    theme: {
      extend: {
        tokens: defineTokens({ ...atomicTokens, ...colorTokens }),
        semanticTokens: defineSemanticTokens(seedTokens),
      },
    },
  });
};

export function createUIPreset(): Preset {
  return definePreset({
    name: 'ui-preset',
    presets: [
      createTokenPreset(),
      createInputPreset(),
      createFieldPreset(),
      createButtonPreset(),
      createDialogPreset(),
    ],
    staticCss: {
      recipes: '*',
    },
  });
}
