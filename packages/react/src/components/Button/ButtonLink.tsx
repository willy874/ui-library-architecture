import { forwardRef } from 'react';
import { mergeProps } from '@zag-js/react';
import { button } from '@/styled-system/recipes';
import type { ButtonVariantProps } from '@/styled-system/recipes';
import CoreButton from './components/Button';
import type { ButtonProps as CoreButtonProps } from './components/Button';

type ButtonRecipeVariants = ButtonVariantProps;

export interface ButtonLinkProps extends CoreButtonProps, ButtonRecipeVariants {}

const ButtonLink = forwardRef<HTMLButtonElement, ButtonLinkProps>(function (
  { theme, variant, size, shape, space, ...props }: ButtonLinkProps,
  ref,
) {
  return (
    <CoreButton
      {...mergeProps<ButtonLinkProps>(props, {
        className: button({ theme, variant, size, shape, space }),
      })}
      ref={ref}
    />
  );
});

export default ButtonLink;
