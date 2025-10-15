import {
  FieldContext,
  useFieldService,
  InputContext,
  SelectContext,
  TextareaContext,
  splitProps,
  ui,
} from '@ui-library-architecture/react';
import type {
  DefaultHTMLProps,
  HTMLProps,
  UseFieldServiceProps,
} from '@ui-library-architecture/react';
import { EyeIcon, EyeSlashIcon } from '@ui-library-architecture/react-icon';
import { field } from 'styled-system/recipes';
import type { FieldVariant } from 'styled-system/recipes';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';

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
  childrenType?: 'input' | 'select' | 'textarea';
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
  const {
    attrs = {},
    children,
    prefixNode,
    suffixNode,
    helperNode,
    labelNode,
    childrenType,
  } = containerProps;
  const fieldVariants = field.getVariantProps(field.splitVariantProps(props)[0]);
  const service = useFieldService({
    classNames: field(fieldVariants),
    ...serviceParams,
  });
  const isPassword = serviceParams.type === 'password';
  return (
    <FieldContext.ServiceProvider value={service}>
      <ui.div {...service.getRootProps(attrs.root)}>
        <ui.label {...service.getLabelProps(attrs.label)}>{labelNode}</ui.label>
        <ui.div {...service.getWrapperProps(attrs.wrapper)}>
          <ui.div {...service.getPrefixProps(attrs.prefix)}>{prefixNode}</ui.div>
          {(() => {
            if (childrenType === 'input') {
              if (children) {
                return (
                  <InputContext.Provider value={service.getInputProps(attrs.input)}>
                    {children}
                  </InputContext.Provider>
                );
              } else {
                return <Input {...service.getInputProps(attrs.input)} />;
              }
            }
            if (childrenType === 'select') {
              if (children) {
                return (
                  <SelectContext.Provider value={service.getSelectProps(attrs.select)}>
                    {children}
                  </SelectContext.Provider>
                );
              } else {
                return <Select {...service.getSelectProps(attrs.select)} />;
              }
            }
            if (childrenType === 'textarea') {
              if (children) {
                return (
                  <TextareaContext.Provider value={service.getTextareaProps(attrs.textarea)}>
                    {children}
                  </TextareaContext.Provider>
                );
              } else {
                return <Textarea {...service.getTextareaProps(attrs.textarea)} />;
              }
            }
            return children;
          })()}
          {isPassword ? (
            <ui.div {...service.getPasswordControlProps(attrs.passwordControl)}>
              {service.isPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
            </ui.div>
          ) : (
            <ui.div {...service.getSuffixProps(attrs.suffix)}>{suffixNode}</ui.div>
          )}
        </ui.div>
        <ui.div {...service.getHelperProps(attrs.helper)}>{helperNode}</ui.div>
      </ui.div>
    </FieldContext.ServiceProvider>
  );
}

Field.displayName = 'Field';
Field.Input = Input;
Field.Select = Select;
Field.Option = ui.option;
Field.Textarea = Textarea;

export default Field;
