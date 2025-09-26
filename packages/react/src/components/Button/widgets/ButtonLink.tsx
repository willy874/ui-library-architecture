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

export interface ButtonLinkProps extends React.ComponentProps<'a'> {
  as?: React.FC<React.ComponentProps<'a'>>;
  disabled?: boolean;
  icon?: boolean;
  loading?: boolean;
  components?: Parameters<typeof useComponents>[0];
  children?: React.ReactNode;
}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function (props, ref) {
  const {
    children,
    loading,
    disabled,
    components,
    icon,
    type,
    as: Component = ui.a,
    ...rest
  } = props;
  const { isShowSpin, ref: loadingRef } = useLoadingWidth<HTMLAnchorElement>(loading);
  const rootRef = useRef<HTMLAnchorElement>(null);
  const refCallback = useForkRef<HTMLAnchorElement>(rootRef, ref, loadingRef);

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
    <Component
      ref={refCallback}
      {...mergeProps<ButtonLinkProps>(rest, {
        ...attrs,
        role: 'button',
        disabled: $disabled,
      })}
    >
      {node}
    </Component>
  );
});

export default ButtonLink;
