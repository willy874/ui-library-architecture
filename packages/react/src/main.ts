import './global.css';
export * from './components/Input';
export * from './components/Field';

export async function setupStyles(getRootNode?: () => Document | ShadowRoot | HTMLElement) {
  const module = await import('./global.css?inline');
  const style = document.createElement('style');
  style.textContent = module.default;
  const node = getRootNode ? getRootNode() : document.head;
  node.appendChild(style);
}
