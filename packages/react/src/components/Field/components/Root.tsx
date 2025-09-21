import { forwardRef } from 'react';
import { ui } from '@/utils/factory';
import type { HTMLProps } from '@/utils/factory';
import { FieldProvider, type FieldContextProps } from '../Field.context';
import { splitProps } from '@/utils/splitProps';
import { propKeys } from '../Field.service';

export interface FieldRootProps extends FieldContextProps, HTMLProps<'div'> {
  children?: React.ReactNode;
}

const Root = forwardRef<HTMLDivElement, FieldRootProps>(({ children, ...props }, ref) => {
  const [providerProps, divProps] = splitProps(props, ...propKeys);
  return (
    <FieldProvider value={providerProps}>
      <ui.div {...divProps} ref={ref}>
        {children}
      </ui.div>
    </FieldProvider>
  );
});

export default Root;
