import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useFieldContext } from '../core/context';

export interface SelectProps extends HTMLProps<'select'> {
  children?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { children, ...rest } = props;
  const { getSelectProps } = useFieldContext();
  return (
    <ui.select {...mergeProps(getSelectProps(), rest)} ref={ref}>
      {children}
    </ui.select>
  );
});

export default Select;
