import { splitProps } from '@/utils/splitProps';
import { field } from '@/styled-system/recipes';
import type { FieldVariant } from '@/styled-system/recipes';
import { ui, type DefaultHTMLProps, type HTMLProps } from '@/utils/factory';
import { FieldContext, useFieldService } from '@/components/Field';
import type { UseFieldServiceProps } from '@/components/Field';
import { Eye, EyeSlash } from '@/assets';

interface FieldPartProps {
  root?: DefaultHTMLProps;
  label?: HTMLProps<'label'>;
  input?: HTMLProps<'input'>;
  select?: HTMLProps<'select'>;
  textarea?: HTMLProps<'textarea'>;
  errorText?: DefaultHTMLProps;
  passwordControl?: DefaultHTMLProps;
  wrapper?: DefaultHTMLProps;
  prefix?: DefaultHTMLProps;
  suffix?: DefaultHTMLProps;
  helper?: DefaultHTMLProps;
}

export interface FieldProps extends Omit<UseFieldServiceProps, 'plugins'>, Partial<FieldVariant> {
  labelNode?: React.ReactNode;
  prefixNode?: React.ReactNode;
  suffixNode?: React.ReactNode;
  helperNode?: React.ReactNode;
  childrenType?: 'input' | 'select' | 'textarea' | 'custom';
  children?: React.ReactNode;
  attrs?: FieldPartProps;
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
  const [containerProps, serviceParams] = splitProps(props, ...propKeys);
  const variants = field.getVariantProps(field.splitVariantProps(props)[0]);
  const {
    attrs = {},
    children,
    prefixNode,
    suffixNode,
    helperNode,
    labelNode,
    childrenType = 'custom',
  } = containerProps;
  const {
    isPasswordVisible,
    getRootProps,
    getControlProps,
    getLabelProps,
    getErrorTextProps,
    getWrapperProps,
    getPasswordControlProps,
    getHelperProps,
    getPrefixProps,
    getSuffixProps,
    getInputProps,
    getTextareaProps,
    getSelectProps,
  } = useFieldService({
    classNames: field(variants),
    ...serviceParams,
  });
  const isPassword = serviceParams.type === 'password';
  return (
    <ui.div {...getRootProps(attrs.root)}>
      <ui.label {...getLabelProps(attrs.label)}>{labelNode}</ui.label>
      <ui.div {...getWrapperProps(attrs.wrapper)}>
        <ui.div {...getPrefixProps(attrs.prefix)}>{prefixNode}</ui.div>
        {(() => {
          if (childrenType === 'custom') {
            return children;
          }
          if (childrenType === 'input') {
            return <ui.input {...getInputProps(attrs.input)} />;
          }
          if (childrenType === 'select') {
            return <ui.select {...getSelectProps(attrs.select)}>{children}</ui.select>;
          }
          if (childrenType === 'textarea') {
            return <ui.textarea {...getTextareaProps(attrs.textarea)}>{children}</ui.textarea>;
          }
          return children;
        })()}
        {isPassword ? (
          <ui.div {...getPasswordControlProps(attrs.passwordControl)}>
            {isPasswordVisible ? <EyeSlash /> : <Eye />}
          </ui.div>
        ) : (
          <ui.div {...getSuffixProps(attrs.suffix)}>{suffixNode}</ui.div>
        )}
      </ui.div>
      <ui.div {...getHelperProps(attrs.helper)}>{helperNode}</ui.div>
    </ui.div>
  );
}

Field.displayName = 'Field';

export default Field;
