import type { StoryObj } from '@storybook/react-vite';
import { Field } from '../imports';

export const InputState: StoryObj = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Field.Root readOnly>
          <Field.Label>ReadOnly</Field.Label>
          <Field.Wrapper>
            <Field.Input />
          </Field.Wrapper>
          <Field.Helper>
            <Field.ErrorText>Error Info</Field.ErrorText>
          </Field.Helper>
        </Field.Root>

        <Field.Root disabled>
          <Field.Label>Disabled</Field.Label>
          <Field.Wrapper>
            <Field.Input />
          </Field.Wrapper>
          <Field.Helper>
            <Field.ErrorText>Error Info</Field.ErrorText>
          </Field.Helper>
        </Field.Root>

        <Field.Root invalid>
          <Field.Label>Invalid</Field.Label>
          <Field.Wrapper>
            <Field.Input />
          </Field.Wrapper>
          <Field.Helper>
            <Field.ErrorText>Error Info</Field.ErrorText>
          </Field.Helper>
        </Field.Root>

        <Field.Root valid>
          <Field.Label>Valid</Field.Label>
          <Field.Wrapper>
            <Field.Input />
          </Field.Wrapper>
          <Field.Helper>
            <Field.ErrorText>Error Info</Field.ErrorText>
          </Field.Helper>
        </Field.Root>

        <Field.Root invalid disabled>
          <Field.Label>Invalid Disabled</Field.Label>
          <Field.Wrapper>
            <Field.Input />
          </Field.Wrapper>
          <Field.Helper>
            <Field.ErrorText>Error Info</Field.ErrorText>
          </Field.Helper>
        </Field.Root>

        <Field.Root valid disabled>
          <Field.Label>Valid Disabled</Field.Label>
          <Field.Wrapper>
            <Field.Input />
          </Field.Wrapper>
          <Field.Helper>
            <Field.ErrorText>Error Info</Field.ErrorText>
          </Field.Helper>
        </Field.Root>
      </div>
    );
  },
};
