import './types'

export const html = (
  elem: JSX.IntermediateRepresentation | string | number
): string => {
  if (Array.isArray(elem)) return elem.map(html).join('')
  if (typeof elem === 'string') return elem
  if (typeof elem === 'number') return elem.toString()
  if (typeof elem !== 'object')
    throw Error(`Unexpected elem encountered: ${JSON.stringify(elem)}`)

  const { type, props } = elem

  if (typeof type === 'function') {
    const out = type(props)
    if (out === null) return ''
    if (typeof out === 'string') return out
    return html(out)
  }

  const { children, ...rest } = props
  const attrs = rest
    ? Object.entries<any>(rest)
        .map(([key, value]) => [
          key,
          key === 'class' ? formatClass(value) : value,
        ])
        .filter(([, value]) => value)
        .map(([key, value]) => (value === true ? key : `${key}="${value}"`))
        .join(' ')
    : null

  const nested = !children
    ? null
    : Array.isArray(children)
    ? children.map(html).join('')
    : html(children)

  return `<${type}${attrs ? ' ' + attrs : ''}>${nested}</${type}>`
}

export const dom = (
  elem: JSX.IntermediateRepresentation | string
): Array<HTMLElement | string> => {
  return ['']
  // if (typeof elem === 'string') return [elem]

  // const { type, props, children } = elem

  // if (typeof type === 'function') {
  //   const out = type({ ...props, children })
  //   if (out === null) return []
  //   if (typeof out === 'string') return [out]
  //   // FIXME: types indicate this isn't needed, but it is
  //   if (Array.isArray(out)) {
  //     return out.reduce((acc, x) => [...acc, ...dom(x)], [])
  //   }
  //   return dom(out)
  // }

  // const node = document.createElement(type)

  // Object.entries(props).forEach(([key, value]) => {
  //   ;(node as any)[key] = value
  // })

  // const childNodes = Array.isArray(children)
  //   ? children.reduce<Array<HTMLElement | string>>(
  //       (acc, x) => [...acc, ...dom(x)],
  //       [],
  //     )
  //   : dom(children)

  // append(node, childNodes)

  // return [node]
}

export const append = (
  node: HTMLElement,
  children: Array<HTMLElement | string>
): void => {
  children.forEach(child => {
    if (typeof child === 'string') {
      node.innerText = child
    } else {
      node.appendChild(child)
    }
  })
}

const formatClass = (clazz: unknown): string | null => {
  if (typeof clazz === 'string') return clazz
  if (Array.isArray(clazz)) {
    return clazz.filter((x: any) => x).join(' ')
  }
  return null
}
