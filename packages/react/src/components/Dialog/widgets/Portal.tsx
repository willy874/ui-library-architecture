import { Portal, type PortalProps } from './imports';
import { useDialogContext } from '../core/context';

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

DialogPortal.displayName = 'DialogPortal';

export default DialogPortal;
