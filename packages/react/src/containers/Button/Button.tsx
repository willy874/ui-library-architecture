import { button, type ButtonVariant } from '@/styled-system/recipes';
import { withVariants } from '@/utils/define-inject-context';
import { injectDataset } from '@/utils/injectDataset';
import CoreButton from '@/components/Button/Button';
import type {
  ButtonHTMLAttributes,
  ButtonProps as CoreButtonProps,
} from '@/components/Button/Button';

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

type ButtonComponent = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> &
    React.RefAttributes<HTMLButtonElement>
> & {
  Block: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ButtonProps & ButtonHTMLAttributes<HTMLElement>> &
      React.RefAttributes<HTMLElement>
  >;
  Link: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<ButtonProps & ButtonHTMLAttributes<HTMLAnchorElement>> &
      React.RefAttributes<HTMLAnchorElement>
  >;
};

const _Button = Button as ButtonComponent;
_Button.Block = Button;
_Button.Link = Button;

export default Button;
