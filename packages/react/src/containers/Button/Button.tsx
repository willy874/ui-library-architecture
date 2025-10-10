import { forwardRef } from 'react';
import { button, type ButtonVariant } from '@/styled-system/recipes';
import { injectDataset } from '@/utils/injectDataset';
import { Button as CoreButton } from '@/components';
import type { ButtonProps as CoreButtonProps } from '@/components';

type ButtonHTMLAttributes<T extends HTMLElement> = Omit<
  React.ButtonHTMLAttributes<T>,
  keyof React.HTMLAttributes<T>
>;

export interface ContainerButtonProps
  extends Omit<CoreButtonProps, 'as'>,
    ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<ButtonVariant> {}

export const ContainerButton = forwardRef(
  (props: ContainerButtonProps, ref: React.Ref<HTMLElement>) => {
    const variants = button.getVariantProps(button.splitVariantProps(props)[0]) as ButtonVariant;
    const dataset = injectDataset({
      variant: variants.variant,
      theme: variants.theme,
      size: variants.size,
      shape: variants.shape,
    });
    const newProps = {
      className: button(variants),
      ...dataset,
      ...props,
    };
    return <CoreButton as="button" {...newProps} ref={ref} />;
  },
);

export interface BlockButtonProps
  extends Omit<CoreButtonProps, 'as'>,
    ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<ButtonVariant> {}

export const BlockButton = forwardRef((props: BlockButtonProps, ref: React.Ref<HTMLElement>) => {
  const variants = button.getVariantProps(button.splitVariantProps(props)[0]) as ButtonVariant;
  const dataset = injectDataset({
    variant: variants.variant,
    theme: variants.theme,
    size: variants.size,
    shape: variants.shape,
  });
  const newProps = {
    className: button(variants),
    ...dataset,
    ...props,
  };
  return <CoreButton {...newProps} ref={ref} />;
});

type AnchorHTMLAttributes<T extends HTMLElement> = Omit<
  React.AnchorHTMLAttributes<T>,
  keyof React.HTMLAttributes<T>
>;

export interface LinkButtonProps
  extends Omit<CoreButtonProps, 'as'>,
    AnchorHTMLAttributes<HTMLAnchorElement>,
    Partial<ButtonVariant> {}

export const LinkButton = forwardRef((props: LinkButtonProps, ref: React.Ref<HTMLElement>) => {
  const variants = button.getVariantProps(button.splitVariantProps(props)[0]) as ButtonVariant;
  const dataset = injectDataset({
    variant: variants.variant,
    theme: variants.theme,
    size: variants.size,
    shape: variants.shape,
  });
  const newProps = {
    className: button(variants),
    ...dataset,
    ...props,
  };
  return <CoreButton as="a" {...newProps} ref={ref} />;
});
