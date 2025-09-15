import type { StoryObj } from '@storybook/react-vite';
import { Field } from '../imports';

export const Select: StoryObj = {
  render: () => {
    return (
      <Field.Root>
        <Field.Label>Label</Field.Label>
        <Field.Wrapper>
          <Field.Select>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </Field.Select>
        </Field.Wrapper>
        <Field.Helper>Some additional Info</Field.Helper>
        <Field.ErrorText>Error Info</Field.ErrorText>
      </Field.Root>
    );
  },
};
