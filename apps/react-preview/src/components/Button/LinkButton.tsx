import { forwardRef } from 'react';
import {
  splitProps,
  ui,
  useButtonService,
  useForkRef,
  type ButtonServiceProps,
} from '@ui-library-architecture/react';
import { buttonStyles, buttonVariantKeys, type ButtonVariant } from './styles';
import { Spinner, type ButtonHTMLAttributes } from './imports';

export interface LinkButtonProps
  extends ButtonServiceProps,
    ButtonHTMLAttributes<HTMLAnchorElement>,
    Partial<ButtonVariant> {
  icon?: boolean;
}

export const LinkButton = forwardRef((props: LinkButtonProps, ref: React.Ref<HTMLElement>) => {
  const [variantProps, { icon, ...restProps }] = splitProps(props, ...buttonVariantKeys);
  const [styles, variants] = buttonStyles(variantProps);
  const composeRef = useForkRef(ref, restProps.ref);
  const { getLinkProps, getSpinnerProps, isShowSpin } = useButtonService({
    ...restProps,
    ref: composeRef,
    classNames: {
      root: styles.button,
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
