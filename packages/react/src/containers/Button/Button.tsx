import { forwardRef } from 'react';
import { button, type ButtonVariant } from '@/styled-system/recipes';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { useButtonService } from '@/components';
import type { ButtonServiceProps } from '@/components';
import { ui } from '@/utils/factory';
import { Spinner } from './imports';

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
    const [variantsProps, restProps] = button.splitVariantProps(props);
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
        icon: !!props.icon,
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
  },
);

export interface BlockButtonProps
  extends ButtonServiceProps,
    ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<ButtonVariant> {
  icon?: boolean;
}

export const BlockButton = forwardRef((props: BlockButtonProps, ref: React.Ref<HTMLElement>) => {
  const [variantsProps, restProps] = button.splitVariantProps(props);
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
      icon: !!props.icon,
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
  const [variantsProps, restProps] = button.splitVariantProps(props);
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
      icon: !!props.icon,
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
