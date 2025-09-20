import { forwardRef } from 'react';
import { mergeProps } from '@zag-js/react';
import { button } from '@/styled-system/recipes';
import type { ButtonVariantProps } from '@/styled-system/recipes';
import CoreButtonLink from './components/ButtonLink';
import type { ButtonLinkProps as CoreButtonLinkProps } from './components/ButtonLink';

type ButtonRecipeVariants = ButtonVariantProps;

export interface ButtonLinkProps extends CoreButtonLinkProps, ButtonRecipeVariants {}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function (props, ref) {
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
    <CoreButtonLink
      {...mergeProps<ButtonLinkProps>(props, {
        role: 'button',
        ...attrs,
        className: button(variantProps),
      })}
      ref={ref}
    />
  );
});

export default ButtonLink;
