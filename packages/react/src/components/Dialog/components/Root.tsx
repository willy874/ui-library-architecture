import { DialogProvider, type DialogContextProps } from '../Dialog.context';

export interface DialogRootProps extends DialogContextProps {
  children?: React.ReactNode;
}

function Root({ children, ...props }: DialogRootProps) {
  return <DialogProvider value={props}>{children}</DialogProvider>;
}

export default Root;
