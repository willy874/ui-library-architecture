export function resolveDependencies(
  dependencies: Record<string, string> = {},
): (string | RegExp)[] {
  return Object.keys(dependencies)
    .map((dep) => [dep, new RegExp(`^${dep}/.*`)])
    .flat();
}
