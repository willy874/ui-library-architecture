import { createHookContext } from '@/utils/create-context'
import { useFieldService } from './Field.service'
import type { UseFieldServiceProps, UseFieldServiceReturn } from './Field.service'

export interface FieldContextProps extends UseFieldServiceProps {
  children?: React.ReactNode
}
export interface FieldContextValue extends UseFieldServiceReturn {}

export const [FieldProvider, useFieldContext] = createHookContext(useFieldService, {
  name: 'FieldContext',
  hookName: 'useFieldContext',
  providerName: '<FieldProvider />',
  strict: false,
})
