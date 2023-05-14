export const Fragment = ({ children }: { children: JSX.Children }) =>
  children || null

export const jsx = (
  type: keyof JSX.IntrinsicElements | JSX.Component,
  props: any
): JSX.IntermediateRepresentation => ({
  type,
  props,
})

export const jsxs = jsx
