export const jsx = (
  type: string,
  props: Object | null,
  _key?: string
): JSX.IntermediateRepresentation => ({
  type,
  props: props || {},
})

export const jsxs = (
  type: string,
  props: Object | null,
  _key?: string
): JSX.IntermediateRepresentation => ({
  type,
  props: props || {},
})

export { jsx as jsxDev }

export const Fragment = ({ children }: { children: JSX.Children }) =>
  children || null
