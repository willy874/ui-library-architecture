import { Button } from '../imports';
import type { StoryObj } from '@storybook/react-vite';

export const Variant: StoryObj = {
  render: () => (
    <div>
      <div
        style={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
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
          <Button variant="text">Link</Button>
        </div>
        <div>
          <Button variant="text">Primary</Button>
        </div>
        <div>
          <Button variant="filled" theme="primary">
            Button
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="primary">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text" theme="primary">
            Button
          </Button>
        </div>
        <div>
          <Button variant="link" theme="primary">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text">Primary Blue</Button>
        </div>
        <div>
          <Button variant="filled" theme="primaryBlue">
            Button
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="primaryBlue">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text" theme="primaryBlue">
            Button
          </Button>
        </div>
        <div>
          <Button variant="link" theme="primaryBlue">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text">Secondary</Button>
        </div>
        <div>
          <Button variant="filled" theme="secondary">
            Button
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="secondary">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text" theme="secondary">
            Button
          </Button>
        </div>
        <div>
          <Button variant="link" theme="secondary">
            Button
          </Button>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
          background: '#333',
          padding: '24px',
        }}
      >
        <div>
          <Button variant="text" style={{ color: '#fff' }}>
            Inverse
          </Button>
        </div>
        <div>
          <Button variant="filled" theme="inverse">
            Button
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="inverse">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text" theme="inverse">
            Button
          </Button>
        </div>
        <div>
          <Button variant="link" theme="inverse">
            Button
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const VariantDisabled: StoryObj = {
  render: () => (
    <div>
      <div
        style={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
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
          <Button variant="text">Link</Button>
        </div>
        <div>
          <Button variant="text">Primary</Button>
        </div>
        <div>
          <Button disabled variant="filled" theme="primary">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="outlined" theme="primary">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text" theme="primary">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="link" theme="primary">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text">Primary Blue</Button>
        </div>
        <div>
          <Button disabled variant="filled" theme="primaryBlue">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="outlined" theme="primaryBlue">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text" theme="primaryBlue">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="link" theme="primaryBlue">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text">Secondary</Button>
        </div>
        <div>
          <Button disabled variant="filled" theme="secondary">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="outlined" theme="secondary">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text" theme="secondary">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="link" theme="secondary">
            Button
          </Button>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
          background: '#333',
          padding: '24px',
        }}
      >
        <div>
          <Button disabled variant="text" style={{ color: '#fff' }}>
            Inverse
          </Button>
        </div>
        <div>
          <Button disabled variant="filled" theme="inverse">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="outlined" theme="inverse">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text" theme="inverse">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="link" theme="inverse">
            Button
          </Button>
        </div>
      </div>
    </div>
  ),
};
