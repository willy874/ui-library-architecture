import { forwardRef, useRef } from 'react';
import { mergeProps } from '@zag-js/react';
import { dataAttr } from '@zag-js/dom-query';
import { ui } from '@/utils/factory';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { defineComponents } from '@/utils/hooks/defineComponents';
import { useLoadingWidth } from '../hooks/useLoadingWidth';
import { Spin as _Spin } from './imports';

const useComponents = defineComponents({
  Spin: _Spin,
});

export interface ButtonProps extends React.ComponentProps<'button'> {
  disabled?: boolean;
  icon?: boolean;
  loading?: boolean;
  components?: Parameters<typeof useComponents>[0];
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (props, ref) {
  const { children, loading, disabled, components, icon, type, ...rest } = props;
  const { isShowSpin, ref: loadingRef } = useLoadingWidth<HTMLButtonElement>(loading);
  const rootRef = useRef<HTMLButtonElement>(null);
  const refCallback = useForkRef<HTMLButtonElement>(rootRef, ref, loadingRef);

  const componentNodes = useComponents({
    Spin: [_Spin, {}],
    ...components,
  });

  const node = (() => {
    if (isShowSpin) {
      return componentNodes.Spin;
    }
    return children;
  })();
  const $disabled = isShowSpin || disabled;

  const attrs = {
    'data-icon': dataAttr(!!icon),
  };
  return (
    <ui.button
      ref={refCallback}
      {...mergeProps<ButtonProps>(rest, {
        ...attrs,
        type: type || 'button',
        disabled: $disabled,
      })}
    >
      {node}
    </ui.button>
  );
});

export default Button;
