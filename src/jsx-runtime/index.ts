import { IntermediateRepresentation, Component } from '..'

export const jsx = (
  type: string,
  props: Object | null,
  _key?: string
): IntermediateRepresentation => ({
  type,
  props: props || {},
})

export const jsxs = (
  type: string,
  props: Object | null,
  _key?: string
): IntermediateRepresentation => ({
  type,
  props: props || {},
})

export { jsx as jsxDev }

// TODO: fix as any
export const Fragment: Component = ({ children }) => (children as any) || null
