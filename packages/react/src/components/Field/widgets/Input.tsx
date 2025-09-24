import { mergeProps } from '@/utils/mergeProps';
import { type HTMLProps } from '@/utils/factory';
import { useFieldContext } from '../core/context';
import { Input } from './imports';
import { forwardRef } from 'react';

export interface FieldInputProps extends HTMLProps<'input'> {
  as?: (props: HTMLProps<'input'>) => React.ReactElement;
}

const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>((props, ref) => {
  const { as: Component = Input, ...rest } = props;
  const { getInputProps } = useFieldContext();
  return <Component {...mergeProps(getInputProps(), rest)} ref={ref} />;
});

FieldInput.displayName = 'FieldInput';

export default FieldInput;
