import { forwardRef, useContext, useRef } from 'react';
import { input } from 'styled-system/recipes';
import { mergeProps, useForkRef, TextareaContext, ui } from '@ui-library-architecture/react';
import type { HTMLProps } from '@ui-library-architecture/react';

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
