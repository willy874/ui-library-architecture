import { button, type ButtonVariant } from '@/styled-system/recipes';
import { withVariants } from '@/utils/withVariants';
import { injectDataset } from '@/utils/injectDataset';
import { Button as CoreButton } from '@/components';
import type { ButtonProps as CoreButtonProps } from '@/components';

export interface ButtonProps extends CoreButtonProps, Partial<ButtonVariant> {}

export const Button = withVariants((props: ButtonProps) => {
  const variants = button.getVariantProps(button.splitVariantProps(props)[0]) as ButtonVariant;
  const slotStyles = button(variants);
  const dataset = injectDataset({
    variant: variants.variant,
    theme: variants.theme,
    size: variants.size,
    shape: variants.shape,
  });
  return { className: slotStyles, ...dataset };
}, CoreButton);
