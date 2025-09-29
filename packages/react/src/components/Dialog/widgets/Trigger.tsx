import { forwardRef } from 'react';
import { mergeProps } from '@/utils/mergeProps';
import { useDialogContext } from '../core/context';
import { Button, type ButtonProps } from './imports';

export interface DialogTriggerProps extends ButtonProps {}

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, ...props }, ref) => {
    const { getOpenTriggerProps } = useDialogContext();
    return (
      <Button {...mergeProps(getOpenTriggerProps(), props)} ref={ref}>
        {children}
      </Button>
    );
  },
);

DialogTrigger.displayName = 'DialogTrigger';

export default DialogTrigger;
