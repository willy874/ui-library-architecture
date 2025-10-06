import { Children, forwardRef, useEffect, useState, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { getNodeRef, isBrowser, supportRef } from '../../utils/is';
import useScrollLocker from './hooks/useScrollLocker';
import useDom, { OrderContext } from './hooks/useDom';
import { useForkRef } from '@/utils/hooks/composeRefs';
import { useEnvironmentContext } from '@/utils/hooks/useEnvironmentContext';
import type { GetContainer } from '@/utils/types';
import { environmentContext } from '@/utils/environment-context';

export interface PortalProps {
  getRootNode?: GetContainer;
  children?: React.ReactNode;
  open?: boolean;
  autoDestroy?: boolean;
  autoLock?: boolean;
}

const getPortalContainer = (
  getContainer: GetContainer,
  environment = environmentContext,
): Element | DocumentFragment | false => {
  const document = environment.getDocument();

  if (getContainer === false) {
    return false;
  }

  if (!isBrowser() || !getContainer) {
    return false;
  }

  if (typeof getContainer === 'string') {
    return (document.querySelector(getContainer) as Element) || false;
  }
  const container = typeof getContainer === 'function' ? getContainer() : getContainer;

  if (document === container) {
    return document.body;
  }
  if (container instanceof DocumentFragment) {
    return container as DocumentFragment;
  }
  if (container instanceof Element) {
    return container as Element;
  }
  return false;
};

const Portal = forwardRef<unknown, PortalProps>((props, ref) => {
  const { open, autoLock, getRootNode, autoDestroy = true, children } = props;
  const environment = useEnvironmentContext();
  const document = environment.getDocument();
  const [shouldRender, setShouldRender] = useState(open);
  const getContainer = getRootNode || environment.getRootNode;

  const mergedRender = shouldRender || open;

  useEffect(() => {
    if (autoDestroy || open) {
      setShouldRender(open);
    }
  }, [open, autoDestroy]);

  const [innerContainer, setInnerContainer] = useState<Element | DocumentFragment | false | null>(
    () => getPortalContainer(getContainer || false, environment),
  );

  useEffect(() => {
    const customizeContainer = getPortalContainer(getContainer || false, environment);
    setInnerContainer(customizeContainer ?? null);
  }, [getContainer]);

  const [defaultContainer, queueCreate] = useDom(Boolean(mergedRender && !innerContainer));
  const mergedContainer = innerContainer ?? defaultContainer;

  useScrollLocker(
    autoLock &&
      open &&
      isBrowser() &&
      (mergedContainer === defaultContainer || mergedContainer === document.body),
  );

  let childRef: React.Ref<unknown> = null;

  if (children && supportRef(children) && ref) {
    childRef = getNodeRef(children);
  }

  const mergedRef = useForkRef(childRef, ref);

  if (!mergedRender || !isBrowser() || innerContainer === undefined) {
    return null;
  }

  const reffedChildren = (() => {
    let node = children;
    if (!children) {
      return;
    }
    if (ref) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      node = cloneElement(children as any, { ref: mergedRef });
    }
    if (mergedContainer !== false) {
      if (ref) {
        node = createPortal(node, mergedContainer);
      } else {
        node = Children.map(children, (child) => createPortal(child, mergedContainer));
      }
    }
    return node;
  })();
  return <OrderContext.Provider value={queueCreate}>{reffedChildren}</OrderContext.Provider>;
});

export default Portal;
