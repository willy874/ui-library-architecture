import { forwardRef } from 'react';
import { useFieldContext } from '../core/context';
import Eye from '@/assets/eye.svg?react';
import EyeSlash from '@/assets/eye-slash.svg?react';
import { mergeProps } from '@/utils/mergeProps';
import { ui, type HTMLProps } from '@/utils/factory';

export interface PasswordControlRenderParams {
  isPasswordVisible: boolean;
}

export interface FieldPasswordControlProps extends HTMLProps<'div'> {
  render?: (props: PasswordControlRenderParams) => React.ReactNode;
}

const FieldPasswordControl = forwardRef<HTMLDivElement, FieldPasswordControlProps>(
  ({ render, ...props }, ref) => {
    const { isPasswordVisible, togglePasswordVisibility, getPasswordControlProps } =
      useFieldContext();
    return (
      <ui.div
        {...mergeProps(getPasswordControlProps(), props, {
          onClick: togglePasswordVisibility,
        })}
        ref={ref}
      >
        {(() => {
          if (render) {
            return render({ isPasswordVisible });
          }
          return isPasswordVisible ? <EyeSlash /> : <Eye />;
        })()}
      </ui.div>
    );
  },
);

FieldPasswordControl.displayName = 'FieldPasswordControl';

export default FieldPasswordControl;
