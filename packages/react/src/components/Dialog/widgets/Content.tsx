import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useDialogContext } from '../core/context';

export interface DialogContentProps extends HTMLProps<'div'> {}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, ...props }, ref) => {
    const { getContentProps } = useDialogContext();
    return (
      <ui.div {...mergeProps(getContentProps(), props)} ref={ref}>
        {children}
      </ui.div>
    );
  },
);

DialogContent.displayName = 'DialogContent';

export default DialogContent;
