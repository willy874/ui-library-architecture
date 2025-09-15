import { splitProps } from '@/utils/splitProps'
import StyledField from './Field.style'
import type { FieldVariantProps } from '@/styled-system/recipes'
import type { FieldRootProps } from './components/Root'

export interface FieldProps extends FieldRootProps, FieldVariantProps {
  labelNode?: React.ReactNode
  prefixNode?: React.ReactNode
  suffixNode?: React.ReactNode
  helperNode?: React.ReactNode
  children?: React.ReactNode
  attrs?: {
    label?: React.LabelHTMLAttributes<HTMLLabelElement>
    errorText?: React.HTMLAttributes<HTMLSpanElement>
    passwordControl?: React.HTMLAttributes<HTMLDivElement>
    wrapper?: React.HTMLAttributes<HTMLDivElement>
    prefix?: React.HTMLAttributes<HTMLDivElement>
    suffix?: React.HTMLAttributes<HTMLDivElement>
    helper?: React.HTMLAttributes<HTMLDivElement>
  }
}

const propKeys = ['attrs', 'children', 'prefixNode', 'suffixNode', 'helperNode', 'labelNode'] as const

function Field(props: FieldProps) {
  const [{ attrs, children, prefixNode, suffixNode, helperNode, labelNode }, rootProps] = splitProps(props, ...propKeys)
  const isPassword = rootProps.type === 'password'
  return (
    <StyledField.Root {...rootProps}>
      <StyledField.Label {...attrs?.label}>
        {labelNode}
      </StyledField.Label>
      <StyledField.Wrapper {...attrs?.wrapper}>
        <StyledField.Prefix {...attrs?.prefix}>
          {prefixNode}
        </StyledField.Prefix>
        {children}
        {isPassword
          ? (
              <StyledField.PasswordControl {...attrs?.passwordControl} />
            )
          : (
              <StyledField.Suffix {...attrs?.suffix}>
                {suffixNode}
              </StyledField.Suffix>
            )}
      </StyledField.Wrapper>
      <StyledField.Helper {...attrs?.helper}>
        {helperNode}
      </StyledField.Helper>
    </StyledField.Root>
  )
}

Field.displayName = 'Field'
Field.Root = StyledField.Root
Field.Label = StyledField.Label
Field.Helper = StyledField.Helper
Field.Prefix = StyledField.Prefix
Field.Suffix = StyledField.Suffix
Field.ErrorText = StyledField.ErrorText
Field.PasswordControl = StyledField.PasswordControl
Field.Wrapper = StyledField.Wrapper
Field.Input = StyledField.Input
Field.Select = StyledField.Select
Field.Textarea = StyledField.Textarea

export default Field
