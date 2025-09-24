import { splitProps } from '@/utils/splitProps';
import { field, type FieldVariantProps } from '@/styled-system/recipes';
import defineField from './Field.atomic';
import type { FieldRootProps } from './widgets/Root';
import type { FieldLabelProps } from './widgets/Label';
import type { FieldHelperProps } from './widgets/Helper';
import type { FieldPrefixProps } from './widgets/Prefix';
import type { FieldSuffixProps } from './widgets/Suffix';
import type { FieldErrorTextProps } from './widgets/ErrorText';
import type { FieldWrapperProps } from './widgets/Wrapper';
import type { FieldPasswordControlProps } from './widgets/PasswordControl';
// import type { FieldInputProps } from './widgets/Input';
// import type { FieldSelectProps } from './widgets/Select';
// import type { FieldTextareaProps } from './widgets/Textarea';

const {
  Root,
  Label,
  Helper,
  Prefix,
  Suffix,
  ErrorText,
  Wrapper,
  PasswordControl,
  Input,
  Select,
  Textarea,
} = defineField(field);

export interface FieldProps extends FieldRootProps, FieldVariantProps {
  labelNode?: React.ReactNode;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
  helperNode?: React.ReactNode;
  children?: React.ReactNode;
  attrs?: {
    label?: FieldLabelProps;
    errorText?: FieldErrorTextProps;
    passwordControl?: FieldPasswordControlProps;
    wrapper?: FieldWrapperProps;
    prefix?: FieldPrefixProps;
    suffix?: FieldSuffixProps;
    helper?: FieldHelperProps;
  };
}

const propKeys = [
  'attrs',
  'children',
  'prefixNode',
  'suffixNode',
  'helperNode',
  'labelNode',
] as const;

function Field(props: FieldProps) {
  const [{ attrs, children, prefixNode, suffixNode, helperNode, labelNode }, rootProps] =
    splitProps(props, ...propKeys);
  const isPassword = rootProps.type === 'password';
  return (
    <Root {...rootProps}>
      <Label {...attrs?.label}>{labelNode}</Label>
      <Wrapper {...attrs?.wrapper}>
        <Prefix {...attrs?.prefix}>{prefixNode}</Prefix>
        {children}
        {isPassword ? (
          <PasswordControl {...attrs?.passwordControl} />
        ) : (
          <Suffix {...attrs?.suffix}>{suffixNode}</Suffix>
        )}
      </Wrapper>
      <Helper {...attrs?.helper}>{helperNode}</Helper>
    </Root>
  );
}

Field.Root = Root;
Field.Label = Label;
Field.Helper = Helper;
Field.Prefix = Prefix;
Field.Suffix = Suffix;
Field.ErrorText = ErrorText;
Field.PasswordControl = PasswordControl;
Field.Wrapper = Wrapper;
Field.Input = Input;
Field.Select = Select;
Field.Textarea = Textarea;

export default Field;
