import type { StoryObj } from '@storybook/react-vite';
import { Field } from '../imports';

export const Textarea: StoryObj = {
  render: () => {
    return (
      <Field childrenType="textarea">
        <Field.Textarea />
      </Field>
    );
  },
};
