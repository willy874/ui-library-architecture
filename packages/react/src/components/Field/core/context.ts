import { createServiceContext } from '@/utils/create-service-context';
import { useFieldService, type UseFieldServiceReturn } from './service';

export interface FieldContextValue extends UseFieldServiceReturn {}

export const FieldContext = createServiceContext(useFieldService);
