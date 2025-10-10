import React, { forwardRef, useRef } from 'react';
import { mergeProps } from '@zag-js/react';
import { dataAttr } from '@zag-js/dom-query';
import { ui } from '@/utils/factory';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { defineComponents } from '@/utils/hooks/defineComponents';
import { useLoadingWidth } from './hooks/useLoadingWidth';
import { Spinner } from './imports';

const useComponents = defineComponents({
  Spin: Spinner,
});

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof typeof ui;
  disabled?: boolean;
  icon?: boolean;
  loading?: boolean;
  components?: Parameters<typeof useComponents>[0];
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLElement, ButtonProps>(function (props, ref) {
  const { children, loading, disabled, components, icon, as, ...rest } = props;
  const { isShowSpin, ref: loadingRef } = useLoadingWidth<HTMLElement>(loading);
  const rootRef = useRef<HTMLElement>(null);
  const refCallback = useForkRef<HTMLElement>(rootRef, ref, loadingRef);
  const Component = (() => {
    if (!as) return 'button';
    return ui[as];
  })();

  const componentNodes = useComponents({
    Spin: [Spinner, {}],
    ...components,
  });

  const node = (() => {
    if (isShowSpin) {
      return componentNodes.Spin;
    }
    return children;
  })();
  const $disabled = isShowSpin || disabled;

  const attrs = mergeProps<any>(rest, {
    role: Component === 'button' ? undefined : 'button',
    disabled: $disabled,
    'data-icon': dataAttr(!!icon),
    ref: refCallback,
  });

  return <Component {...attrs}>{node}</Component>;
});

export default Button;
