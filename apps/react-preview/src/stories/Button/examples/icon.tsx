import { Button, PlusIcon, SendIcon } from '../imports';
import type { StoryObj } from '@storybook/react-vite';

export const Icon: StoryObj = {
  render: (args: any) => (
    <Button {...args}>
      <PlusIcon style={{ fontSize: '20px' }} />
      Button
      <SendIcon style={{ fontSize: '20px' }} />
    </Button>
  ),
};

export const IconButton: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
      <div></div>
      <div>
        <Button variant="text">Filled</Button>
      </div>
      <div>
        <Button variant="text">Outlined</Button>
      </div>
      <div>
        <Button variant="text">Text</Button>
      </div>
      <div>
        <Button variant="text">Primary</Button>
      </div>
      <div>
        <Button variant="filled" theme="primary" space="icon">
          <SendIcon />
        </Button>
      </div>
      <div>
        <Button variant="outlined" theme="primary" space="icon">
          <SendIcon />
        </Button>
      </div>
      <div>
        <Button variant="text" theme="primary" space="icon">
          <SendIcon />
        </Button>
      </div>
      <div>
        <Button variant="text">Primary Blue</Button>
      </div>
      <div>
        <Button variant="filled" theme="primaryBlue" space="icon">
          <SendIcon />
        </Button>
      </div>
      <div>
        <Button variant="outlined" theme="primaryBlue" space="icon">
          <SendIcon />
        </Button>
      </div>
      <div>
        <Button variant="text" theme="primaryBlue" space="icon">
          <SendIcon />
        </Button>
      </div>
      <div>
        <Button variant="text">Secondary</Button>
      </div>
      <div>
        <Button variant="filled" theme="secondary" space="icon">
          <SendIcon />
        </Button>
      </div>
      <div>
        <Button variant="outlined" theme="secondary" space="icon">
          <SendIcon />
        </Button>
      </div>
      <div>
        <Button variant="text" theme="secondary" space="icon">
          <SendIcon />
        </Button>
      </div>
    </div>
  ),
};
