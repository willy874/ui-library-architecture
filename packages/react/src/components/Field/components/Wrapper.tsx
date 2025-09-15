import { forwardRef } from 'react'
import { ui, type HTMLProps } from '@/utils/factory'
import { mergeProps } from '@/utils/mergeProps'
import { useFieldContext } from '../Field.context'

export interface WrapperProps extends HTMLProps<'div'> {
  children?: React.ReactNode
}

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>((props, ref) => {
  const { children, ...rest } = props
  const { getWrapperProps } = useFieldContext()
  return (
    <ui.div {...mergeProps(getWrapperProps(), rest)} ref={ref}>
      {children}
    </ui.div>
  )
})

export default Wrapper
