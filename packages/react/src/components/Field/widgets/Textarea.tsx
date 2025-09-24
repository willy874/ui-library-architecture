import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useFieldContext } from '../core/context';

export interface TextareaProps extends HTMLProps<'textarea'> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { children, ...rest } = props;
  const { getTextareaProps } = useFieldContext();
  return (
    <ui.textarea {...mergeProps(getTextareaProps(), rest)} ref={ref}>
      {children}
    </ui.textarea>
  );
});

export default Textarea;
