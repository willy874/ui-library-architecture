import { forwardRef, useContext, useRef } from 'react';
import { input } from 'styled-system/recipes';
import { ui, type HTMLProps } from '@/utils/factory';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { mergeProps } from '@/utils/mergeProps';
import { InputContext } from '@/components/Input';

export interface InputProps extends HTMLProps<'input'> {
  ref: React.Ref<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref: ctxRef, ...ctxRest } = useContext(InputContext) || {};
  const { ref: propRef, ...propRest } = props as InputProps;
  const combinedRef = useForkRef(ref, ctxRef, propRef, inputRef);
  return (
    <ui.input
      ref={combinedRef}
      {...mergeProps(ctxRest, propRest, {
        className: input({}),
      })}
    />
  );
});

export default Input;
