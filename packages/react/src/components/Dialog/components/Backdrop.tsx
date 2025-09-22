import { forwardRef } from 'react';
import { ui, type HTMLProps } from '@/utils/factory';
import { useDialogContext } from '../Dialog.context';

export interface BackdropProps extends HTMLProps<'div'> {}

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(({ children, ...props }, ref) => {
  const { getBackdropProps } = useDialogContext();
  return (
    <ui.div {...getBackdropProps()} {...props} ref={ref}>
      {children}
    </ui.div>
  );
});

export default Backdrop;
