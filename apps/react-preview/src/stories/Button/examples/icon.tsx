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
    <div>
      <div
        style={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          padding: '24px',
        }}
      >
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
          <Button variant="filled" theme="primary" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="primary" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text" theme="primary" icon>
            <SendIcon />
          </Button>
        </div>

        <div>
          <Button variant="text">Secondary</Button>
        </div>
        <div>
          <Button variant="filled" theme="secondary" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="secondary" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text" theme="secondary" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text">neutral</Button>
        </div>
        <div>
          <Button variant="filled" theme="neutral" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="neutral" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text" theme="neutral" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text">info</Button>
        </div>
        <div>
          <Button variant="filled" theme="info" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="info" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text" theme="info" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text">success</Button>
        </div>
        <div>
          <Button variant="filled" theme="success" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="success" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text" theme="success" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text">warning</Button>
        </div>
        <div>
          <Button variant="filled" theme="warning" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="warning" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text" theme="warning" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text">danger</Button>
        </div>
        <div>
          <Button variant="filled" theme="danger" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="danger" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text" theme="danger" icon>
            <SendIcon />
          </Button>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          background: '#333',
          padding: '24px',
        }}
      >
        <div>
          <Button variant="text" style={{ color: '#fff' }}>
            tertiary
          </Button>
        </div>
        <div>
          <Button variant="filled" theme="tertiary" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="tertiary" icon>
            <SendIcon />
          </Button>
        </div>
        <div>
          <Button variant="text" theme="tertiary" icon>
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  ),
};
