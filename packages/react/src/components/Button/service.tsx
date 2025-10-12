import { useCallback } from 'react';
import { dataAttr } from '@zag-js/dom-query';
import type { DefaultHTMLProps, HTMLProps, PolymorphicProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { splitProps } from '@/utils/splitProps';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { useLoadingWidth } from './hooks/useLoadingWidth';

type Parts = 'root' | 'spinner';

type PartsRecord<T> = {
  [K in Parts]?: T;
};

export interface ButtonServiceProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  loading?: boolean;
  classNames?: PartsRecord<string>;
  variants?: Record<string, string | boolean>;
  ref?: React.Ref<HTMLElement>;
}

export interface ButtonServiceResult {
  isShowSpin: boolean;
  getSpinnerProps: (props?: React.HTMLAttributes<HTMLElement>) => React.HTMLAttributes<HTMLElement>;
  getBlockProps: (
    props?: React.HTMLAttributes<HTMLButtonElement>,
  ) => React.HTMLAttributes<HTMLElement>;
  getButtonProps: (
    props?: React.ButtonHTMLAttributes<HTMLButtonElement>,
  ) => React.ButtonHTMLAttributes<HTMLButtonElement>;
  getLinkProps: (
    props?: React.AnchorHTMLAttributes<HTMLAnchorElement>,
  ) => React.AnchorHTMLAttributes<HTMLAnchorElement>;
}

const propKeys = ['disabled', 'loading', 'classNames', 'variants', 'ref'] as const;

export function useButtonService(props: ButtonServiceProps): ButtonServiceResult {
  const [{ loading, classNames = {}, variants, disabled, ref }, attrs] = splitProps(
    props,
    ...propKeys,
  );
  const { isShowSpin, ref: loadingRef } = useLoadingWidth<HTMLElement>(loading);
  const refCallback = useForkRef<HTMLElement>(ref, loadingRef);

  const getBaseProps = useCallback(() => {
    const variantAttrs = Object.entries(variants ?? {}).reduce(
      (acc, [key, value]) => {
        if (typeof value === 'boolean') {
          acc[`data-button-${key}`] = dataAttr(value);
        }
        if (typeof value === 'string' && value) {
          acc[`data-button-${key}`] = value;
        }
        return acc;
      },
      {} as Record<string, string | boolean | undefined>,
    );
    const $disabled = disabled || isShowSpin;
    return {
      ...attrs,
      ...variantAttrs,
      'data-disabled': dataAttr($disabled),
      disabled: $disabled,
    };
  }, [attrs, variants, disabled]);

  const getSpinnerProps = (props?: React.HTMLAttributes<HTMLElement>) => ({
    ...props,
    className: classNames.spinner,
  });

  const getBlockProps = useCallback(
    (overrides?: DefaultHTMLProps) =>
      mergeProps<DefaultHTMLProps & PolymorphicProps>(
        {
          ...getBaseProps(),
          className: classNames.root,
          role: 'button',
        },
        { ...overrides },
      ),
    [],
  );

  const getButtonProps = useCallback(
    (overrides?: HTMLProps<'button'>) =>
      mergeProps<DefaultHTMLProps & PolymorphicProps>(
        {
          ...getBaseProps(),
          className: classNames.root,
          ref: refCallback,
        },
        { ...overrides },
      ),
    [],
  );

  const getLinkProps = useCallback(
    (overrides?: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
      mergeProps<DefaultHTMLProps & PolymorphicProps>(
        {
          ...getBaseProps(),
          className: classNames.root,
          role: 'button',
          ref: refCallback,
        },
        { ...overrides },
      ),
    [],
  );

  return {
    isShowSpin,
    getSpinnerProps,
    getBlockProps,
    getButtonProps,
    getLinkProps,
  };
}
