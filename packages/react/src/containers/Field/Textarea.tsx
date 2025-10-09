import { forwardRef, useContext, useRef } from 'react';
import { input } from 'styled-system/recipes';
import { ui, type HTMLProps } from '@/utils/factory';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { mergeProps } from '@/utils/mergeProps';
import { TextareaContext } from '@/components/Textarea';

export interface TextareaProps extends HTMLProps<'textarea'> {
  ref: React.Ref<HTMLTextAreaElement>;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { ref: ctxRef, ...ctxRest } = useContext(TextareaContext) || {};
  const { ref: propRef, ...propRest } = props as TextareaProps;
  const combinedRef = useForkRef(ref, ctxRef, propRef, textareaRef);
  return (
    <ui.textarea
      ref={combinedRef}
      {...mergeProps(ctxRest, propRest, {
        className: input({}),
      })}
    >
      {props.children}
    </ui.textarea>
  );
});

export default Textarea;
