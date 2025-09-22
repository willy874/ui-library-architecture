import { useEffect, useMemo, useRef } from 'react';
import { EventEmitter } from '@/utils/events';

export function useEvents<T extends Record<string, (...args: any[]) => unknown>>(
  init: () => T,
): { [K in keyof T]: (...args: Parameters<T[K]>) => void } {
  const emitterRef = useRef(new EventEmitter());
  const dictRef = useRef(init());

  useEffect(() => {
    const dict = init();
    dictRef.current = dict;
    const destructors: (() => void)[] = [];
    for (const key in dict) {
      destructors.push(emitterRef.current.on(key, (...args: any[]) => dict[key](...args)));
    }
    return () => destructors.forEach((d) => d());
  }, [init]);

  return useMemo(() => {
    const dict = dictRef.current;
    const result = {} as T;
    for (const key in dict) {
      Reflect.set(result, key, (...args: unknown[]) => {
        emitterRef.current.emit(key, ...(args as any));
      });
    }
    return result;
  }, []);
}
