import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useFieldContext } from '../core/context';
import { forwardRef } from 'react';

export interface FieldHelperProps extends HTMLProps<'div'> {
  children?: React.ReactNode;
}

const FieldHelper = forwardRef<HTMLDivElement, FieldHelperProps>(({ children, ...props }, ref) => {
  const { getHelperProps } = useFieldContext();
  return (
    <ui.div {...mergeProps(getHelperProps(), props)} ref={ref}>
      {children}
    </ui.div>
  );
});

FieldHelper.displayName = 'FieldHelper';

export default FieldHelper;
