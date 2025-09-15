import { forwardRef } from 'react'
import { ui, type HTMLProps } from '@/utils/factory'
import { mergeProps } from '@/utils/mergeProps'
import { useFieldContext } from '../Field.context'

export interface LabelProps extends HTMLProps<'label'> {
  children?: React.ReactNode
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ children, ...props }, ref) => {
  const { getLabelProps } = useFieldContext()
  return (
    <ui.label {...mergeProps(getLabelProps(), props)} ref={ref}>
      {children}
    </ui.label>
  )
})

export default Label
