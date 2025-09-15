import { forwardRef } from 'react'
import { ui, type HTMLProps } from '@/utils/factory'
import { mergeProps } from '@/utils/mergeProps'
import { useFieldContext } from '../Field.context'

export interface PrefixProps extends HTMLProps<'div'> {
  children?: React.ReactNode
}

const Prefix = forwardRef<HTMLDivElement, PrefixProps>(({ children, ...props }, ref) => {
  const { getPrefixProps } = useFieldContext()
  return (
    <ui.div {...mergeProps(getPrefixProps(), props)} ref={ref}>
      {children}
    </ui.div>
  )
})

export default Prefix
