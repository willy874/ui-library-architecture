import { createMachineContext } from '@/utils/create-machine-context';
import { useDialogService, type UseDialogServiceReturn } from './service';

export interface DialogContextValue extends UseDialogServiceReturn {}

export const DialogContext = createMachineContext(useDialogService);
