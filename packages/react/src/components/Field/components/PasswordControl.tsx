import { forwardRef } from 'react'
import { useFieldContext } from '../Field.context'
import Eye from '@/assets/eye.svg?react'
import EyeSlash from '@/assets/eye-slash.svg?react'
import { mergeProps } from '@/utils/mergeProps'
import { ui, type HTMLProps } from '@/utils/factory'

export interface PasswordControlRenderParams {
  isPasswordVisible: boolean
}

export interface PasswordControlProps extends HTMLProps<'div'> {
  render?: (props: PasswordControlRenderParams) => React.ReactNode
}

const PasswordControl = forwardRef<HTMLDivElement, PasswordControlProps>(({ render, ...props }, ref) => {
  const { isPasswordVisible, togglePasswordVisibility, getPasswordControlProps } = useFieldContext()
  return (
    <ui.div
      {...mergeProps(getPasswordControlProps(), props, {
        onClick: togglePasswordVisibility,
      })}
      ref={ref}
    >
      {(() => {
        if (render) {
          return render({ isPasswordVisible }) 
        }
        return isPasswordVisible ? <EyeSlash /> : <Eye />
      })()}
    </ui.div>
  )
})

export default PasswordControl
