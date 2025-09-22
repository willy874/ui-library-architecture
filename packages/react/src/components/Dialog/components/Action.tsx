import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { useDialogContext } from '../Dialog.context';

export interface ActionProps extends HTMLProps<'div'> {}

const Action = forwardRef<HTMLDivElement, ActionProps>(({ children, ...props }, ref) => {
  const { getActionProps } = useDialogContext();
  return (
    <ui.div {...getActionProps()} {...props} ref={ref}>
      {children}
    </ui.div>
  );
});

export default Action;
