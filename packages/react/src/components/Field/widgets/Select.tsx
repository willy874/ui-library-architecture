import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useFieldContext } from '../core/context';

export interface FieldSelectProps extends HTMLProps<'select'> {
  as?: (props: HTMLProps<'select'>) => React.ReactElement;
  children?: React.ReactNode;
}

const FieldSelect = forwardRef<HTMLSelectElement, FieldSelectProps>((props, ref) => {
  const { as: Component = ui.select, children, ...rest } = props;
  const { getSelectProps } = useFieldContext();
  return (
    <Component {...mergeProps(getSelectProps(), rest)} ref={ref}>
      {children}
    </Component>
  );
});

FieldSelect.displayName = 'FieldSelect';

export default FieldSelect;
