import { forwardRef } from 'react';
import { mergeProps } from '@zag-js/react';
import { button, type ButtonVariantProps } from '@/styled-system/recipes';
import CoreButton from './components/Button';
import { useVariants } from '@/utils/hooks/useVariants';
import type { ButtonProps as CoreButtonProps } from './components/Button';

export interface ButtonProps extends CoreButtonProps, ButtonVariantProps {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (props, ref) {
  const attrs = useVariants<ButtonVariantProps>(props, button);
  return <CoreButton {...mergeProps<ButtonProps>(props, attrs)} ref={ref} />;
});

export default Button;
