import type { StoryObj } from '@storybook/react-vite';
import { Field } from '../imports';

export const CustomInput: StoryObj = {
  render: () => {
    return (
      <Field.Root invalid>
        <Field.Label>
          <div>Label</div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <Field.ErrorText>Error Info</Field.ErrorText>
          </div>
        </Field.Label>
        <Field.Wrapper>
          <Field.Input />
        </Field.Wrapper>
        <Field.Helper>Some additional Info</Field.Helper>
      </Field.Root>
    );
  },
};

export const CustomInputLongMessage: StoryObj = {
  render: () => {
    return (
      <div style={{ maxWidth: '300px' }}>
        <Field.Root invalid>
          <Field.Label>
            <div>Label</div>
            <div style={{ flexGrow: 1, width: 0, textAlign: 'right' }}>
              <Field.ErrorText style={{ display: 'block' }}>
                這是超級無敵霹靂有夠多的一個很長的錯誤訊息
              </Field.ErrorText>
            </div>
          </Field.Label>
          <Field.Wrapper>
            <Field.Input />
          </Field.Wrapper>
          <Field.Helper>Some additional Info</Field.Helper>
        </Field.Root>
      </div>
    );
  },
};
