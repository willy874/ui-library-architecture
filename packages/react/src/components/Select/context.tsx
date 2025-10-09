import { createContext } from 'react'
import type { HTMLProps } from '@/utils/factory'

export interface SelectContextValue extends HTMLProps<'select'> {
  ref?: React.Ref<HTMLSelectElement>
}

export const SelectContext = createContext<SelectContextValue | undefined>(undefined)