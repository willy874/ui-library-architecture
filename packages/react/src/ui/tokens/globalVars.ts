import type { Config } from '@pandacss/dev';

export const dynamicCss = {
  shadow:
    'var(--shadows-inset),var(--shadows-inset-ring),var(--shadows-ring-offset),var(--shadows-ring),var(--shadows)',
  transform:
    'var(--transforms-rotate-x) var(--transforms-rotate-y) var(--transforms-rotate-z) var(--transforms-skew-x) var(--transforms-skew-y) var(--transforms-translate-x) var(--transforms-translate-y) var(--transforms-translate-z)  var(--transforms-scale-x) var(--transforms-scale-y) var(--transforms-scale-z)',
  filter:
    'var(--filters-blur) var(--filters-brightness) var(--filters-contrast) var(--filters-grayscale) var(--filters-hue-rotate) var(--filters-invert) var(--filters-saturate) var(--filters-sepia) var(--filters-drop-shadow)',
};

export const createGlobalVars = (): Config['globalVars'] => {
  const DEFAULT_VALUES = {
    syntax: '*',
    inherits: false,
    initialValue: '',
  } as const;
  const shadows = {
    '--shadows-inset': {
      ...DEFAULT_VALUES,
      initialValue: '0 0 #0000',
    },
    '--shadows-inset-ring': {
      ...DEFAULT_VALUES,
      initialValue: '0 0 #0000',
    },
    '--shadows-ring-offset': {
      ...DEFAULT_VALUES,
      initialValue: '0 0 #0000',
    },
    '--shadows-ring': {
      ...DEFAULT_VALUES,
      initialValue: '0 0 #0000',
    },
    '--shadows': {
      ...DEFAULT_VALUES,
      initialValue: '0 0 #0000',
    },
  };
  const transforms = {
    '--transforms-rotate-x': {
      ...DEFAULT_VALUES,
      initialValue: 'rotateX(0)',
    },
    '--transforms-rotate-y': {
      ...DEFAULT_VALUES,
      initialValue: 'rotateY(0)',
    },
    '--transforms-rotate-z': {
      ...DEFAULT_VALUES,
      initialValue: 'rotateZ(0)',
    },
    '--transforms-skew-x': {
      ...DEFAULT_VALUES,
      initialValue: 'skewX(0)',
    },
    '--transforms-skew-y': {
      ...DEFAULT_VALUES,
      initialValue: 'skewY(0)',
    },
    '--transforms-translate-x': {
      ...DEFAULT_VALUES,
      initialValue: 'translateX(0)',
    },
    '--transforms-translate-y': {
      ...DEFAULT_VALUES,
      initialValue: 'translateY(0)',
    },
    '--transforms-translate-z': {
      ...DEFAULT_VALUES,
      initialValue: 'translateZ(0)',
    },
    '--transforms-scale-x': {
      ...DEFAULT_VALUES,
      initialValue: 'scaleX(1)',
    },
    '--transforms-scale-y': {
      ...DEFAULT_VALUES,
      initialValue: 'scaleY(1)',
    },
    '--transforms-scale-z': {
      ...DEFAULT_VALUES,
      initialValue: 'scaleZ(1)',
    },
  };
  const filters = {
    '--filters-blur': {
      ...DEFAULT_VALUES,
      initialValue: 'blur(0)',
    },
    '--filters-brightness': {
      ...DEFAULT_VALUES,
      initialValue: 'brightness(1)',
    },
    '--filters-contrast': {
      ...DEFAULT_VALUES,
      initialValue: 'contrast(1)',
    },
    '--filters-grayscale': {
      ...DEFAULT_VALUES,
      initialValue: 'grayscale(0)',
    },
    '--filters-hue-rotate': {
      ...DEFAULT_VALUES,
      initialValue: 'hue-rotate(0deg)',
    },
    '--filters-invert': {
      ...DEFAULT_VALUES,
      initialValue: 'invert(0)',
    },
    '--filters-saturate': {
      ...DEFAULT_VALUES,
      initialValue: 'saturate(1)',
    },
    '--filters-sepia': {
      ...DEFAULT_VALUES,
      initialValue: 'sepia(0)',
    },
    '--filters-drop-shadow': {
      ...DEFAULT_VALUES,
      initialValue: 'drop-shadow(0 0 0 #0000)',
    },
  };
  return {
    ...shadows,
    ...transforms,
    ...filters,
  };
};
