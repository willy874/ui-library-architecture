import { forwardRef, useRef } from 'react'
import { mergeProps } from '@zag-js/react'
import { ui } from '@/utils/factory'
import { useForkRef } from '@/utils/hooks/composeRefs'
import { defineComponents } from '@/utils/hooks/defineComponents'
import { Spin as _Spin } from '../imports'

const useComponents = defineComponents({
  Spin: _Spin,
})

export interface ButtonLinkProps extends React.ComponentProps<'a'> {
  disabled?: boolean
  loading?: boolean
  components?: Parameters<typeof useComponents>[0]
  children?: React.ReactNode
}

const ButtonLink = forwardRef(function ({
  children,
  loading,
  disabled,
  components,
  type,
  ...props
}: ButtonLinkProps, propRef: React.Ref<HTMLAnchorElement>) {
  const rootRef = useRef<HTMLAnchorElement>(null)
  const refCallback = useForkRef<HTMLAnchorElement>(rootRef, propRef)

  const componentNodes = useComponents({
    Spin: [_Spin, {}],
    ...components,
  })

  const node = (() => {
    if (loading) {
      return componentNodes.Spin
    }
    return children
  })()
  const $disabled = loading || disabled

  return (
    <ui.a
      ref={refCallback}
      {...mergeProps<ButtonLinkProps>(props, {
        type: type || 'button',
        disabled: $disabled,
      })}
    >
      {node}
    </ui.a>
  )
})

export default ButtonLink
