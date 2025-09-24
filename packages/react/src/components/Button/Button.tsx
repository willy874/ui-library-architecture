import { forwardRef } from 'react';
import { mergeProps } from '@zag-js/react';
import type { ButtonVariantProps } from '@/styled-system/recipes';
import { useButtonVariants } from './hooks/useButtonVariants';
import CoreButton from './components/Button';
import type { ButtonProps as CoreButtonProps } from './components/Button';

export interface ButtonProps extends CoreButtonProps, ButtonVariantProps {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (props, ref) {
  const attrs = useButtonVariants(props);
  return <CoreButton {...mergeProps<ButtonProps>(props, attrs)} ref={ref} />;
});

export default Button;
