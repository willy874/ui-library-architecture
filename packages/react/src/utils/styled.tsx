import { mergeProps } from "./mergeProps";
import type { DistributiveOmit, Pretty } from "./types";

type VariantProps<Variant extends Record<string, string>> = {
  [key in keyof Variant]?: Variant[key] | undefined
}

interface Recipe<Variant extends Record<string, string>> {
  (props?: VariantProps<Variant>): string
  splitVariantProps<Props extends VariantProps<Variant>>(props: Props): [VariantProps<Variant>, Pretty<DistributiveOmit<Props, keyof VariantProps<Variant>>>]
}

export function styled<P extends Record<string, any>, V extends Record<string, string>>(Component: React.ComponentType<P>, recipe: Recipe<V>): React.FC<Omit<P, keyof V> & Partial<V>> {
  return (props) => {
    const [variantProps, otherProps] = recipe.splitVariantProps(props)
    const Comp = Component as React.ComponentType<any>;
    const children = Reflect.get(props, 'children') as React.ReactNode;
    return <Comp {...mergeProps(otherProps, { className: recipe(variantProps) })}>{children}</Comp>;
  };
}

