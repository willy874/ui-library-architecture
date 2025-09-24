import { DialogProvider, type DialogContextProps } from '../core/context';

export interface DialogRootProps extends DialogContextProps {
  children?: React.ReactNode;
}

function DialogRoot({ children, ...props }: DialogRootProps) {
  return <DialogProvider value={props}>{children}</DialogProvider>;
}

export default DialogRoot;
