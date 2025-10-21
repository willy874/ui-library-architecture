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

export interface BlockButtonProps
  extends ButtonServiceProps,
    ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<ButtonVariant> {
  icon?: boolean;
}

export const BlockButton = forwardRef((props: BlockButtonProps, ref: React.Ref<HTMLElement>) => {
  const [variantProps, { icon, ...restProps }] = splitProps(props, ...buttonVariantKeys);
  const [styles, variants] = buttonStyles(variantProps);
  const composeRef = useForkRef(ref, restProps.ref);
  const { getBlockProps, getSpinnerProps, isShowSpin } = useButtonService({
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
