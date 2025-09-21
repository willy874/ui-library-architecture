import { forwardRef } from 'react';
import { mergeProps } from '@zag-js/react';
import { button, type ButtonVariantProps } from '@/styled-system/recipes';
import CoreButtonLink from './components/ButtonLink';
import { useVariants } from '@/utils/hooks/useVariants';
import type { ButtonLinkProps as CoreButtonLinkProps } from './components/ButtonLink';

export interface ButtonLinkProps extends CoreButtonLinkProps, ButtonVariantProps {}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function (props, ref) {
  const attrs = useVariants<ButtonVariantProps>(props, button);
  return <CoreButtonLink {...mergeProps<ButtonLinkProps>(props, attrs)} ref={ref} />;
});

export default ButtonLink;
