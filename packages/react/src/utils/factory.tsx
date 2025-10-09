import { mergeProps } from '@zag-js/core';
import { Children, cloneElement, forwardRef, isValidElement, memo, useState } from 'react';
import React from 'react';
import { composeRefs } from './hooks/composeRefs';

const NOOP = () => {};

export interface PolymorphicProps {
  asChild?: boolean;
  render?: () => void;
  ref?: React.Ref<any>;
}

type JsxElements = { [E in keyof React.JSX.IntrinsicElements]: UiForwardRefComponent<E> };

type UiForwardRefComponent<E extends React.ElementType> = React.ForwardRefExoticComponent<
  UiPropsWithRef<E>
>;

type UiPropsWithRef<E extends React.ElementType> = React.ComponentPropsWithRef<E> &
  PolymorphicProps;

// Credits to the Radix team
function getRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as any).ref;
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get;
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element.props as { ref?: React.Ref<unknown> | undefined }).ref;
  }

  return (element.props as { ref?: React.Ref<unknown> | undefined }).ref || (element as any).ref;
}

const withAsChild = (Component: React.ElementType) => {
  const Comp = memo(
    forwardRef<unknown, UiPropsWithRef<typeof Component>>((props, ref) => {
      const { asChild, render, children, ...restProps } = props;
      const [renderFn] = useState(() => render || NOOP);
      renderFn();

      if (!asChild) {
        return (
          <Component {...restProps} ref={ref}>
            {children}
          </Component>
        );
      }

      if (!isValidElement<Record<string, unknown>>(children)) {
        return null;
      }

      const onlyChild: React.ReactElement<Record<string, unknown>> = Children.only(children);

      const childRef = getRef(onlyChild);

      return cloneElement(onlyChild, {
        ...mergeProps(restProps, onlyChild.props),
        ref: ref ? composeRefs(ref, childRef) : childRef,
      });
    }),
  );

  // @ts-expect-error - it exists
  Comp.displayName = Component.displayName || Component.name;

  return Comp;
};

export type HTMLProps<T extends keyof React.JSX.IntrinsicElements> =
  React.ComponentPropsWithoutRef<T>;

export type DefaultHTMLProps<P = {}> = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
  'children' | 'ref'
> &
  P;

export type HTMLUiProps<T extends keyof React.JSX.IntrinsicElements> = HTMLProps<T> &
  PolymorphicProps;

export const jsxFactory = () => {
  const cache = new Map();

  return new Proxy(withAsChild, {
    apply(_target, _thisArg, argArray) {
      return withAsChild(argArray[0]);
    },
    get(_, element) {
      const asElement = element as React.ElementType;
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement));
      }
      return cache.get(asElement);
    },
  }) as unknown as JsxElements;
};

export const ui = jsxFactory();
