import { useCallback, useRef, useState } from 'react';
import Dialog from './Dialog.container';
import { Button } from './widgets/imports';

const NOOP = () => {};

interface ContextValues {
  isCancel: boolean;
  isConfirm: boolean;
}
interface CallbackValues {
  resolve: () => void;
  reject: (reason?: unknown) => void;
}

const getDefaultContext = (): ContextValues => ({
  isCancel: false,
  isConfirm: false,
});

export interface UseConfirmParams {
  title: React.ReactNode;
  confirmText: React.ReactNode;
  description?: React.ReactNode;
  cancelText?: React.ReactNode;
}
export function useConfirm(
  params: UseConfirmParams,
): [React.ReactNode, () => Promise<ContextValues>] {
  const callbackRef = useRef<CallbackValues>({
    resolve: NOOP,
    reject: NOOP,
  });
  const contextRef = useRef(getDefaultContext());
  const [open, setOpen] = useState(false);
  const onOpenChange = useCallback(({ open }: { open: boolean }) => {
    setOpen(open);
  }, []);
  const onOpen = useCallback(() => {
    contextRef.current = getDefaultContext();
    setOpen(true);
    return new Promise<ContextValues>((resolve, reject) => {
      callbackRef.current.resolve = () => resolve(contextRef.current);
      callbackRef.current.reject = reject;
    });
  }, []);
  const node = (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content role="alertdialog">
            <Dialog.CloseTrigger
              onClick={() => {
                callbackRef.current.resolve();
              }}
            />
            <Dialog.Title>{params.title}</Dialog.Title>
            {params.description && <Dialog.Description>{params.description}</Dialog.Description>}
            <Dialog.Action>
              {params.cancelText && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpen(false);
                    contextRef.current.isCancel = true;
                    callbackRef.current.resolve();
                  }}
                >
                  {params.cancelText}
                </Button>
              )}
              <Button
                onClick={() => {
                  setOpen(false);
                  contextRef.current.isConfirm = true;
                  callbackRef.current.resolve();
                }}
              >
                {params.confirmText}
              </Button>
            </Dialog.Action>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Portal>
    </Dialog.Root>
  );
  return [node, onOpen] as const;
}
