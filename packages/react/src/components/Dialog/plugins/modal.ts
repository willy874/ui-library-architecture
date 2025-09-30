import { isBrowser } from '@/utils/is';
import { watch } from '@/utils/proxy';
import type { DialogPluginFactory } from '../core/type';

export const modalPlugin: DialogPluginFactory = ({ state, getPart }) => {
  let target: HTMLElement | null = null;
  const setPosition = (el: HTMLElement) => {
    const current = getPart('content');
    if (!current) {
      throw new Error('Dialog content is not found.');
    }
    const currentWidth = current.clientWidth;
    const currentHeight = current.clientHeight;
    const parentWidth = el.clientWidth;
    const parentHeight = el.clientHeight;
    const centerX = Math.max(state.edgeOffset, (parentWidth - currentWidth) / 2);
    const centerY = Math.max(state.edgeOffset, (parentHeight - currentHeight) / 2);
    const bottomY = parentHeight - currentHeight - state.edgeOffset;
    const rightX = parentWidth - currentWidth - state.edgeOffset;
    let x = centerX;
    let y = centerY;
    if (state.position === 'center') {
      x = centerX;
      y = centerY;
    }
    if (state.position === 'top-center') {
      x = centerX;
      y = state.edgeOffset;
    }
    if (state.position === 'bottom-center') {
      x = centerX;
      y = bottomY;
    }
    if (state.position === 'top-left') {
      x = state.edgeOffset;
      y = state.edgeOffset;
    }
    if (state.position === 'left-center') {
      x = state.edgeOffset;
      y = centerY;
    }
    if (state.position === 'bottom-left') {
      x = state.edgeOffset;
      y = bottomY;
    }
    if (state.position === 'top-right') {
      x = rightX;
      y = state.edgeOffset;
    }
    if (state.position === 'right-center') {
      x = rightX;
      y = centerY;
    }
    if (state.position === 'bottom-right') {
      x = rightX;
      y = bottomY;
    }
    current.style.setProperty(
      'transform',
      `translate(var(--dialog-transform-x), var(--dialog-transform-y))`,
    );
    el.style.setProperty('--dialog-transform-x', `${x}px`);
    el.style.setProperty('--dialog-transform-y', `${y}px`);
  };
  const onResize = () => {
    if (!target) return;
    setPosition(target);
  };
  if (!isBrowser()) {
    return {};
  }
  const stateWatchers = [
    watch(
      () => state.position,
      () => {
        if (!target) return;
        setPosition(target);
      },
    ),
    watch(
      () => state.edgeOffset,
      () => {
        if (!target) return;
        setPosition(target);
      },
    ),
  ];
  return {
    onBeforeOpen: () => {
      target = getPart('positioner');
      if (!target) return;
      window.addEventListener('resize', onResize);
      setPosition(target);
    },
    onAfterClose: () => {
      target = null;
      window.removeEventListener('resize', onResize);
      stateWatchers.forEach((clearup) => clearup());
    },
  };
};
