import type { DialogPluginFactory } from '../core/type';

const reflow = (node: HTMLElement) => node.getBoundingClientRect();

export const fadeInPlugin: DialogPluginFactory = () => ({
  onBeforeOpen: ({ element, next }) => {
    if (!element) return;
    element.style.opacity = '0';
    element.style.transition = 'opacity 200ms';
    reflow(element);
    element.style.opacity = '1';
    element.addEventListener(
      'transitionend',
      () => {
        next();
      },
      { once: true },
    );
  },
  onAfterOpen: ({ element }) => {
    if (!element) return;
    element.style.opacity = '';
    element.style.transition = '';
  },
  onBeforeClose: ({ element, next }) => {
    if (!element) return;
    element.style.opacity = '1';
    element.style.transition = 'opacity 200ms';
    reflow(element);
    element.style.opacity = '0';
    element.addEventListener(
      'transitionend',
      () => {
        next();
      },
      { once: true },
    );
  },
  onAfterClose: ({ element }) => {
    if (!element) return;
    element.style.opacity = '';
    element.style.transition = '';
  },
});
