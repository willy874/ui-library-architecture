import type { StoryObj } from '@storybook/react-vite';
import { Field } from '../imports';

export const InputState: StoryObj = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Field childrenType="input" readOnly labelNode="ReadOnly" helperNode="Some additional Info">
          <Field.Input />
        </Field>

        <Field childrenType="input" disabled labelNode="Disabled" helperNode="Some additional Info">
          <Field.Input />
        </Field>

        <Field childrenType="input" invalid labelNode="Invalid" helperNode="Some additional Info">
          <Field.Input />
        </Field>

        <Field childrenType="input" valid labelNode="Valid" helperNode="Some additional Info">
          <Field.Input />
        </Field>

        <Field childrenType="input" valid labelNode="Valid" helperNode="Some additional Info">
          <Field.Input />
        </Field>

        <Field childrenType="input" invalid disabled labelNode="Invalid Disabled">
          <Field.Input />
        </Field>

        <Field childrenType="input" valid disabled labelNode="Valid Disabled">
          <Field.Input />
        </Field>
      </div>
    );
  },
};
