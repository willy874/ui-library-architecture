import { forwardRef, useRef } from 'react';
import { mergeProps } from '@zag-js/react';
import { ui } from '@/utils/factory';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { defineComponents } from '@/utils/hooks/defineComponents';
import { Spin as _Spin } from '../imports';
import { dataAttr } from '@zag-js/dom-query';

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

const Button = forwardRef(function (
  { children, loading, disabled, components, icon, type, ...props }: ButtonProps,
  propRef: React.Ref<HTMLButtonElement>,
) {
  const rootRef = useRef<HTMLButtonElement>(null);
  const refCallback = useForkRef<HTMLButtonElement>(rootRef, propRef);

  const componentNodes = useComponents({
    Spin: [_Spin, {}],
    ...components,
  });

  const node = (() => {
    if (loading) {
      return componentNodes.Spin;
    }
    return children;
  })();
  const $disabled = loading || disabled;

  const attrs = {
    'data-icon': dataAttr(!!icon),
  };
  return (
    <ui.button
      ref={refCallback}
      {...mergeProps<ButtonProps>(props, {
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
