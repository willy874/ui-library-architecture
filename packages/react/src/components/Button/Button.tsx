import { forwardRef } from 'react';
import { mergeProps } from '@zag-js/react';
import { button } from '@/styled-system/recipes';
import type { ButtonVariantProps } from '@/styled-system/recipes';
import CoreButton from './components/Button';
import type { ButtonProps as CoreButtonProps } from './components/Button';

type ButtonRecipeVariants = ButtonVariantProps;

export interface ButtonProps extends CoreButtonProps, ButtonRecipeVariants {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (
  { theme, variant, size, shape, space, ...props }: ButtonProps,
  ref,
) {
  return (
    <CoreButton
      {...mergeProps<ButtonProps>(props, {
        className: button({ theme, variant, size, shape, space }),
      })}
      ref={ref}
    />
  );
});

export default Button;
