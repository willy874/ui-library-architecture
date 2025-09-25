import { button, type ButtonVariant } from '@/styled-system/recipes';
import { withVariants } from '@/utils/define-inject-context';
import { injectDataset } from '@/utils/injectDataset';
import CoreButton from './widgets/Button';
import type { ButtonProps as CoreButtonProps } from './widgets/Button';

export interface ButtonProps extends CoreButtonProps, Partial<ButtonVariant> {}

const Button = withVariants((props: ButtonProps) => {
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

export default Button;
