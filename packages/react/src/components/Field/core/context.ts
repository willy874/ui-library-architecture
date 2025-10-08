import { createMachineContext } from '@/utils/create-machine-context';
import { useFieldService, type UseFieldServiceReturn } from './service';

export interface FieldContextValue extends UseFieldServiceReturn {}

export const FieldContext = createMachineContext(useFieldService);
