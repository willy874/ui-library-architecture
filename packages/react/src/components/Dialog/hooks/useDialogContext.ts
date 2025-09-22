import { useCallback } from 'react';
import { useDialogContext as useDialog } from '../Dialog.context';

type DialogOptions<T = unknown> = {
  context?: T;
};

export interface DialogContext<T = unknown> {
  emitOpen: (params?: DialogOptions<T>) => void;
  emitClose: (params?: DialogOptions<T>) => void;
}

export function useDialogContext<T = unknown>(): DialogContext<T> {
  const { onOpen, onClose, setContext } = useDialog();

  const emitOpen = useCallback(
    (params?: DialogOptions<T>) => {
      if (Object.prototype.hasOwnProperty.call(params || {}, 'context')) {
        setContext(params?.context);
      }
      onOpen();
    },
    [onOpen, setContext],
  );

  const emitClose = useCallback(
    (params?: DialogOptions<T>) => {
      if (Object.prototype.hasOwnProperty.call(params || {}, 'context')) {
        setContext(params?.context);
      }
      onClose();
    },
    [onClose, setContext],
  );

  return {
    emitOpen,
    emitClose,
  };
}
