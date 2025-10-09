import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, AskingQuestionImage } from './imports';

const meta = {
  title: 'Example/Modal',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modal component that can be used to display content in a modal overlay. It supports various features such as trapping focus, preventing scroll, and more.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta;

export default meta;

export const Base: StoryObj = {
  render: () => {
    return (
      <Modal
        titleNode="Modal Title"
        descriptionNode="This is a description of the modal."
        triggerNode="Open Modal"
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img width="160" height="160" src={AskingQuestionImage} alt="" />
        </div>
      </Modal>
    );
  },
};

export { Control } from './examples/control';
export { Position } from './examples/position';
