import { forwardRef } from 'react'
import { ui, type HTMLProps } from '@/utils/factory'
import { mergeProps } from '@/utils/mergeProps'
import { useFieldContext } from '../Field.context'

export interface SuffixProps extends HTMLProps<'div'> {
  children?: React.ReactNode
}

const Suffix = forwardRef<HTMLDivElement, SuffixProps>((props, ref) => {
  const { children, ...rest } = props
  const { getSuffixProps } = useFieldContext()
  return (
    <ui.div {...mergeProps(getSuffixProps(), rest)} ref={ref}>
      {children}
    </ui.div>
  )
})

export default Suffix
