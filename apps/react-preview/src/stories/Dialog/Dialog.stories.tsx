import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog, AskingQuestionImage } from './imports';

const meta = {
  title: 'Example/Dialog',
  component: Dialog,
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
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: () => {
    return (
      <Dialog
        triggerNode="Open Dialog"
        descriptionNode="This is a description of the dialog."
        titleNode="Dialog Title"
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img width="160" height="160" src={AskingQuestionImage} alt="" />
        </div>
      </Dialog>
    );
  },
};

export { Control } from './examples/control';
export { ActionBar } from './examples/action-bar';
export { ConfirmHook } from './examples/confirm';
export { Position } from './examples/position';
