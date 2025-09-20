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

export const text: SystemStyleObject = {
  '--colors-button-text': '{colors.button.tertiary.default}',
  '--colors-button-text-hover': 'color-mix(in oklch, {colors.button.tertiary.default} 70%, #000)',
  '--colors-button-text-active': 'color-mix(in oklch, {colors.button.tertiary.default} 70%,  #fff)',
  '--colors-button-text-disabled':
    'color-mix(in oklch, {colors.button.tertiary.default} 60%, transparent)',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.tertiary.default} 30%, transparent)',
  '--colors-button-link': '{colors.button.info.default}',
  '--colors-button-link-visited': 'color-mix(in oklch, {colors.button.info.default} 70%,  #f00)',
  '--colors-button-link-active': 'color-mix(in oklch, {colors.button.info.default} 70%,  #fff)',
  '--colors-button-link-disabled':
    'color-mix(in oklch, {colors.button.info.default} 60%, transparent)',
  '--colors-button-link-outline-focus':
    'color-mix(in oklch, {colors.button.info.default} 30%, transparent)',
};

export const link: SystemStyleObject = {
  '--colors-button-text': '{colors.button.info.default}',
  '--colors-button-text-hover': 'color-mix(in oklch, {colors.button.info.default} 70%, #000)',
  '--colors-button-text-active': 'color-mix(in oklch, {colors.button.info.default} 70%,  #fff)',
  '--colors-button-text-disabled':
    'color-mix(in oklch, {colors.button.info.default} 60%, transparent)',
  '--colors-button-outline-focus':
    'color-mix(in oklch, {colors.button.info.default} 30%, transparent)',
  '--colors-button-link': '{colors.button.info.default}',
  '--colors-button-link-visited': 'color-mix(in oklch, {colors.button.info.default} 70%,  #f00)',
  '--colors-button-link-active': 'color-mix(in oklch, {colors.button.info.default} 70%,  #fff)',
  '--colors-button-link-disabled':
    'color-mix(in oklch, {colors.button.info.default} 60%, transparent)',
  '--colors-button-link-outline-focus':
    'color-mix(in oklch, {colors.button.info.default} 30%, transparent)',
};

export const theme: SystemStyleObject = {
  '&[data-variant="filled"]': filled,
  '&[data-variant="outlined"]': outlined,
  '&[data-variant="text"]': text,
  '&[data-variant="link"]': link,
};
