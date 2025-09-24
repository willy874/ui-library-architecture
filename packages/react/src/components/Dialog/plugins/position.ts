import { isBrowser } from '@/utils/is';
import type { DialogPluginFactory } from '../core/type';

const DEFAULT_POSITION_SPACE = 20;

export const positionPlugin: DialogPluginFactory = ({ state, getPart }) => {
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
    const centerX = Math.max(DEFAULT_POSITION_SPACE, (parentWidth - currentWidth) / 2);
    const centerY = Math.max(DEFAULT_POSITION_SPACE, (parentHeight - currentHeight) / 2);
    const bottomY = parentHeight - currentHeight - DEFAULT_POSITION_SPACE;
    const rightX = parentWidth - currentWidth - DEFAULT_POSITION_SPACE;
    let x = centerX;
    let y = centerY;
    if (state.position === 'center') {
      x = centerX;
      y = centerY;
    }
    if (state.position === 'top') {
      x = centerX;
      y = DEFAULT_POSITION_SPACE;
    }
    if (state.position === 'bottom') {
      x = centerX;
      y = bottomY;
    }
    if (state.position === 'top-left') {
      x = DEFAULT_POSITION_SPACE;
      y = DEFAULT_POSITION_SPACE;
    }
    if (state.position === 'left-center') {
      x = DEFAULT_POSITION_SPACE;
      y = centerY;
    }
    if (state.position === 'bottom-left') {
      x = DEFAULT_POSITION_SPACE;
      y = bottomY;
    }
    if (state.position === 'top-right') {
      x = rightX;
      y = DEFAULT_POSITION_SPACE;
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
  return {
    onStateUpdate: ({ type, value }) => {
      if (type === 'position' && !Object.is(value, state.position)) {
        state.position = value;
        if (target) {
          setPosition(target);
        }
      }
    },
    onBeforeOpen: ({ element }) => {
      target = element;
      if (!target) return;
      window.addEventListener('resize', onResize);
      setPosition(target);
    },
    onAfterClose: () => {
      target = null;
      window.removeEventListener('resize', onResize);
    },
  };
};
