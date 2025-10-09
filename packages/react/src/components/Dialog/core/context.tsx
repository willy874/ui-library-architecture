import { createMachineContext } from '@/utils/create-machine-context';
import { useDialogService } from './service';
import type { UseDialogServiceReturn } from './service';

export interface DialogContextValue extends UseDialogServiceReturn {}

export const DialogContext = createMachineContext(useDialogService);
