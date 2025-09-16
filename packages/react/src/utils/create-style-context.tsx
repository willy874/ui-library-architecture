import { createContext, forwardRef, useContext } from 'react';
import { cx } from './mergeProps';

type Props = Record<string, unknown>;
type Recipe = {
  (props?: Props): Props;
  splitVariantProps: (props: Props) => [Props, Props];
};
type Slot<R extends Recipe> = keyof ReturnType<R>;

export const createStyleContext = <R extends Recipe>(recipe: R) => {
  const StyleContext = createContext<Record<Slot<R>, string> | null>(null);

  const withProvider = <P extends {}>(Component: React.ComponentType<P>): React.FC<P> => {
    const StyledComponent = (props: P) => {
      const [variantProps, otherProps] = recipe.splitVariantProps(props);
      const slotStyles = recipe(variantProps) as Record<Slot<R>, string>;
      return (
        <StyleContext.Provider value={slotStyles}>
          <Component {...(otherProps as P)} />
        </StyleContext.Provider>
      );
    };
    return StyledComponent;
  };

  const withRootProvider = <T, P extends { className?: string | undefined }>(
    Component: React.ComponentType<P>,
    slot: Slot<R>,
  ): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> => {
    const StyledSlotProvider = forwardRef<T, P>((props, ref) => {
      const [variantProps, otherProps] = recipe.splitVariantProps(props);
      const slotStyles = recipe(variantProps) as Record<Slot<R>, string>;

      return (
        <StyleContext.Provider value={slotStyles}>
          <Component
            {...(otherProps as P)}
            ref={ref}
            className={cx(slotStyles?.[slot], props.className)}
          />
        </StyleContext.Provider>
      );
    });
    StyledSlotProvider.displayName = Component.displayName || Component.name;

    return StyledSlotProvider;
  };

  const withContext = <T, P extends { className?: string | undefined }>(
    Component: React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>,
    slot: Slot<R>,
  ): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> => {
    const StyledSlotComponent = forwardRef<T, P>((props, ref) => {
      const slotStyles = useContext(StyleContext);
      return <Component {...props} ref={ref} className={cx(slotStyles?.[slot], props.className)} />;
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
