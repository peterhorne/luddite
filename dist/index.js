var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/index.ts
var Fragment = ({ children }) => children || null;
var factory = (type, props, ...nestedChildren) => {
  const children = nestedChildren.flat();
  return {
    type,
    props: props || {},
    children
  };
};
var html = (elem) => {
  if (!elem)
    return "";
  if (typeof elem === "string")
    return elem;
  const { type, props, children } = elem;
  if (typeof type === "function") {
    const out = type(__spreadProps(__spreadValues({}, props), { children }));
    if (out === null)
      return "";
    if (typeof out === "string")
      return out;
    if (Array.isArray(out))
      return out.map(html).join("");
    return html(out);
  }
  const attrs = props ? Object.entries(props).map(([key, value]) => `${key}="${value}"`).join(" ") : null;
  const domChildren = Array.isArray(children) ? children.map(html).join("") : html(children);
  return `<${type}${attrs ? " " + attrs : ""}>${domChildren}</${type}>`;
};
var dom = (elem) => {
  if (typeof elem === "string")
    return [elem];
  const { type, props, children } = elem;
  if (typeof type === "function") {
    const out = type(__spreadProps(__spreadValues({}, props), { children }));
    if (out === null)
      return [];
    if (typeof out === "string")
      return [out];
    if (Array.isArray(out)) {
      return out.reduce((acc, x) => [...acc, ...dom(x)], []);
    }
    return dom(out);
  }
  const node = document.createElement(type);
  Object.entries(props).forEach(([key, value]) => {
    ;
    node[key] = value;
  });
  const childNodes = Array.isArray(children) ? children.reduce((acc, x) => [...acc, ...dom(x)], []) : dom(children);
  append(node, childNodes);
  return [node];
};
var append = (node, children) => {
  children.forEach((child) => {
    if (typeof child === "string") {
      node.innerText = child;
    } else {
      node.appendChild(child);
    }
  });
};
export {
  Fragment,
  append,
  dom,
  factory,
  html
};
