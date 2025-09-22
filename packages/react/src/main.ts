import './global.css';
export * from './components/Input';
export * from './components/Field';
export * from './components/Button';
export * from './components/Dialog';

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
