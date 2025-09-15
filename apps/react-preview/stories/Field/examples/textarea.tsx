import type { StoryObj } from '@storybook/react-vite';
import { Field } from '../imports';

export const Textarea: StoryObj = {
  render: () => {
    return (
      <Field.Root>
        <Field.Label>Label</Field.Label>
        <Field.Wrapper>
          <Field.Textarea />
        </Field.Wrapper>
        <Field.Helper>Some additional Info</Field.Helper>
        <Field.ErrorText>Error Info</Field.ErrorText>
      </Field.Root>
    );
  },
};
