import { EventEmitter as Emitter } from 'eventemitter3'
import type { AnyKey, Listener } from './abstract'

type ListenerDict = {
  [K in AnyKey]: Listener
}

export declare interface IEventEmitter<M extends ListenerDict = ListenerDict> {
  on<K extends keyof M>(event: K, listener: M[K]): () => void
  off<K extends keyof M>(event: K, listener: M[K]): void
  emit<K extends keyof M>(event: K, ...args: M[K] extends void ? [] : Parameters<M[K]>): void
}

export class EventEmitter<M extends ListenerDict = ListenerDict> implements IEventEmitter<M> {
  #instance = new Emitter()
  #dict = new Map<Listener, Listener>()

  on<K extends keyof M>(event: K, listener: M[K]): () => void {
    const mapKey = listener
    const callback = (...args: Parameters<M[K]>): void => {
      listener(...(args as Parameters<M[K]>))
    }
    this.#dict.set(mapKey, callback as Listener)
    this.#instance.on(event as AnyKey, callback)
    return () => {
      this.#instance.off(event as AnyKey, callback)
    }
  }

  off<K extends keyof M>(event: K, listener: M[K]): void {
    const mapKey = listener
    const callback = this.#dict.get(mapKey)
    if (callback) {
      this.#instance.off(event as AnyKey, callback)
    }
  }

  emit<K extends keyof M>(event: K, ...args: M[K] extends void ? [] : Parameters<M[K]>): void {
    this.#instance.emit(event as AnyKey, ...args)
  }
}
