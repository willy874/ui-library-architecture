import type { StoryObj } from '@storybook/react-vite';
import { Field } from '../imports';

export const Input: StoryObj = {
  render: () => {
    return (
      <Field.Root>
        <Field.Label>Label</Field.Label>
        <Field.Wrapper>
          <Field.Input value="Input Value" />
        </Field.Wrapper>
      </Field.Root>
    );
  },
};
