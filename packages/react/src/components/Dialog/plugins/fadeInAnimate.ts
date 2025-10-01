import type { DialogPluginFactory } from '../core/type';

const reflow = (node: HTMLElement) => node.getBoundingClientRect();

export const fadeInPlugin: DialogPluginFactory = ({ getPart }) => ({
  onBeforeOpen: ({ next, preNext }) => {
    const target = getPart('positioner');
    if (!target) return;
    preNext();
    target.style.opacity = '0';
    target.style.transition = 'opacity 200ms';
    reflow(target);
    target.style.opacity = '1';
    target.addEventListener(
      'transitionend',
      () => {
        next();
      },
      { once: true },
    );
  },
  onAfterOpen: () => {
    const target = getPart('positioner');
    if (!target) return;
    target.style.opacity = '';
    target.style.transition = '';
  },
  onBeforeClose: ({ next, preNext }) => {
    const target = getPart('positioner');
    if (!target) return;
    preNext();
    target.style.opacity = '1';
    target.style.transition = 'opacity 200ms';
    reflow(target);
    target.style.opacity = '0';
    target.addEventListener(
      'transitionend',
      () => {
        next();
      },
      { once: true },
    );
  },
  onAfterClose: () => {
    const target = getPart('positioner');
    if (!target) return;
    target.style.opacity = '';
    target.style.transition = '';
  },
});
