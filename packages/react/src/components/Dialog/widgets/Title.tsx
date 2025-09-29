import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { mergeProps } from '@/utils/mergeProps';
import { useDialogContext } from '../core/context';

export interface DialogTitleProps extends HTMLProps<'div'> {}

const DialogTitle = forwardRef<HTMLDivElement, DialogTitleProps>(({ children, ...props }, ref) => {
  const { getTitleProps } = useDialogContext();
  return (
    <ui.div {...mergeProps(getTitleProps(), props)} ref={ref}>
      {children}
    </ui.div>
  );
});

DialogTitle.displayName = 'DialogTitle';

export default DialogTitle;
