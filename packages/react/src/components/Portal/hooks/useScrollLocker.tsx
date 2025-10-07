import { useState } from 'react';
import { getTargetScrollBarSize } from '../utils/getScrollBarSize';
import { removeCSS, updateCSS } from '@/utils/dynamicCSS';
import { useInternalLayoutEffect } from '@/utils/hooks/useInternalLayoutEffect';
import { useEnvironmentContext } from '@/utils/hooks/useEnvironmentContext';
import type { EnvironmentContext } from '@/utils/environment-context';

const UNIQUE_ID = `rc-util-locker-${Date.now()}`;

let uuid = 0;

function isBodyOverflowing(environment: EnvironmentContext) {
  const document = environment.getDocument();
  const window = environment.getWindow();
  return (
    document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) &&
    window.innerWidth > document.body.offsetWidth
  );
}

export default function useScrollLocker(lock?: boolean) {
  const environment = useEnvironmentContext();
  const mergedLock = !!lock;
  const [id] = useState(() => {
    uuid += 1;
    return `${UNIQUE_ID}_${uuid}`;
  });
  useInternalLayoutEffect(() => {
    if (mergedLock) {
      const scrollbarSize = getTargetScrollBarSize(document.body).width;
      const isOverflow = isBodyOverflowing(environment);

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
