import { forwardRef, useContext, useRef } from 'react';
import { input } from 'styled-system/recipes';
import { mergeProps, useForkRef, SelectContext, ui } from '@ui-library-architecture/react';
import type { HTMLProps } from '@ui-library-architecture/react';

export interface SelectProps extends HTMLProps<'select'> {
  ref: React.Ref<HTMLSelectElement>;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { ref: ctxRef, ...ctxRest } = useContext(SelectContext) || {};
  const { ref: propRef, ...propRest } = props as SelectProps;
  const combinedRef = useForkRef(ref, ctxRef, propRef, selectRef);
  return (
    <ui.select
      ref={combinedRef}
      {...mergeProps(ctxRest, propRest, {
        className: input({}),
      })}
    >
      {props.children}
    </ui.select>
  );
});

export default Select;
