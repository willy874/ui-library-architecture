import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useFieldContext } from '../core/context';

export interface FieldErrorTextProps extends HTMLProps<'span'> {
  children?: React.ReactNode;
}

const FieldErrorText = forwardRef<HTMLSpanElement, FieldErrorTextProps>(
  ({ children, ...props }, ref) => {
    const { getErrorTextProps } = useFieldContext();
    return (
      <ui.span {...mergeProps(getErrorTextProps(), props)} ref={ref}>
        {children}
      </ui.span>
    );
  },
);

FieldErrorText.displayName = 'FieldErrorText';

export default FieldErrorText;
