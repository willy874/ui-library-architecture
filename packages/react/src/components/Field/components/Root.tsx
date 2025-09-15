import { FieldProvider, type FieldContextProps } from '../Field.context'

export interface FieldRootProps extends FieldContextProps {
  children?: React.ReactNode
}

const Root = ({ children, ...props }: FieldRootProps) => {
  return (
    <FieldProvider value={props}>
        {children}
    </FieldProvider>
  )
}

export default Root
