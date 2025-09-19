import type { SystemStyleObject } from '@pandacss/dev';

export const filled: SystemStyleObject = {
  '--colors-button-bg': '{colors.button.success.default}',
  '--colors-button-border': '{colors.transparent}',
  '--colors-button-text': '{colors.button.success.inverse}',
  '--colors-button-bg-hover':
    'color-mix(in oklch, {colors.button.success.default} 85%, transparent)',
  '--colors-button-border-hover': '{colors.transparent}',
  '--colors-button-text-hover': '{colors.button.success.inverse}',
  '--colors-button-bg-disabled': 'color-mix(in oklch, {colors.button.success.default} 70%, #fff)',
  '--colors-button-border-disabled': '{colors.transparent}',
  '--colors-button-text-disabled': '{colors.button.success.inverse}',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.success.default} 20%, transparent)',
};

export const outlined: SystemStyleObject = {
  '--colors-button-bg': '{colors.transparent}',
  '--colors-button-border': '{colors.button.success.default}',
  '--colors-button-text': '{colors.button.success.default}',
  '--colors-button-bg-hover':
    'color-mix(in oklch, {colors.button.success.default} 85%, transparent)',
  '--colors-button-border-hover': '{colors.transparent}',
  '--colors-button-text-hover': '{colors.button.success.inverse}',
  '--colors-button-bg-disabled':
    'color-mix(in oklch, {colors.button.success.default} 10%, transparent)',
  '--colors-button-border-disabled':
    'color-mix(in oklch, {colors.button.success.default} 70%, transparent)',
  '--colors-button-text-disabled':
    'color-mix(in oklch, {colors.button.success.default} 70%, transparent)',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.success.default} 20%, transparent)',
};
