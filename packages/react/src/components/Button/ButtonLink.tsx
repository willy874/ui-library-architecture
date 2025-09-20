import { forwardRef } from 'react';
import { mergeProps } from '@zag-js/react';
import type { ButtonVariantProps } from '@/styled-system/recipes';
import CoreButtonLink from './components/ButtonLink';
import type { ButtonLinkProps as CoreButtonLinkProps } from './components/ButtonLink';
import { useVariants } from './hooks/useVariants';

type ButtonRecipeVariants = ButtonVariantProps;

export interface ButtonLinkProps extends CoreButtonLinkProps, ButtonRecipeVariants {}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function (props, ref) {
  const attrs = useVariants(props);
  return <CoreButtonLink {...mergeProps<ButtonLinkProps>(props, attrs)} ref={ref} />;
});

export default ButtonLink;
