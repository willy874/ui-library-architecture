import { NODEJS_EXTERNALS } from './node-externals';

interface ResolveDependenciesOptions {
  exclude?: (string | RegExp)[];
  excludeNode?: boolean;
}

export function resolveDependencies(
  dependencies: Record<string, string> = {},
  options: ResolveDependenciesOptions = {},
): (string | RegExp)[] {
  const { excludeNode = false } = options;
  const excludes = [...(options.exclude || [])];
  if (excludeNode) {
    excludes.push(...NODEJS_EXTERNALS);
  }
  const result: (string | RegExp)[] = Object.keys(dependencies)
    .filter((dep) => {
      if (!excludes) return true;
      return !excludes.some((exclusion) => {
        return typeof exclusion === 'string' ? exclusion === dep : exclusion.test(dep);
      });
    })
    .map((dep) => [dep, new RegExp(`^${dep}/.*`)])
    .flat();
  return result;
}
