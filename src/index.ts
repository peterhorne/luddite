export const Fragment = ({ children }: { children: JSX.Children }) =>
  children || null

export const factory = (
  type: keyof JSX.IntrinsicElements | JSX.Component,
  props: Object | null,
  ...nestedChildren: JSX.Children[]
): JSX.IntermediateRepresentation => {
  const children: JSX.Children = nestedChildren.flat()

  return {
    type,
    props: props || {},
    children,
  }
}

export const html = (elem: JSX.IntermediateRepresentation | string): string => {
  if (!elem) return ''
  if (typeof elem === 'string') return elem

  const { type, props, children } = elem

  if (typeof type === 'function') {
    const out = type({ ...props, children })
    if (out === null) return ''
    if (typeof out === 'string') return out
    // FIXME: types indicate this isn't needed, but it is
    if (Array.isArray(out)) return out.map(html).join('')
    return html(out)
  }

  const attrs = props
    ? Object.entries(props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
    : null

  const domChildren = Array.isArray(children)
    ? children.map(html).join('')
    : html(children)

  return `<${type}${attrs ? ' ' + attrs : ''}>${domChildren}</${type}>`
}

export const dom = (
  elem: JSX.IntermediateRepresentation | string,
): Array<HTMLElement | string> => {
  if (typeof elem === 'string') return [elem]

  const { type, props, children } = elem

  if (typeof type === 'function') {
    const out = type({ ...props, children })
    if (out === null) return []
    if (typeof out === 'string') return [out]
    // FIXME: types indicate this isn't needed, but it is
    if (Array.isArray(out)) {
      return out.reduce((acc, x) => [...acc, ...dom(x)], [])
    }
    return dom(out)
  }

  const node = document.createElement(type)

  Object.entries(props).forEach(([key, value]) => {
    ;(node as any)[key] = value
  })

  const childNodes = Array.isArray(children)
    ? children.reduce<Array<HTMLElement | string>>(
        (acc, x) => [...acc, ...dom(x)],
        [],
      )
    : dom(children)

  append(node, childNodes)

  return [node]
}

export const append = (
  node: HTMLElement,
  children: Array<HTMLElement | string>,
): void => {
  children.forEach(child => {
    if (typeof child === 'string') {
      node.innerText = child
    } else {
      node.appendChild(child)
    }
  })
}

declare global {
  namespace JSX {
    export type PropsWithChildren<P> = P & { children?: Children }

    export type Component<P extends {} = {}> = (
      props: PropsWithChildren<P>,
    ) => Element | null

    export type Element = IntermediateRepresentation | string

    export interface IntermediateRepresentation<P = {}> {
      type: keyof IntrinsicElements | Component
      props: P
      children: Children
    }

    export type Children = Element[] | Element

    export interface ElementAttributesProperty {
      props: {}
    }
    export interface ElementChildrenAttribute {
      children: {}
    }

    type Jsxify<T> = Partial<
      Omit<T, 'children' | 'className'> & { children: Children; class: string }
    >

    export interface IntrinsicElements {
      // HTML
      a: Jsxify<HTMLAnchorElement>
      abbr: Jsxify<HTMLElement>
      address: Jsxify<HTMLElement>
      area: Jsxify<HTMLAreaElement>
      article: Jsxify<HTMLElement>
      aside: Jsxify<HTMLElement>
      audio: Jsxify<HTMLAudioElement>
      b: Jsxify<HTMLElement>
      base: Jsxify<HTMLBaseElement>
      bdi: Jsxify<HTMLElement>
      bdo: Jsxify<HTMLElement>
      big: Jsxify<HTMLElement>
      blockquote: Jsxify<HTMLElement>
      body: Jsxify<HTMLBodyElement>
      br: Jsxify<HTMLBRElement>
      button: Jsxify<HTMLButtonElement>
      canvas: Jsxify<HTMLCanvasElement>
      caption: Jsxify<HTMLElement>
      cite: Jsxify<HTMLElement>
      code: Jsxify<HTMLElement>
      col: Jsxify<HTMLTableColElement>
      colgroup: Jsxify<HTMLTableColElement>
      data: Jsxify<HTMLDataElement>
      datalist: Jsxify<HTMLDataListElement>
      dd: Jsxify<HTMLElement>
      del: Jsxify<HTMLElement>
      details: Jsxify<HTMLElement>
      dfn: Jsxify<HTMLElement>
      div: Jsxify<HTMLDivElement>
      dl: Jsxify<HTMLDListElement>
      dt: Jsxify<HTMLElement>
      em: Jsxify<HTMLElement>
      embed: Jsxify<HTMLEmbedElement>
      fieldset: Jsxify<HTMLFieldSetElement>
      figcaption: Jsxify<HTMLElement>
      figure: Jsxify<HTMLElement>
      footer: Jsxify<HTMLElement>
      form: Jsxify<HTMLFormElement>
      h1: Jsxify<HTMLHeadingElement>
      h2: Jsxify<HTMLHeadingElement>
      h3: Jsxify<HTMLHeadingElement>
      h4: Jsxify<HTMLHeadingElement>
      h5: Jsxify<HTMLHeadingElement>
      h6: Jsxify<HTMLHeadingElement>
      head: Jsxify<HTMLHeadElement>
      header: Jsxify<HTMLElement>
      hgroup: Jsxify<HTMLElement>
      hr: Jsxify<HTMLHRElement>
      html: Jsxify<HTMLHtmlElement>
      i: Jsxify<HTMLElement>
      iframe: Jsxify<HTMLIFrameElement>
      img: Jsxify<HTMLImageElement>
      input: Jsxify<HTMLInputElement>
      ins: Jsxify<HTMLModElement>
      kbd: Jsxify<HTMLElement>
      keygen: Jsxify<HTMLElement>
      label: Jsxify<HTMLLabelElement>
      legend: Jsxify<HTMLLegendElement>
      li: Jsxify<HTMLLIElement>
      link: Jsxify<HTMLLinkElement>
      main: Jsxify<HTMLElement>
      map: Jsxify<HTMLMapElement>
      mark: Jsxify<HTMLElement>
      menu: Jsxify<HTMLElement>
      menuitem: Jsxify<HTMLElement>
      meta: Jsxify<HTMLMetaElement>
      meter: Jsxify<HTMLElement>
      nav: Jsxify<HTMLElement>
      noindex: Jsxify<HTMLElement>
      noscript: Jsxify<HTMLElement>
      object: Jsxify<HTMLObjectElement>
      ol: Jsxify<HTMLOListElement>
      optgroup: Jsxify<HTMLOptGroupElement>
      option: Jsxify<HTMLOptionElement>
      output: Jsxify<HTMLElement>
      p: Jsxify<HTMLParagraphElement>
      param: Jsxify<HTMLParamElement>
      picture: Jsxify<HTMLElement>
      pre: Jsxify<HTMLPreElement>
      progress: Jsxify<HTMLProgressElement>
      q: Jsxify<HTMLQuoteElement>
      rp: Jsxify<HTMLElement>
      rt: Jsxify<HTMLElement>
      ruby: Jsxify<HTMLElement>
      s: Jsxify<HTMLElement>
      samp: Jsxify<HTMLElement>
      slot: Jsxify<HTMLSlotElement>
      script: Jsxify<HTMLScriptElement>
      section: Jsxify<HTMLElement>
      select: Jsxify<HTMLSelectElement>
      small: Jsxify<HTMLElement>
      source: Jsxify<HTMLSourceElement>
      span: Jsxify<HTMLSpanElement>
      strong: Jsxify<HTMLElement>
      style: Jsxify<HTMLStyleElement>
      sub: Jsxify<HTMLElement>
      summary: Jsxify<HTMLElement>
      sup: Jsxify<HTMLElement>
      table: Jsxify<HTMLTableElement>
      template: Jsxify<HTMLTemplateElement>
      tbody: Jsxify<HTMLTableSectionElement>
      td: Jsxify<HTMLTableCellElement>
      textarea: Jsxify<HTMLTextAreaElement>
      tfoot: Jsxify<HTMLTableSectionElement>
      th: Jsxify<HTMLTableCellElement>
      thead: Jsxify<HTMLTableSectionElement>
      time: Jsxify<HTMLElement>
      title: Jsxify<HTMLTitleElement>
      tr: Jsxify<HTMLTableRowElement>
      track: Jsxify<HTMLTrackElement>
      u: Jsxify<HTMLElement>
      ul: Jsxify<HTMLUListElement>
      var: Jsxify<HTMLElement>
      video: Jsxify<HTMLVideoElement>
      wbr: Jsxify<HTMLElement>

      // SVG
      svg: Jsxify<SVGSVGElement>
      animate: Jsxify<SVGAnimateElement>
      animateMotion: Jsxify<SVGElement>
      animateTransform: Jsxify<SVGAnimateTransformElement>
      circle: Jsxify<SVGCircleElement>
      clipPath: Jsxify<SVGClipPathElement>
      defs: Jsxify<SVGDefsElement>
      desc: Jsxify<SVGDescElement>
      ellipse: Jsxify<SVGEllipseElement>
      feBlend: Jsxify<SVGFEBlendElement>
      feColorMatrix: Jsxify<SVGFEColorMatrixElement>
      feComponentTransfer: Jsxify<SVGFEComponentTransferElement>
      feComposite: Jsxify<SVGFECompositeElement>
      feConvolveMatrix: Jsxify<SVGFEConvolveMatrixElement>
      feDiffuseLighting: Jsxify<SVGFEDiffuseLightingElement>
      feDisplacementMap: Jsxify<SVGFEDisplacementMapElement>
      feDistantLight: Jsxify<SVGFEDistantLightElement>
      feDropShadow: Jsxify<SVGFEDropShadowElement>
      feFlood: Jsxify<SVGFEFloodElement>
      feFuncA: Jsxify<SVGFEFuncAElement>
      feFuncB: Jsxify<SVGFEFuncBElement>
      feFuncG: Jsxify<SVGFEFuncGElement>
      feFuncR: Jsxify<SVGFEFuncRElement>
      feGaussianBlur: Jsxify<SVGFEGaussianBlurElement>
      feImage: Jsxify<SVGFEImageElement>
      feMerge: Jsxify<SVGFEMergeElement>
      feMergeNode: Jsxify<SVGFEMergeNodeElement>
      feMorphology: Jsxify<SVGFEMorphologyElement>
      feOffset: Jsxify<SVGFEOffsetElement>
      fePointLight: Jsxify<SVGFEPointLightElement>
      feSpecularLighting: Jsxify<SVGFESpecularLightingElement>
      feSpotLight: Jsxify<SVGFESpotLightElement>
      feTile: Jsxify<SVGFETileElement>
      feTurbulence: Jsxify<SVGFETurbulenceElement>
      filter: Jsxify<SVGFilterElement>
      foreignObject: Jsxify<SVGForeignObjectElement>
      g: Jsxify<SVGGElement>
      image: Jsxify<SVGImageElement>
      line: Jsxify<SVGLineElement>
      linearGradient: Jsxify<SVGLinearGradientElement>
      marker: Jsxify<SVGMarkerElement>
      mask: Jsxify<SVGMaskElement>
      metadata: Jsxify<SVGMetadataElement>
      mpath: Jsxify<SVGElement>
      path: Jsxify<SVGPathElement>
      pattern: Jsxify<SVGPatternElement>
      polygon: Jsxify<SVGPolygonElement>
      polyline: Jsxify<SVGPolylineElement>
      radialGradient: Jsxify<SVGRadialGradientElement>
      rect: Jsxify<SVGRectElement>
      stop: Jsxify<SVGStopElement>
      switch: Jsxify<SVGSwitchElement>
      symbol: Jsxify<SVGSymbolElement>
      text: Jsxify<SVGTextElement>
      textPath: Jsxify<SVGTextPathElement>
      tspan: Jsxify<SVGTSpanElement>
      use: Jsxify<SVGUseElement>
      view: Jsxify<SVGViewElement>
    }
  }
}
