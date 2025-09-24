import { forwardRef } from 'react';
import { useDialogContext } from '../core/context';
import { Button, CloseIcon, type ButtonProps } from './imports';

export interface DialogCloseTriggerProps extends ButtonProps {}

const DialogCloseTrigger = forwardRef<HTMLButtonElement, DialogCloseTriggerProps>(
  ({ children, ...props }, ref) => {
    const { getCloseTriggerProps } = useDialogContext();
    return (
      <Button variant="text" size="large" icon {...getCloseTriggerProps()} {...props} ref={ref}>
        {children ?? <CloseIcon />}
      </Button>
    );
  },
);

DialogCloseTrigger.displayName = 'DialogCloseTrigger';

export default DialogCloseTrigger;
