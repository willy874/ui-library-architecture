import { ui, type HTMLProps } from '@/utils/factory'
import { mergeProps } from '@/utils/mergeProps'
import { useFieldContext } from '../Field.context'
import { forwardRef } from 'react'

export interface HelperProps extends HTMLProps<'div'> {
  children?: React.ReactNode
}

const Helper = forwardRef<HTMLDivElement, HelperProps>(({ children, ...props }, ref) => {
  const { getHelperProps } = useFieldContext()
  return (
    <ui.div {...mergeProps(getHelperProps(), props)} ref={ref}>
      {children}
    </ui.div>
  )
})

export default Helper
