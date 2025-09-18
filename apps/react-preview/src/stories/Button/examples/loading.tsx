import { Button, Spin } from '../imports';
import type { StoryObj } from '@storybook/react-vite';

export const Loading: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button>Button</Button>
      <Button loading>Button</Button>
      <Button>
        <Spin />
        <span>Button</span>
      </Button>
    </div>
  ),
};
