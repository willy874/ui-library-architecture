import type { SystemStyleObject } from '@pandacss/dev';

export const filled: SystemStyleObject = {
  '--colors-button-bg': '{colors.button.warning.default}',
  '--colors-button-border': '{colors.transparent}',
  '--colors-button-text': '{colors.button.warning.inverse}',
  '--colors-button-bg-hover':
    'color-mix(in oklch, {colors.button.warning.default} 85%, transparent)',
  '--colors-button-border-hover': '{colors.transparent}',
  '--colors-button-text-hover': '{colors.button.warning.inverse}',
  '--colors-button-bg-disabled':
    'color-mix(in oklch, {colors.button.warning.default} 70%, transparent)',
  '--colors-button-border-disabled': '{colors.transparent}',
  '--colors-button-text-disabled': '{colors.button.warning.inverse}',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.warning.default} 20%, transparent)',
};

export const outlined: SystemStyleObject = {
  '--colors-button-bg': '{colors.transparent}',
  '--colors-button-border': '{colors.button.warning.default}',
  '--colors-button-text': '{colors.button.warning.default}',
  '--colors-button-bg-hover':
    'color-mix(in oklch, {colors.button.warning.default} 85%, transparent)',
  '--colors-button-border-hover': '{colors.transparent}',
  '--colors-button-text-hover': '{colors.button.warning.inverse}',
  '--colors-button-bg-disabled':
    'color-mix(in oklch, {colors.button.warning.default} 10%, transparent)',
  '--colors-button-border-disabled':
    'color-mix(in oklch, {colors.button.warning.default} 70%, transparent)',
  '--colors-button-text-disabled':
    'color-mix(in oklch, {colors.button.warning.default} 70%, transparent)',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.warning.default} 20%, transparent)',
};
