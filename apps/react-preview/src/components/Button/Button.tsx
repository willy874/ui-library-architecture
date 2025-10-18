import { forwardRef } from 'react';
import { SpinnerIcon } from '@ui-library-architecture/react-icon';
import { useButtonService, useForkRef, ui } from '@ui-library-architecture/react';
import type { ButtonServiceProps } from '@ui-library-architecture/react';
import { button, type ButtonVariant } from 'styled-system/recipes';

const Spinner = () => <SpinnerIcon />;

type ButtonHTMLAttributes<T extends HTMLElement> = Omit<
  React.ButtonHTMLAttributes<T>,
  keyof React.HTMLAttributes<T>
>;

export interface ContainerButtonProps
  extends ButtonServiceProps,
    ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<ButtonVariant> {
  icon?: boolean;
}

export const ContainerButton = forwardRef(
  (props: ContainerButtonProps, ref: React.Ref<HTMLElement>) => {
    const [variantsProps, { icon, ...restProps }] = button.splitVariantProps(props);
    const variants = button.getVariantProps(variantsProps) as ButtonVariant;
    const composeRef = useForkRef(ref, restProps.ref);
    const { getButtonProps, getSpinnerProps, isShowSpin } = useButtonService({
      ...restProps,
      ref: composeRef,
      classNames: {
        root: button(variants),
      },
      variants: {
        variant: variants.variant,
        theme: variants.theme,
        size: variants.size,
        shape: variants.shape,
        icon: !!icon,
      },
    });
    return (
      <ui.button {...getButtonProps()}>
        {isShowSpin ? (
          <ui.div {...getSpinnerProps()}>
            <Spinner />
          </ui.div>
        ) : (
          props.children
        )}
      </ui.button>
    );
  },
);

export interface BlockButtonProps
  extends ButtonServiceProps,
    ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<ButtonVariant> {
  icon?: boolean;
}

export const BlockButton = forwardRef((props: BlockButtonProps, ref: React.Ref<HTMLElement>) => {
  const [variantsProps, { icon, ...restProps }] = button.splitVariantProps(props);
  const variants = button.getVariantProps(variantsProps) as ButtonVariant;
  const composeRef = useForkRef(ref, restProps.ref);
  const { getBlockProps, getSpinnerProps, isShowSpin } = useButtonService({
    ...restProps,
    ref: composeRef,
    classNames: {
      root: button(variants),
    },
    variants: {
      variant: variants.variant,
      theme: variants.theme,
      size: variants.size,
      shape: variants.shape,
      icon: !!icon,
    },
  });
  return (
    <ui.div {...getBlockProps()}>
      {isShowSpin ? (
        <ui.div {...getSpinnerProps()}>
          <Spinner />
        </ui.div>
      ) : (
        props.children
      )}
    </ui.div>
  );
});

type AnchorHTMLAttributes<T extends HTMLElement> = Omit<
  React.AnchorHTMLAttributes<T>,
  keyof React.HTMLAttributes<T>
>;

export interface LinkButtonProps
  extends ButtonServiceProps,
    AnchorHTMLAttributes<HTMLAnchorElement>,
    Partial<ButtonVariant> {
  icon?: boolean;
}

export const LinkButton = forwardRef((props: LinkButtonProps, ref: React.Ref<HTMLElement>) => {
  const [variantsProps, { icon, ...restProps }] = button.splitVariantProps(props);
  const variants = button.getVariantProps(variantsProps) as ButtonVariant;
  const composeRef = useForkRef(ref, restProps.ref);
  const { getLinkProps, getSpinnerProps, isShowSpin } = useButtonService({
    ...restProps,
    ref: composeRef,
    classNames: {
      root: button(variants),
    },
    variants: {
      variant: variants.variant,
      theme: variants.theme,
      size: variants.size,
      shape: variants.shape,
      icon: !!icon,
    },
  });
  return (
    <ui.a {...getLinkProps()}>
      {isShowSpin ? (
        <ui.div {...getSpinnerProps()}>
          <Spinner />
        </ui.div>
      ) : (
        props.children
      )}
    </ui.a>
  );
});
