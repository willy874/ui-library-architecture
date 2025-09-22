import { Button, useConfirm } from '../imports';

export const ConfirmHook = () => {
  const [node, onOpen] = useConfirm({
    title: 'Dialog Title',
    confirmText: 'Confirm',
  });
  return (
    <>
      <Button onClick={onOpen}>Open Dialog</Button>
      {node}
    </>
  );
};
