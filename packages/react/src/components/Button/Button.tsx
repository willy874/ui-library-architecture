import { forwardRef } from 'react';
import { mergeProps } from '@zag-js/react';
import type { ButtonVariantProps } from '@/styled-system/recipes';
import CoreButton from './components/Button';
import type { ButtonProps as CoreButtonProps } from './components/Button';
import { useVariants } from './hooks/useVariants';

type ButtonRecipeVariants = ButtonVariantProps;

export interface ButtonProps extends CoreButtonProps, ButtonRecipeVariants {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (props, ref) {
  const attrs = useVariants(props);
  return <CoreButton {...mergeProps<ButtonProps>(props, attrs)} ref={ref} />;
});

export default Button;
