export function injectDataset<T extends Record<string, string>>(props: T) {
  return Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) {
        acc[`data-${key}`] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}
