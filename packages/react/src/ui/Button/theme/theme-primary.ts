import type { SystemStyleObject } from '@pandacss/dev';

export const filled: SystemStyleObject = {
  '--colors-button-bg': '{colors.button.primary.default}',
  '--colors-button-border': '{colors.transparent}',
  '--colors-button-text': '{colors.button.primary.inverse}',
  '--colors-button-bg-hover':
    'color-mix(in oklch, {colors.button.primary.default} 85%, transparent)',
  '--colors-button-border-hover': '{colors.transparent}',
  '--colors-button-text-hover': '{colors.button.primary.inverse}',
  '--colors-button-bg-disabled':
    'color-mix(in oklch, {colors.button.primary.default} 70%, transparent)',
  '--colors-button-border-disabled': '{colors.transparent}',
  '--colors-button-text-disabled': '{colors.button.primary.inverse}',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.primary.default} 20%, transparent)',
};

export const outlined: SystemStyleObject = {
  '--colors-button-bg': '{colors.transparent}',
  '--colors-button-border': '{colors.button.primary.default}',
  '--colors-button-text': '{colors.button.primary.default}',
  '--colors-button-bg-hover':
    'color-mix(in oklch, {colors.button.primary.default} 85%, transparent)',
  '--colors-button-border-hover': '{colors.transparent}',
  '--colors-button-text-hover': '{colors.button.primary.inverse}',
  '--colors-button-bg-disabled':
    'color-mix(in oklch, {colors.button.primary.default} 10%, transparent)',
  '--colors-button-border-disabled':
    'color-mix(in oklch, {colors.button.primary.default} 70%, transparent)',
  '--colors-button-text-disabled':
    'color-mix(in oklch, {colors.button.primary.default} 70%, transparent)',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.primary.default} 20%, transparent)',
};

export const text: SystemStyleObject = {
  '--colors-button-text': '{colors.button.primary.default}',
  '--colors-button-text-hover': 'color-mix(in oklch, {colors.button.primary.default} 30%, #000)',
  '--colors-button-text-active': 'color-mix(in oklch, {colors.button.primary.default} 60%,  #000)',
  '--colors-button-text-visited': 'color-mix(in oklch, {colors.button.primary.default} 60%,  #000)',
  '--colors-button-text-disabled':
    'color-mix(in oklch, {colors.button.primary.default} 60%, transparent)',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.primary.default} 30%, transparent)',
};
