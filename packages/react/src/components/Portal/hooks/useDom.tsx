import { createContext, useContext, useRef, useState } from 'react';
import { isBrowser } from '@/utils/is';
import { useInternalLayoutEffect } from '@/utils/hooks/useInternalLayoutEffect';

export type QueueCreate = (appendFunc: VoidFunction) => void;

export const OrderContext = createContext<QueueCreate | null>(null);

const EMPTY_LIST = [] as VoidFunction[];

/**
 * Will add `div` to document. Nest call will keep order
 * @param render Render DOM in document
 */
export default function useDom(render: boolean): [HTMLDivElement, QueueCreate] {
  const [ele] = useState<HTMLDivElement>(() => {
    if (!isBrowser()) {
      return null as unknown as HTMLDivElement;
    }
    return document.createElement('div');
  });

  const appendedRef = useRef(false);

  const queueCreate = useContext(OrderContext);
  const [queue, setQueue] = useState(EMPTY_LIST);

  const mergedQueueCreate =
    queueCreate ||
    (appendedRef.current
      ? undefined
      : (appendFn: VoidFunction) => {
          setQueue((origin) => {
            const newQueue = [appendFn, ...origin];
            return newQueue;
          });
        });

  useInternalLayoutEffect(() => {
    function append() {
      if (!ele.parentElement) {
        document.body.appendChild(ele);
      }
      appendedRef.current = true;
    }
    function cleanup() {
      ele.parentElement?.removeChild(ele);
      appendedRef.current = false;
    }

    if (render) {
      if (queueCreate) {
        queueCreate(append);
      } else {
        append();
      }
    } else {
      cleanup();
    }

    return cleanup;
  }, [ele]);

  useInternalLayoutEffect(() => {
    if (queue.length) {
      queue.forEach((appendFn) => appendFn());
      setQueue(EMPTY_LIST);
    }
  }, [queue]);

  return [ele, mergedQueueCreate!];
}
