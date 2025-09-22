import { forwardRef } from 'react';
import { useDialogContext } from '../Dialog.context';
import { Button, type ButtonProps } from './imports';

export interface TriggerProps extends ButtonProps {}

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(({ children, ...props }, ref) => {
  const { getOpenTriggerProps } = useDialogContext();
  return (
    <Button {...getOpenTriggerProps()} {...props} ref={ref}>
      {children}
    </Button>
  );
});

export default Trigger;
