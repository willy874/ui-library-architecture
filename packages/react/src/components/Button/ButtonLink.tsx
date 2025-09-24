import { forwardRef } from 'react';
import { mergeProps } from '@zag-js/react';
import type { ButtonVariantProps } from '@/styled-system/recipes';
import { useButtonVariants } from './hooks/useButtonVariants';
import CoreButtonLink from './components/ButtonLink';
import type { ButtonLinkProps as CoreButtonLinkProps } from './components/ButtonLink';

export interface ButtonLinkProps extends CoreButtonLinkProps, ButtonVariantProps {}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function (props, ref) {
  const attrs = useButtonVariants(props);
  return <CoreButtonLink {...mergeProps<ButtonLinkProps>(props, attrs)} ref={ref} />;
});

export default ButtonLink;
