import { createHookContext } from '@/utils/create-context';
import { useDialogService } from './Dialog.service';
import type { UseDialogServiceProps, UseDialogServiceReturn } from './Dialog.service';

export interface DialogContextProps extends UseDialogServiceProps {
  children?: React.ReactNode;
}
export interface DialogContextValue extends UseDialogServiceReturn {}

export const [DialogProvider, useDialogContext] = createHookContext(useDialogService, {
  name: 'DialogContext',
  hookName: 'useDialogContext',
  providerName: '<DialogProvider />',
  strict: false,
});
