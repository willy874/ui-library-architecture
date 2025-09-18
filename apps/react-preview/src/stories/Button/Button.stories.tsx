import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './imports';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    children: 'Button',
  },
};

export { Variant, VariantDisabled } from './examples/variant';

export { Shape } from './examples/shape';

export { Size } from './examples/size';

export { Icon, IconButton } from './examples/icon';

export { Loading } from './examples/loading';
