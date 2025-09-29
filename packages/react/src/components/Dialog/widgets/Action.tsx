import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useDialogContext } from '../core/context';

export interface DialogActionProps extends HTMLProps<'div'> {}

const DialogAction = forwardRef<HTMLDivElement, DialogActionProps>(
  ({ children, ...props }, ref) => {
    const { getActionProps } = useDialogContext();
    return (
      <ui.div {...mergeProps(getActionProps(), props)} ref={ref}>
        {children}
      </ui.div>
    );
  },
);

DialogAction.displayName = 'DialogAction';

export default DialogAction;
