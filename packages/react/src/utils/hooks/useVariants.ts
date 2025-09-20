import type { DistributiveOmit, Pretty } from '../types';

type VariantProps = Record<string, any>;
type Recipe<V extends VariantProps> = {
  (props?: V): string;
  splitVariantProps<Props extends V>(props: Props): [V, Pretty<DistributiveOmit<Props, keyof V>>];
  getVariantProps: (props?: V) => V;
};
type Attributes = { [key: `data-${string}`]: string } & { className: string };

export function useVariants<T extends VariantProps>(props: T, recipe: Recipe<T>): Attributes {
  const [variantProps] = recipe.splitVariantProps(props);
  const variants = recipe.getVariantProps(variantProps);
  const attrs = (() => {
    const result: Record<string, string> = {};
    for (const key in variants) {
      result[`data-${key}`] = Reflect.get(variants, key) as string;
    }
    return result;
  })();
  return {
    ...attrs,
    className: recipe(variantProps),
  };
}
