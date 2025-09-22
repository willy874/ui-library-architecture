import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import type { DialogState, LifeCycleParams } from '../Dialog.type';
import { EventEmitter } from '@/utils/events';
import { useRefEffect } from './useRefEffect';
import { useEvents } from './useEvents';

export const NOOP = () => {};

export interface AnimationLifeCycleParams {
  element: LifeCycleParams['element'];
  next: LifeCycleParams['next'];
}

export interface AnimationLifeCycles {
  onBeforeOpen?: (params: AnimationLifeCycleParams) => void;
  onAfterOpen?: (params: AnimationLifeCycleParams) => void;
  onBeforeClose?: (params: AnimationLifeCycleParams) => void;
  onAfterClose?: (params: AnimationLifeCycleParams) => void;
}

export interface UseOpenAnimationParams {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (params: { open: boolean }) => void;
  context?: unknown;
  onBeforeOpen?: AnimationLifeCycles['onBeforeOpen'];
  onAfterOpen?: AnimationLifeCycles['onAfterOpen'];
  onBeforeClose?: AnimationLifeCycles['onBeforeClose'];
  onAfterClose?: AnimationLifeCycles['onAfterClose'];
}

export const useOpenAnimation = ({
  defaultOpen,
  open: propOpen,
  onOpenChange = NOOP,
  onBeforeOpen = NOOP,
  onAfterOpen = NOOP,
  onBeforeClose = NOOP,
  onAfterClose = NOOP,
}: UseOpenAnimationParams) => {
  const initOpenState = () => {
    if (typeof defaultOpen !== 'undefined') {
      return defaultOpen;
    }
    return !!propOpen;
  };

  const emitterRef = useRef(
    new EventEmitter<{ [K in DialogState]: (el: HTMLElement | null) => void }>(),
  );

  const events = useEvents(() => ({
    onOpenChange,
    onBeforeOpen,
    onAfterOpen,
    onBeforeClose,
    onAfterClose,
  }));

  const [state, nextState] = useReducer(
    (state: DialogState, to?: DialogState) => {
      if (to) return to;
      if (state === 'pre-open') return 'open-animating';
      if (state === 'open-animating') return 'open';
      if (state === 'open') return 'close-animating';
      if (state === 'close-animating') return 'pre-close';
      if (state === 'pre-close') return 'close';
      if (state === 'close') return 'pre-open';
      return state;
    },
    initOpenState() ? 'open' : 'close',
  );

  const open = useMemo(() => {
    return ['pre-open', 'open-animating', 'open', 'close-animating', 'pre-close'].includes(state);
  }, [state]);

  const refCallback = useRefEffect(
    (node) => {
      emitterRef.current.emit(state, node);
    },
    [state],
  );

  const emitOpen = useCallback(() => {
    if (state === 'close') {
      onOpenChange({ open: true });
      nextState();
    }
  }, [nextState, onOpenChange, state]);

  const emitClose = useCallback(() => {
    if (state === 'open') {
      onOpenChange({ open: false });
      nextState();
    }
  }, [nextState, onOpenChange, state]);

  useEffect(() => {
    const next = () => nextState();
    const listeners = [
      emitterRef.current.on('pre-open', () => {
        nextState();
      }),
      emitterRef.current.on('open-animating', (node) => {
        events.onBeforeOpen({ element: node, next });
      }),
      emitterRef.current.on('open', (node) => {
        events.onAfterOpen({ element: node, next });
      }),
      emitterRef.current.on('close-animating', (node) => {
        events.onBeforeClose({ element: node, next });
      }),
      emitterRef.current.on('pre-close', () => {
        nextState();
      }),
      emitterRef.current.on('close', (node) => {
        events.onAfterClose({ element: node, next });
      }),
    ];
    return () => listeners.forEach((l) => l());
  }, [events, nextState, state]);

  useEffect(() => {
    if (typeof propOpen === 'undefined') {
      return;
    }
    if (!propOpen && open && state === 'open') {
      emitClose();
    }
    if (propOpen && !open && state === 'close') {
      emitOpen();
    }
  }, [emitClose, emitOpen, open, propOpen, state]);

  const emitOpenChange = useCallback(
    (value: boolean) => {
      if (value) {
        emitOpen();
      } else {
        emitClose();
      }
    },
    [emitClose, emitOpen],
  );

  return {
    open,
    state,
    emitOpenChange,
    ref: refCallback,
  };
};
