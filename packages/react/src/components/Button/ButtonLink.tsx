import { withVariants } from '@/utils/define-inject-context';
import { injectDataset } from '@/utils/injectDataset';
import { button, type ButtonVariant } from '@/styled-system/recipes';
import CoreButtonLink from './widgets/ButtonLink';
import type { ButtonLinkProps as CoreButtonLinkProps } from './widgets/ButtonLink';

export interface ButtonLinkProps extends CoreButtonLinkProps, Partial<ButtonVariant> {}

const ButtonLink = withVariants((props: ButtonLinkProps) => {
  const variants = button.getVariantProps(button.splitVariantProps(props)[0]) as ButtonVariant;
  const slotStyles = button(variants);
  const dataset = injectDataset({
    variant: variants.variant,
    theme: variants.theme,
    size: variants.size,
    shape: variants.shape,
  });
  return { className: slotStyles, ...dataset };
}, CoreButtonLink);

export default ButtonLink;
