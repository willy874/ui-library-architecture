import { createServiceContext } from '@/utils/create-service-context';
import { useDialogService, type UseDialogServiceReturn } from './service';

export interface DialogContextValue extends UseDialogServiceReturn {}

export const DialogContext = createServiceContext(useDialogService);
