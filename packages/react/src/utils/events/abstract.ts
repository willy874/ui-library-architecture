export interface EmitterEventInit<T = unknown> {
  context?: T
}

export const EventPhase = {
  NONE: 0,
  CAPTURING_PHASE: 1,
  AT_TARGET: 2,
  BUBBLING_PHASE: 3,
} as const

export type AnyKey = string | symbol

export type Listener = (...args: any[]) => void
