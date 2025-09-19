import type { SystemStyleObject } from '@pandacss/dev';

export const filled: SystemStyleObject = {
  '--colors-button-bg': '{colors.button.tertiary.default}',
  '--colors-button-border': '{colors.transparent}',
  '--colors-button-text': '{colors.button.tertiary.inverse}',
  '--colors-button-bg-hover': '{colors.transparent}',
  '--colors-button-border-hover': '{colors.transparent}',
  '--colors-button-text-hover': '{colors.button.tertiary.inverse}',
  '--colors-button-bg-disabled':
    'color-mix(in oklch, {colors.button.tertiary.default} 70%, transparent)',
  '--colors-button-border-disabled': '{colors.transparent}',
  '--colors-button-text-disabled': '{colors.button.tertiary.inverse}',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.tertiary.default} 20%, transparent)',
};

export const outlined: SystemStyleObject = {
  '--colors-button-bg': '{colors.transparent}',
  '--colors-button-border': '{colors.button.tertiary.default}',
  '--colors-button-text': '{colors.button.tertiary.default}',
  '--colors-button-bg-hover': '{colors.transparent}',
  '--colors-button-border-hover': '{colors.transparent}',
  '--colors-button-text-hover': '{colors.button.tertiary.inverse}',
  '--colors-button-bg-disabled':
    'color-mix(in oklch, {colors.button.tertiary.default} 10%, transparent)',
  '--colors-button-border-disabled':
    'color-mix(in oklch, {colors.button.tertiary.default} 70%, transparent)',
  '--colors-button-text-disabled':
    'color-mix(in oklch, {colors.button.tertiary.default} 70%, transparent)',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.tertiary.default} 20%, transparent)',
};
