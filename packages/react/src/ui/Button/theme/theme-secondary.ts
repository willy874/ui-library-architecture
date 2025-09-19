import type { SystemStyleObject } from '@pandacss/dev';

export const filled: SystemStyleObject = {
  '--colors-button-bg': '{colors.button.secondary.default}',
  '--colors-button-border': '{colors.transparent}',
  '--colors-button-text': '{colors.button.secondary.inverse}',
  '--colors-button-bg-hover':
    'color-mix(in oklch, {colors.button.secondary.default} 85%, transparent)',
  '--colors-button-border-hover': '{colors.transparent}',
  '--colors-button-text-hover': '{colors.button.secondary.inverse}',
  '--colors-button-bg-disabled':
    'color-mix(in oklch, {colors.button.secondary.default} 70%, transparent)',
  '--colors-button-border-disabled': '{colors.transparent}',
  '--colors-button-text-disabled': '{colors.button.secondary.inverse}',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.secondary.default} 20%, transparent)',
};

export const outlined: SystemStyleObject = {
  '--colors-button-bg': '{colors.transparent}',
  '--colors-button-border': '{colors.button.secondary.default}',
  '--colors-button-text': '{colors.button.secondary.default}',
  '--colors-button-bg-hover':
    'color-mix(in oklch, {colors.button.secondary.default} 85%, transparent)',
  '--colors-button-border-hover': '{colors.transparent}',
  '--colors-button-text-hover': '{colors.button.secondary.inverse}',
  '--colors-button-bg-disabled':
    'color-mix(in oklch, {colors.button.secondary.default} 10%, transparent)',
  '--colors-button-border-disabled':
    'color-mix(in oklch, {colors.button.secondary.default} 70%, transparent)',
  '--colors-button-text-disabled':
    'color-mix(in oklch, {colors.button.secondary.default} 70%, transparent)',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.secondary.default} 20%, transparent)',
};
