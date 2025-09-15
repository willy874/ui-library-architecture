type UseDefineComponentsParams<T extends Record<string, React.ComponentType<any>>> = {
  [K in keyof T]?: [T[K], React.ComponentProps<T[K]>]
}
type UseDefineComponentsResult<T extends Record<string, React.ComponentType<any>>> = {
  [K in keyof T]: React.ReactNode
}

export function defineComponents<T extends Record<string, React.ComponentType<any>>>(
  components: T,
): (params: UseDefineComponentsParams<T>) => UseDefineComponentsResult<T> {
  return (params) => {
    const result = {} as UseDefineComponentsResult<T>
    for (const key in components) {
      const [
        Comp = components[key],
        parameter = {} as React.ComponentProps<T[keyof T]>,
      ] = params[key] ?? []
      result[key] = <Comp {...parameter} />
    }
    return result
  }
}
