export function splitProps<T extends object, K extends keyof T>(obj: T, ...keys: K[]): [Pick<T, K>, Omit<T, K>] {
  const pick: object = {}
  const omit: object = {}
  for (const key in obj) {
    if ((keys as string[]).includes(key)) {
      Reflect.set(pick, key, obj[key])
    }
    else {
      Reflect.set(omit, key, obj[key])
    }
  }
  return [pick as Pick<T, K>, omit as Omit<T, K>]
}
