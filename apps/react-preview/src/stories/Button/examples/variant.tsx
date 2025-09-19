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
        <div>
          <Button variant="text">neutral</Button>
        </div>
        <div>
          <Button variant="filled" theme="neutral">
            Button
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="neutral">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text" theme="neutral">
            Button
          </Button>
        </div>
        <div>
          <Button variant="link" theme="neutral">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text">info</Button>
        </div>
        <div>
          <Button variant="filled" theme="info">
            Button
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="info">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text" theme="info">
            Button
          </Button>
        </div>
        <div>
          <Button variant="link" theme="info">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text">success</Button>
        </div>
        <div>
          <Button variant="filled" theme="success">
            Button
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="success">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text" theme="success">
            Button
          </Button>
        </div>
        <div>
          <Button variant="link" theme="success">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text">warning</Button>
        </div>
        <div>
          <Button variant="filled" theme="warning">
            Button
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="warning">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text" theme="warning">
            Button
          </Button>
        </div>
        <div>
          <Button variant="link" theme="warning">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text">danger</Button>
        </div>
        <div>
          <Button variant="filled" theme="danger">
            Button
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="danger">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text" theme="danger">
            Button
          </Button>
        </div>
        <div>
          <Button variant="link" theme="danger">
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
            tertiary
          </Button>
        </div>
        <div>
          <Button variant="filled" theme="tertiary">
            Button
          </Button>
        </div>
        <div>
          <Button variant="outlined" theme="tertiary">
            Button
          </Button>
        </div>
        <div>
          <Button variant="text" theme="tertiary">
            Button
          </Button>
        </div>
        <div>
          <Button variant="link" theme="tertiary">
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
          <Button disabled variant="text">
            Filled
          </Button>
        </div>
        <div>
          <Button disabled variant="text">
            Outlined
          </Button>
        </div>
        <div>
          <Button disabled variant="text">
            Text
          </Button>
        </div>
        <div>
          <Button disabled variant="text">
            Link
          </Button>
        </div>
        <div>
          <Button disabled variant="text">
            Primary
          </Button>
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
          <Button disabled variant="text">
            Secondary
          </Button>
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
        <div>
          <Button disabled variant="text">
            neutral
          </Button>
        </div>
        <div>
          <Button disabled variant="filled" theme="neutral">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="outlined" theme="neutral">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text" theme="neutral">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="link" theme="neutral">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text">
            info
          </Button>
        </div>
        <div>
          <Button disabled variant="filled" theme="info">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="outlined" theme="info">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text" theme="info">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="link" theme="info">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text">
            success
          </Button>
        </div>
        <div>
          <Button disabled variant="filled" theme="success">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="outlined" theme="success">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text" theme="success">
            Button
          </Button>
        </div>
        <div>
          <Button variant="link" theme="success">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text">
            warning
          </Button>
        </div>
        <div>
          <Button disabled variant="filled" theme="warning">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="outlined" theme="warning">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text" theme="warning">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="link" theme="warning">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text">
            danger
          </Button>
        </div>
        <div>
          <Button disabled variant="filled" theme="danger">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="outlined" theme="danger">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text" theme="danger">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="link" theme="danger">
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
            tertiary
          </Button>
        </div>
        <div>
          <Button disabled variant="filled" theme="tertiary">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="outlined" theme="tertiary">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="text" theme="tertiary">
            Button
          </Button>
        </div>
        <div>
          <Button disabled variant="link" theme="tertiary">
            Button
          </Button>
        </div>
      </div>
    </div>
  ),
};
