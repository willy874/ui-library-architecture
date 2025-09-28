import type { Meta, StoryObj } from '@storybook/react-vite';
import { defineDialog, AskingQuestionImage } from './imports';

const meta = {
  title: 'Example/Dialog',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dialog component that can be used to display content in a modal overlay. It supports various features such as trapping focus, preventing scroll, and more.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta;

export default meta;

const Dialog = defineDialog;
export const Base: StoryObj = {
  render: () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>This is a description of the dialog.</Dialog.Description>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img width="160" height="160" src={AskingQuestionImage} alt="" />
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
};

export { Control } from './examples/control';
export { ActionBar } from './examples/action-bar';
export { ConfirmHook } from './examples/confirm';
export { Position } from './examples/position';
