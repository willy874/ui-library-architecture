import { useEffect, useRef, useState } from 'react';

export function useLoadingWidth<T extends HTMLElement>(
  loading?: boolean,
): {
  isShowSpin: boolean;
  ref: React.RefObject<T | null>;
} {
  const [isShowSpin, setIsShowSpin] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (loading === true) {
      const width = el.offsetWidth;
      el.style.width = `${width}px`;
      el.setAttribute('data-loading', 'true');
      setIsShowSpin(true);
    }
    if (loading === false && el.hasAttribute('data-loading')) {
      setIsShowSpin(false);
    }
  }, [loading]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isShowSpin === false && el.hasAttribute('data-loading')) {
      el.style.width = '';
      el.removeAttribute('data-loading');
    }
  }, [isShowSpin]);

  return { isShowSpin, ref };
}
