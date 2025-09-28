import { createContext, forwardRef, useContext } from 'react';
import { cx, mergeProps } from './mergeProps';
import type { Props, StyleAttributes } from './types';

export type DefineInjectContextRecipe<K extends string> = {
  (props: Props): Record<K, StyleAttributes>;
};

export const defineInjectContext = <K extends string>(recipe: DefineInjectContextRecipe<K>) => {
  const StyleContext = createContext<Record<K, StyleAttributes> | null>(null);

  const withProvider = <P extends {}>(Component: React.ComponentType<P>): React.FC<P> => {
    const StyledComponent = (props: P) => {
      const slotStyles = recipe(props);
      return (
        <StyleContext.Provider value={slotStyles}>
          <Component {...(props as P)} />
        </StyleContext.Provider>
      );
    };
    return StyledComponent;
  };

  const withRootProvider = <T, P extends { className?: string | undefined }>(
    Component: React.ComponentType<P>,
    slot: K,
  ): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> => {
    const StyledSlotProvider = forwardRef<T, P>((props, ref) => {
      const slotStyles = recipe(props);
      const { className, ...attrs } = slotStyles?.[slot] || ({} as StyleAttributes);

      return (
        <StyleContext.Provider value={slotStyles}>
          <Component
            {...({ ...attrs, ...props } as P)}
            ref={ref}
            className={cx(className, props.className)}
          />
        </StyleContext.Provider>
      );
    });
    StyledSlotProvider.displayName = Component.displayName || Component.name;

    return StyledSlotProvider;
  };

  const withContext = <T, P extends { className?: string | undefined }>(
    Component: React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>,
    slot: K,
  ): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> => {
    const StyledSlotComponent = forwardRef<T, P>((props, ref) => {
      const slotStyles = useContext(StyleContext);
      const attrs = slotStyles?.[slot] || ({} as StyleAttributes);
      return <Component {...props} ref={ref} className={cx(attrs.className, props.className)} />;
    });
    StyledSlotComponent.displayName = Component.displayName || Component.name;

    return StyledSlotComponent;
  };

  return {
    withRootProvider,
    withProvider,
    withContext,
  };
};

export type DefineInjectRecipe<P extends Props> = {
  (props: P): StyleAttributes;
};

export function withVariants<T, Props extends { className?: string | undefined }>(
  recipe: DefineInjectRecipe<Props>,
  Component: React.ComponentType<Props>,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<Props> & React.RefAttributes<T>> {
  const FC = forwardRef<T, Props>(function (props, ref) {
    return <Component {...mergeProps<any>(props, recipe(props as any))} ref={ref} />;
  });
  return FC;
}

export function injectBaseProps<T, P extends {}, D extends Partial<P>>(
  Component: React.ComponentType<P>,
  baseProps: D,
): React.FC<Omit<P, keyof D>>;
export function injectBaseProps<T, P extends {}, D extends Partial<P>>(
  Component: React.ForwardRefExoticComponent<P>,
  baseProps: D,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Omit<P, keyof D>> & React.RefAttributes<T>
>;
export function injectBaseProps(Component: React.ComponentType, baseProps: any): React.FC {
  const FC = forwardRef(function (props, ref) {
    return <Component {...mergeProps<any>(props, baseProps)} ref={ref} />;
  });
  return FC as any;
}
