import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useFieldContext } from '../core/context';

export interface FieldTextareaProps extends HTMLProps<'textarea'> {
  as?: (props: HTMLProps<'textarea'>) => React.ReactElement;
  children?: React.ReactNode;
}

const FieldTextarea = forwardRef<HTMLTextAreaElement, FieldTextareaProps>((props, ref) => {
  const { as: Component = ui.textarea, children, ...rest } = props;
  const { getTextareaProps } = useFieldContext();
  return (
    <Component {...mergeProps(getTextareaProps(), rest)} ref={ref}>
      {children}
    </Component>
  );
});

FieldTextarea.displayName = 'FieldTextarea';

export default FieldTextarea;
