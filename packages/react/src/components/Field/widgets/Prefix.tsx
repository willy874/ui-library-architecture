import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useFieldContext } from '../core/context';

export interface FieldPrefixProps extends HTMLProps<'div'> {
  children?: React.ReactNode;
}

const FieldPrefix = forwardRef<HTMLDivElement, FieldPrefixProps>(({ children, ...props }, ref) => {
  const { getPrefixProps } = useFieldContext();
  return (
    <ui.div {...mergeProps(getPrefixProps(), props)} ref={ref}>
      {children}
    </ui.div>
  );
});

FieldPrefix.displayName = 'FieldPrefix';

export default FieldPrefix;
