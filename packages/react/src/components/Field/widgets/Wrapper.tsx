import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useFieldContext } from '../core/context';

export interface FieldWrapperProps extends HTMLProps<'div'> {
  children?: React.ReactNode;
}

const FieldWrapper = forwardRef<HTMLDivElement, FieldWrapperProps>((props, ref) => {
  const { children, ...rest } = props;
  const { getWrapperProps } = useFieldContext();
  return (
    <ui.div {...mergeProps(getWrapperProps(), rest)} ref={ref}>
      {children}
    </ui.div>
  );
});

FieldWrapper.displayName = 'FieldWrapper';

export default FieldWrapper;
