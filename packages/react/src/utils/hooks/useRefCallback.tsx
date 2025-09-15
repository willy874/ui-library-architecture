import { useCallback, useRef } from 'react'

type AnyFunction = (...args: any[]) => any

export function useRefCallback<T extends AnyFunction>(cb: T): T {
  const ref = useRef(cb)
  ref.current = cb

  const result = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return ref.current(...args)
  }, [])

  return result as T
}
