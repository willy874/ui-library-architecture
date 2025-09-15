import { createContext } from '../create-context'
import type { RootNode } from '../types'

export interface UseEnvironmentContext {
  getRootNode(): RootNode
  getDocument(): Document
  getWindow(): Window & typeof globalThis
}

export const [EnvironmentContextProvider, useEnvironmentContext] = createContext<UseEnvironmentContext>({
  name: 'EnvironmentContext',
  hookName: 'useEnvironmentContext',
  providerName: '<EnvironmentProvider />',
  strict: false,
  defaultValue: {
    getRootNode: () => document,
    getDocument: () => document,
    getWindow: () => window,
  },
})
