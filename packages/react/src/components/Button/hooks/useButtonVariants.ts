import { button } from '@/styled-system/recipes';
import type { StyleAttributes } from '@/utils/types';

export function getButtonVariants<Props extends Record<string, unknown>>(props: Props) {
  return button.getVariantProps(button.splitVariantProps(props)[0]);
}

export function useButtonVariants<Props extends Record<string, unknown>>(props: Props) {
  const variants = getButtonVariants(props);
  const attrs: StyleAttributes = {
    className: button(variants),
  };
  for (const key in variants) {
    attrs[`data-${key}`] = (Reflect.get(variants, key) || '') as string;
  }
  return attrs;
}
