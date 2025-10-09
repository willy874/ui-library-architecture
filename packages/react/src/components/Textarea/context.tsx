import { createContext } from 'react'
import type { HTMLProps } from '@/utils/factory'

export interface TextareaContextValue extends HTMLProps<'textarea'> {
  ref?: React.Ref<HTMLTextAreaElement>
}

export const TextareaContext = createContext<TextareaContextValue | undefined>(undefined)