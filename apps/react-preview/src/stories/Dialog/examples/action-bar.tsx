import type { StoryObj } from '@storybook/react-vite';
import { Modal, useDialogContext, Button, AskingQuestionImage } from '../imports';

const ActionBarComponent = () => {
  const { emitClose } = useDialogContext();
  const onConfirm = () => {
    Promise.resolve().then(() => {
      emitClose();
    });
  };
  return (
    <>
      <Button variant="outlined" onClick={() => emitClose()}>
        Cancel
      </Button>
      <Button onClick={onConfirm}>Confirm</Button>
    </>
  );
};

export const ActionBar: StoryObj = {
  render: () => {
    const args = {
      triggerNode: 'Open Dialog',
      titleNode: 'Dialog Title',
      descriptionNode: 'This is a description of the dialog.',
      actionNode: <ActionBarComponent />,
    };
    return (
      <Modal {...args}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img width="160" height="160" src={AskingQuestionImage} alt="" />
        </div>
      </Modal>
    );
  },
};
