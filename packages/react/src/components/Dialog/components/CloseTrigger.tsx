import { forwardRef } from 'react';
import { useDialogContext } from '../Dialog.context';
import { Button, CloseIcon, type ButtonProps } from './imports';

export interface CloseTriggerProps extends ButtonProps {}

const CloseTrigger = forwardRef<HTMLButtonElement, CloseTriggerProps>(
  ({ children, ...props }, ref) => {
    const { getCloseTriggerProps } = useDialogContext();
    return (
      <Button variant="text" size="large" icon {...getCloseTriggerProps()} {...props} ref={ref}>
        {children ?? <CloseIcon />}
      </Button>
    );
  },
);

export default CloseTrigger;
