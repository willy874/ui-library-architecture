import { forwardRef } from 'react'
import { ui, type HTMLProps } from '@/utils/factory'
import { mergeProps } from '@/utils/mergeProps'
import { useFieldContext } from '../Field.context'

export interface ErrorTextProps extends HTMLProps<'span'> {
  children?: React.ReactNode
}

const ErrorText = forwardRef<HTMLSpanElement, ErrorTextProps>(({ children, ...props }, ref) => {
  const { getErrorTextProps } = useFieldContext()
  return (
    <ui.span {...mergeProps(getErrorTextProps(), props)} ref={ref}>
      {children}
    </ui.span>
  )
})

export default ErrorText
