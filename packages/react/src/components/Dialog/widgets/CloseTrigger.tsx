import { forwardRef } from 'react';
import { mergeProps } from '@/utils/mergeProps';
import { useDialogContext } from '../core/context';
import { CloseIcon } from './imports';
import { ui, type HTMLProps } from '@/utils/factory';

export interface DialogCloseTriggerProps extends HTMLProps<'button'> {}

const DialogCloseTrigger = forwardRef<HTMLButtonElement, DialogCloseTriggerProps>(
  ({ children, ...props }, ref) => {
    const { getCloseTriggerProps } = useDialogContext();
    return (
      <ui.button {...mergeProps(getCloseTriggerProps(), props)} ref={ref}>
        {children ?? <CloseIcon />}
      </ui.button>
    );
  },
);

DialogCloseTrigger.displayName = 'DialogCloseTrigger';

export default DialogCloseTrigger;
