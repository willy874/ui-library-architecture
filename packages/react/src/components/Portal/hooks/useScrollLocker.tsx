import { useState } from 'react';
import { getTargetScrollBarSize } from '../utils/getScrollBarSize';
import { removeCSS, updateCSS } from '@/utils/dynamicCSS';
import { useInternalLayoutEffect } from '@/utils/hooks/useInternalLayoutEffect';

const UNIQUE_ID = `rc-util-locker-${Date.now()}`;

let uuid = 0;

function isBodyOverflowing() {
  return (
    document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) &&
    window.innerWidth > document.body.offsetWidth
  );
}

export default function useScrollLocker(lock?: boolean) {
  const mergedLock = !!lock;
  const [id] = useState(() => {
    uuid += 1;
    return `${UNIQUE_ID}_${uuid}`;
  });
  useInternalLayoutEffect(() => {
    if (mergedLock) {
      const scrollbarSize = getTargetScrollBarSize(document.body).width;
      const isOverflow = isBodyOverflowing();

      updateCSS(
        `
html body {
  overflow-y: hidden;
  ${isOverflow ? `width: calc(100% - ${scrollbarSize}px);` : ''}
}`,
        id,
      );
    } else {
      removeCSS(id);
    }

    return () => {
      removeCSS(id);
    };
  }, [mergedLock, id]);
}
