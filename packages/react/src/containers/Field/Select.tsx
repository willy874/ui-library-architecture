import { forwardRef, useContext, useRef } from 'react';
import { input } from 'styled-system/recipes';
import { ui, type HTMLProps } from '@/utils/factory';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { mergeProps } from '@/utils/mergeProps';
import { SelectContext } from '@/components';

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
