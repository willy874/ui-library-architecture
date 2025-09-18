import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from './imports';

const meta = {
  title: 'Example/Field',
  component: Field,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args: any) => (
    <Field {...args}>
      <Field.Input placeholder="Placeholder" />
    </Field>
  ),
};

export { Input } from './examples/input';
export { InputState } from './examples/input-state';
export { Select } from './examples/select';
export { Textarea } from './examples/textarea';
export { CustomInput, CustomInputLongMessage } from './examples/custom-input';
