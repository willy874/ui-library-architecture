import { button } from '@/styled-system/recipes';
import type { ButtonVariantProps } from '@/styled-system/recipes';

export function useVariants(props: ButtonVariantProps) {
  const [variantProps] = button.splitVariantProps(props);
  const variants = button.getVariantProps(variantProps);
  const attrs = (() => {
    const result: Record<string, string> = {};
    for (const key in variants) {
      result[`data-${key}`] = Reflect.get(variants, key) as string;
    }
    return result;
  })();
  return {
    ...attrs,
    className: button(variantProps),
  };
}
