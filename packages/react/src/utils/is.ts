import { isValidElement, version } from 'react';
import { ForwardRef, isMemo } from 'react-is';

const REACT_ELEMENT_TYPE_18 = Symbol.for('react.element');
const REACT_ELEMENT_TYPE_19 = Symbol.for('react.transitional.element');
const REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
const ReactMajorVersion = Number(version.split('.')[0]);

export const isBrowser = () =>
  !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Compatible with React 18 or 19 to check if node is a Fragment.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFragment(object: any) {
  return (
    // Base object type
    object &&
    typeof object === 'object' &&
    // React Element type
    (object.$$typeof === REACT_ELEMENT_TYPE_18 || object.$$typeof === REACT_ELEMENT_TYPE_19) &&
    // React Fragment type
    object.type === REACT_FRAGMENT_TYPE
  );
}

export function isReactElement(node: React.ReactNode) {
  return isValidElement(node) && !isFragment(node);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supportRef = (nodeOrComponent: any): boolean => {
  if (!nodeOrComponent) {
    return false;
  }

  // React 19 no need `forwardRef` anymore. So just pass if is a React element.
  if (isReactElement(nodeOrComponent) && ReactMajorVersion >= 19) {
    return true;
  }

  const type = isMemo(nodeOrComponent) ? nodeOrComponent.type.type : nodeOrComponent.type;

  // Function component node
  if (typeof type === 'function' && !type.prototype?.render && type.$$typeof !== ForwardRef) {
    return false;
  }

  // Class component
  if (
    typeof nodeOrComponent === 'function' &&
    !nodeOrComponent.prototype?.render &&
    nodeOrComponent.$$typeof !== ForwardRef
  ) {
    return false;
  }
  return true;
};

/**
 * In React 19. `ref` is not a property from node.
 * But a property from `props.ref`.
 * To check if `props.ref` exist or fallback to `ref`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNodeRef<T = any>(node: React.ReactNode): React.Ref<T> | null {
  if (node && isReactElement(node)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ele = node as any;

    // Source from:
    // https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/getReactNodeRef/getReactNodeRef.ts
    return Object.prototype.propertyIsEnumerable.call(ele.props, 'ref') ? ele.props.ref : ele.ref;
  }
  return null;
}
