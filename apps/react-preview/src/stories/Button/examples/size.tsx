import { Button, SendIcon } from '../imports';
import type { StoryObj } from '@storybook/react-vite';

export const Size: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
      <div></div>
      <div>
        <Button variant="text">Small</Button>
      </div>
      <div>
        <Button variant="text">Medium</Button>
      </div>
      <div>
        <Button variant="text">Large</Button>
      </div>
      <div>
        <Button variant="text">Text</Button>
      </div>
      <div>
        <Button size="small">Small</Button>
      </div>
      <div>
        <Button size="medium">Medium</Button>
      </div>
      <div>
        <Button size="large">Large</Button>
      </div>
      <div>
        <Button variant="text">Icon</Button>
      </div>
      <div>
        <Button size="small" icon>
          <SendIcon />
        </Button>
      </div>
      <div>
        <Button size="medium" icon>
          <SendIcon />
        </Button>
      </div>
      <div>
        <Button size="large" icon>
          <SendIcon />
        </Button>
      </div>
    </div>
  ),
};
