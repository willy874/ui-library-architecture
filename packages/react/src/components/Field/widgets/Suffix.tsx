import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useFieldContext } from '../core/context';

export interface FieldSuffixProps extends HTMLProps<'div'> {
  children?: React.ReactNode;
}

const FieldSuffix = forwardRef<HTMLDivElement, FieldSuffixProps>((props, ref) => {
  const { children, ...rest } = props;
  const { getSuffixProps } = useFieldContext();
  return (
    <ui.div {...mergeProps(getSuffixProps(), rest)} ref={ref}>
      {children}
    </ui.div>
  );
});

FieldSuffix.displayName = 'FieldSuffix';

export default FieldSuffix;
