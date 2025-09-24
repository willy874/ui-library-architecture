import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { EventEmitter } from '@/utils/events';
import { LifecycleStates, LifecycleStatesCollection, NOOP } from '../core/constant';
import type { DialogState, LifeCycleParams } from '../core/type';
import { useRefEffect } from '../../../utils/hooks/useRefEffect';
import { useEvents } from '../../../utils/hooks/useEvents';

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

export interface UseDialogLifecycleParams {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (params: { open: boolean }) => void;
  context?: unknown;
  onBeforeOpen?: AnimationLifeCycles['onBeforeOpen'];
  onAfterOpen?: AnimationLifeCycles['onAfterOpen'];
  onBeforeClose?: AnimationLifeCycles['onBeforeClose'];
  onAfterClose?: AnimationLifeCycles['onAfterClose'];
}

export function useDialogLifecycle({
  defaultOpen,
  open: propOpen,
  onOpenChange = NOOP,
  onBeforeOpen = NOOP,
  onAfterOpen = NOOP,
  onBeforeClose = NOOP,
  onAfterClose = NOOP,
}: UseDialogLifecycleParams) {
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
    (state: number, to?: number) => {
      if (to) return to;
      return state + 1;
    },
    initOpenState() ? LifecycleStates.OPEN : LifecycleStates.CLOSE,
  );

  const open = useMemo(() => {
    return LifecycleStates.PRE_OPEN >= state && state <= LifecycleStates.PRE_CLOSE;
  }, [state]);

  const refCallback = useRefEffect(
    (node) => {
      const currentState: DialogState = Reflect.get(LifecycleStatesCollection.name, state);
      emitterRef.current.emit(currentState, node);
    },
    [state],
  );

  const emitOpen = useCallback(() => {
    if (state === LifecycleStates.CLOSE) {
      onOpenChange({ open: true });
      nextState();
    }
  }, [nextState, onOpenChange, state]);

  const emitClose = useCallback(() => {
    if (state === LifecycleStates.OPEN) {
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
    if (!propOpen && open && LifecycleStates.OPEN) {
      emitClose();
    }
    if (propOpen && !open && LifecycleStates.CLOSE) {
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
}
