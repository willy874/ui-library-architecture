import * as primary from './theme-primary';
import * as secondary from './theme-secondary';
import * as tertiary from './theme-tertiary';
import * as neutral from './theme-neutral';
import * as info from './theme-info';
import * as success from './theme-success';
import * as warning from './theme-warning';
import * as danger from './theme-danger';

export const compoundVariants = [
  {
    theme: 'primary',
    variant: 'filled',
    css: primary.filled,
  },
  {
    theme: 'secondary',
    variant: 'filled',
    css: secondary.filled,
  },
  {
    theme: 'tertiary',
    variant: 'filled',
    css: tertiary.filled,
  },
  {
    theme: 'neutral',
    variant: 'filled',
    css: neutral.filled,
  },
  {
    theme: 'info',
    variant: 'filled',
    css: info.filled,
  },
  {
    theme: 'success',
    variant: 'filled',
    css: success.filled,
  },
  {
    theme: 'warning',
    variant: 'filled',
    css: warning.filled,
  },
  {
    theme: 'danger',
    variant: 'filled',
    css: danger.filled,
  },
  {
    theme: 'primary',
    variant: 'outlined',
    css: primary.outlined,
  },
  {
    theme: 'secondary',
    variant: 'outlined',
    css: secondary.outlined,
  },
  {
    theme: 'tertiary',
    variant: 'outlined',
    css: tertiary.outlined,
  },
  {
    theme: 'neutral',
    variant: 'outlined',
    css: neutral.outlined,
  },
  {
    theme: 'info',
    variant: 'outlined',
    css: info.outlined,
  },
  {
    theme: 'success',
    variant: 'outlined',
    css: success.outlined,
  },
  {
    theme: 'warning',
    variant: 'outlined',
    css: warning.outlined,
  },
  {
    theme: 'danger',
    variant: 'outlined',
    css: danger.outlined,
  },
] as const;
