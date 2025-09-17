import { Button } from '../imports';
import type { StoryObj } from '@storybook/react-vite';

export const Shape: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Button shape="rounded">Rounded</Button>
      <Button shape="square">Square</Button>
      <Button shape="pill">Pill</Button>
    </div>
  ),
};
