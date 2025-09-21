import { useVariants } from '@/utils/hooks/useVariants';
import { button, type ButtonVariantProps } from '@/styled-system/recipes';

export function useButtonVariants<Props extends Record<string, unknown>>(
  props: Props,
): ReturnType<typeof useVariants> {
  return useVariants<ButtonVariantProps>(props, button);
}
