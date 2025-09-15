import { EventEmitter as Emitter } from 'eventemitter3'
import EmitterEvent from './EmitterEvent'
import { EventPhase } from './abstract'
import type { AnyKey } from './abstract'

type ListenerDict = {
  [K in AnyKey]: EmitterEvent
}

type EventListener = (event: EmitterEvent) => void

export class EventBus<M extends ListenerDict = ListenerDict> {
  #instance = new Emitter()
  #dict = new Map<EventListener, EventListener>()

  readonly parent: EventBus | null = null
  readonly children: EventBus[] = []

  constructor(parent: EventBus | null = null) {
    this.parent = parent
    if (parent) {
      Object.assign(parent, { children: [...parent.children, this] })
    }
  }

  addEventListener<T extends AnyKey>(type: T, listener: (event: M[T]) => void): void {
    const mapKey = listener as EventListener
    const callback = (event: EmitterEvent) => {
      if (event.immediateCancelBubble) return
      listener(event as M[T])
    }
    this.#dict.set(mapKey, callback)
    this.#instance.on(type as AnyKey, callback)
  }

  removeEventListener<T extends AnyKey>(type: T, listener: (event: M[T]) => void): void {
    const mapKey = listener as EventListener
    const callback = this.#dict.get(mapKey)
    if (callback) {
      this.#instance.off(type as AnyKey, callback)
      this.#dict.delete(mapKey)
    }
  }

  dispatchEvent<T extends AnyKey>(event: M[T], options?: { captured?: boolean, bubble?: boolean }): boolean {
    if (event instanceof EmitterEvent === false) {
      throw new Error('Invalid event object')
    }
    const { captured, bubble } = options || {}
    Object.assign(event, {
      eventPhase: EventPhase.AT_TARGET,
      timeStamp: Date.now(),
      target: event.target ?? this,
      currentTarget: this,
    })
    this.#instance.emit(event.type as AnyKey, event)
    const returnValue = !event.defaultPrevented
    if (captured && this.children.length) {
      Object.assign(event, { eventPhase: EventPhase.CAPTURING_PHASE })
      for (const child of this.children) {
        child.dispatchEvent(event, { captured: true })
      }
      return returnValue
    }
    if (bubble && this.parent) {
      if (event.cancelBubble) return returnValue
      Object.assign(event, { eventPhase: EventPhase.BUBBLING_PHASE })
      if (event.effectTarget.includes(this.parent)) {
        return returnValue
      }
      this.parent.dispatchEvent(event, { bubble: true })
      Object.assign(event, { effectTarget: [...event.effectTarget, this.parent] })
    }
    else {
      Object.assign(event, { eventPhase: EventPhase.AT_TARGET })
    }
    return returnValue
  }

  append(...targets: EventBus[]): void {
    for (const target of targets) {
      Object.assign(target, { parent: this })
      Object.assign(this, { children: [...this.children, target] })
    }
  }
}

export default EventBus
