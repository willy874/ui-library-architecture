import { Portal, type PortalProps } from './imports';
import { useDialogContext } from '../Dialog.context';

export interface DialogPortalProps extends PortalProps {
  children?: React.ReactNode;
}

const DialogPortal = ({ children, ...props }: DialogPortalProps) => {
  const { getPortalProps } = useDialogContext();
  return (
    <Portal {...getPortalProps()} {...props}>
      {children}
    </Portal>
  );
};

export default DialogPortal;
