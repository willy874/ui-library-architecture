import { useMemo } from 'react'
import type { Ref } from 'react'

type PossibleRef<T> = Ref<T | null> | undefined

export function composeRefs<T>(...refs: PossibleRef<T>[]): (node: T | null) => void {
  return (node) => {
    const cleanUps: VoidFunction[] = []

    for (const ref of refs) {
      if (typeof ref === 'function') {
        const cb = ref(node)
        if (typeof cb === 'function') {
          cleanUps.push(cb)
        }
      }
      else if (ref) {
        ref.current = node
      }
    }

    if (cleanUps.length) {
      return () => {
        for (const cleanUp of cleanUps) {
          cleanUp()
        }
      }
    }
  }
}

export function useForkRef<Instance>(
  ...refs: Array<React.Ref<Instance> | undefined>
): React.RefCallback<Instance> | undefined {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => composeRefs(...refs), refs)
}
