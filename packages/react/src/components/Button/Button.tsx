import { forwardRef } from 'react';
import { mergeProps } from '@zag-js/react';
import { button } from '@/styled-system/recipes';
import type { ButtonVariantProps } from '@/styled-system/recipes';
import CoreButton from './components/Button';
import type { ButtonProps as CoreButtonProps } from './components/Button';

type ButtonRecipeVariants = ButtonVariantProps;

export interface ButtonProps extends CoreButtonProps, ButtonRecipeVariants {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (props, ref) {
  const [variantProps] = button.splitVariantProps(props);
  const variants = button.getVariantProps(variantProps);
  const attrs = (() => {
    const result: Record<string, string> = {};
    for (const key in variants) {
      result[`data-${key}`] = Reflect.get(variants, key) as string;
    }
    return result;
  })();
  return (
    <CoreButton
      {...mergeProps<ButtonProps>(props, {
        ...attrs,
        className: button(variantProps),
      })}
      ref={ref}
    />
  );
});

export default Button;
