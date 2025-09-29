import { Button, useConfirm } from '../imports';

export const ConfirmHook = () => {
  const [node, onOpen] = useConfirm({
    title: 'Confirm Title',
    confirmText: 'Confirm',
  });
  return (
    <>
      <Button onClick={onOpen}>Open Confirm</Button>
      {node}
    </>
  );
};
