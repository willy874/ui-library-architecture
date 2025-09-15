import { createContext } from 'react'
import { HTMLProps } from '@/utils/factory'

export interface InputContextValue extends HTMLProps<'input'> {
  ref?: React.Ref<HTMLInputElement>
}

export const InputContext = createContext<InputContextValue | undefined>(undefined)
