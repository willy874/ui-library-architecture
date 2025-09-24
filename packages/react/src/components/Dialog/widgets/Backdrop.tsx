import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { useDialogContext } from '../core/context';

export interface DialogBackdropProps extends HTMLProps<'div'> {}

const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ children, ...props }, ref) => {
    const { getBackdropProps } = useDialogContext();
    return (
      <ui.div {...getBackdropProps()} {...props} ref={ref}>
        {children}
      </ui.div>
    );
  },
);

DialogBackdrop.displayName = 'DialogBackdrop';

export default DialogBackdrop;
