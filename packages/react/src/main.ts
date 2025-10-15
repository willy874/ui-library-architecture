import './global.css';
export * from './containers/Dialog';
export * from './containers/Field';
export * from './containers/Button';

const UI_TAG = 'data-ui-library-architecture';

export async function setupStyles(getRootNode?: () => Document | ShadowRoot | HTMLElement) {
  const hasTag = document.querySelector(`style[${UI_TAG}]`);
  if (hasTag) {
    return;
  }
  const module = await import('./global.css?inline');
  const style = document.createElement('style');
  style.textContent = module.default;
  style.setAttribute(UI_TAG, '');
  const node = getRootNode ? getRootNode() : document.head;
  node.appendChild(style);
}

export { splitProps } from '@/utils/splitProps';
export { ui } from '@/utils/factory';
export { useForkRef } from '@/utils/hooks/composeRefs';
export type { DefaultHTMLProps, HTMLProps } from '@/utils/factory';
