import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { useDialogContext } from '../core/context';

export interface DialogDescriptionProps extends HTMLProps<'div'> {}

const DialogDescription = forwardRef<HTMLDivElement, DialogDescriptionProps>(
  ({ children, ...props }, ref) => {
    const { getDescriptionProps } = useDialogContext();
    return (
      <ui.div {...getDescriptionProps()} {...props} ref={ref}>
        {children}
      </ui.div>
    );
  },
);

DialogDescription.displayName = 'DialogDescription';

export default DialogDescription;
