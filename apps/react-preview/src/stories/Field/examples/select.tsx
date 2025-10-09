import type { StoryObj } from '@storybook/react-vite';
import { Field } from '../imports';

export const Select: StoryObj = {
  render: () => {
    return (
      <Field childrenType="select">
        <Field.Select>
          <Field.Option value="1">Option 1</Field.Option>
          <Field.Option value="2">Option 2</Field.Option>
          <Field.Option value="3">Option 3</Field.Option>
        </Field.Select>
      </Field>
    );
  },
};
