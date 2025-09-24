import { splitProps } from '@/utils/splitProps';
import { injectDataset } from '@/utils/injectDataset';
import { field } from '@/styled-system/recipes';
import type { FieldVariant } from '@/styled-system/recipes';
import defineField from './Field.atomic';
import type { FieldRootProps } from './widgets/Root';
import type { FieldLabelProps } from './widgets/Label';
import type { FieldHelperProps } from './widgets/Helper';
import type { FieldPrefixProps } from './widgets/Prefix';
import type { FieldSuffixProps } from './widgets/Suffix';
import type { FieldErrorTextProps } from './widgets/ErrorText';
import type { FieldWrapperProps } from './widgets/Wrapper';
import type { FieldPasswordControlProps } from './widgets/PasswordControl';
import type { FieldInputProps } from './widgets/Input';
import type { FieldSelectProps } from './widgets/Select';
import type { FieldTextareaProps } from './widgets/Textarea';

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
} = defineField((props) => {
  const variants = field.getVariantProps(field.splitVariantProps(props)[0]) as FieldVariant;
  const slotStyles = field(variants);
  const dataset = injectDataset({
    variant: variants.variant,
  });
  return {
    root: { className: slotStyles.root, ...dataset },
    label: { className: slotStyles.label, ...dataset },
    helper: { className: slotStyles.helper, ...dataset },
    prefix: { className: slotStyles.prefix, ...dataset },
    suffix: { className: slotStyles.suffix, ...dataset },
    errorText: { className: slotStyles.errorText, ...dataset },
    wrapper: { className: slotStyles.wrapper, ...dataset },
    passwordControl: { className: slotStyles.passwordControl, ...dataset },
    input: { className: slotStyles.input, ...dataset },
    select: { className: slotStyles.select, ...dataset },
    textarea: { className: slotStyles.textarea, ...dataset },
  };
});

export interface FieldProps extends FieldRootProps, Partial<FieldVariant> {
  labelNode?: React.ReactNode;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
  helperNode?: React.ReactNode;
  childrenType?: 'input' | 'select' | 'textarea' | 'custom';
  children?: React.ReactNode;
  attrs?: {
    label?: FieldLabelProps;
    errorText?: FieldErrorTextProps;
    passwordControl?: FieldPasswordControlProps;
    wrapper?: FieldWrapperProps;
    prefix?: FieldPrefixProps;
    suffix?: FieldSuffixProps;
    helper?: FieldHelperProps;
    input?: FieldInputProps;
    select?: FieldSelectProps;
    textarea?: FieldTextareaProps;
  };
}

const propKeys = [
  'attrs',
  'children',
  'prefixNode',
  'suffixNode',
  'helperNode',
  'labelNode',
  'childrenType',
] as const;

function Field(props: FieldProps) {
  const [
    { attrs, children, prefixNode, suffixNode, helperNode, labelNode, childrenType = 'custom' },
    rootProps,
  ] = splitProps(props, ...propKeys);
  const isPassword = rootProps.type === 'password';
  return (
    <Root {...rootProps}>
      <Label {...attrs?.label}>{labelNode}</Label>
      <Wrapper {...attrs?.wrapper}>
        <Prefix {...attrs?.prefix}>{prefixNode}</Prefix>
        {(() => {
          if (childrenType === 'custom') {
            return children;
          }
          if (childrenType === 'input') {
            return <Input {...(attrs?.input ?? {})} />;
          }
          if (childrenType === 'select') {
            return <Select {...(attrs?.select ?? {})}>{children}</Select>;
          }
          if (childrenType === 'textarea') {
            return <Textarea {...(attrs?.textarea ?? {})}>{children}</Textarea>;
          }
          return children;
        })()}
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

Field.displayName = 'Field';
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
