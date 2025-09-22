import { useRef } from 'react';

export function useRefEffect(
  callback: (node: HTMLElement | null) => (() => void) | void,
  deps: React.DependencyList,
): React.Ref<HTMLElement> {
  const ref = useRef<HTMLElement>(null);
  const listenerRef = useRef<(node: HTMLElement | null) => void>(() => {});
  const prevDepsRef = useRef<React.DependencyList>([]);
  const firstRef = useRef(true);

  listenerRef.current = (node) => {
    const prevDeps: React.DependencyList = prevDepsRef.current;
    if (firstRef.current) {
      firstRef.current = false;
      callback(node);
      return;
    }
    if (!node) {
      return;
    }
    let isChange = false;
    for (let index = 0; index < deps.length; index++) {
      const value = deps[index];
      if (Object.is(value, prevDeps[index])) {
        continue;
      }
      isChange = true;
      Reflect.set(prevDeps, index, value);
    }
    if (isChange) {
      callback(node);
    }
  };

  return (node: HTMLElement | null) => {
    listenerRef.current(node);
    ref.current = node;
  };
}
