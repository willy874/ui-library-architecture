import { EventPhase } from './abstract'
import { type EmitterEventInit } from './abstract'

export class EmitterEvent<T = unknown> {
  readonly bubbles: boolean = false
  readonly defaultPrevented: boolean = false
  readonly immediateCancelBubble: boolean = false
  readonly cancelBubble: boolean = false
  readonly eventPhase: number = EventPhase.NONE
  readonly target: unknown | null = null
  readonly currentTarget: unknown | null = null
  readonly timeStamp: DOMHighResTimeStamp = Date.now()
  readonly type: string = ''
  readonly effectTarget: unknown[] = []
  context?: T

  constructor(type: string, init: EmitterEventInit<T> = {}) {
    this.type = type
    this.context = init.context
  }

  preventDefault(): void {
    Object.assign(this, { defaultPrevented: true })
  }

  stopImmediatePropagation(): void {
    Object.assign(this, {
      cancelBubble: true,
      immediateCancelBubble: true,
    })
  }

  stopPropagation(): void {
    Object.assign(this, { cancelBubble: true })
  }

  readonly NONE = EventPhase.NONE
  readonly CAPTURING_PHASE = EventPhase.CAPTURING_PHASE
  readonly AT_TARGET = EventPhase.AT_TARGET
  readonly BUBBLING_PHASE = EventPhase.BUBBLING_PHASE
}

export default EmitterEvent
