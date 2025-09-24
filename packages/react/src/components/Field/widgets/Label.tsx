import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useFieldContext } from '../core/context';

export interface FieldLabelProps extends HTMLProps<'label'> {
  children?: React.ReactNode;
}

const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(({ children, ...props }, ref) => {
  const { getLabelProps } = useFieldContext();
  return (
    <ui.label {...mergeProps(getLabelProps(), props)} ref={ref}>
      {children}
    </ui.label>
  );
});

FieldLabel.displayName = 'FieldLabel';

export default FieldLabel;
