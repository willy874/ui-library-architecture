import { forwardRef } from 'react';
import { mergeProps } from './mergeProps';
import type { Props, StyleAttributes } from './types';

export type DefineInjectRecipe<P extends Props> = {
  (props: P): StyleAttributes;
};

export function withVariants<T, Props extends { className?: string; children?: React.ReactNode }>(
  recipe: DefineInjectRecipe<Props>,
  Component: React.ComponentType<Props>,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<Props> & React.RefAttributes<T>> {
  const FC = forwardRef<T, Props>(function (props, ref) {
    return (
      <Component {...mergeProps<any>(props, recipe(props as any))} ref={ref}>
        {props.children}
      </Component>
    );
  });
  return FC;
}
