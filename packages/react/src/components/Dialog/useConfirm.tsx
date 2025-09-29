import { useCallback, useRef, useState } from 'react';
import Modal from './Modal.container';
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
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Backdrop />
        <Modal.Positioner>
          <Modal.Content role="alertdialog">
            <Modal.CloseTrigger
              onClick={() => {
                callbackRef.current.resolve();
              }}
            />
            <Modal.Title>{params.title}</Modal.Title>
            {params.description && <Modal.Description>{params.description}</Modal.Description>}
            <Modal.Action>
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
            </Modal.Action>
          </Modal.Content>
        </Modal.Positioner>
      </Modal.Portal>
    </Modal.Root>
  );
  return [node, onOpen] as const;
}
