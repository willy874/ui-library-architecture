import type { StoryObj } from '@storybook/react-vite';
import { Field } from '../imports';

export const Input: StoryObj = {
  render: () => {
    return (
      <Field childrenType="input">
        <Field.Input value="Input Value" />
      </Field>
    );
  },
};
