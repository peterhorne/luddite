"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.append = exports.dom = exports.html = void 0;
const html = (elem) => {
    if (!elem)
        return '';
    if (typeof elem === 'string')
        return elem;
    const { type, props } = elem;
    if (typeof type === 'function') {
        const out = type(props);
        if (out === null)
            return '';
        if (typeof out === 'string')
            return out;
        // FIXME: types indicate this isn't needed, but it is
        if (Array.isArray(out))
            return out.map(exports.html).join('');
        return (0, exports.html)(out);
    }
    const attrs = props
        ? Object.entries(props)
            .filter(([key]) => key !== 'children')
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ')
        : null;
    const domChildren = props.children
        ? Array.isArray(props.children)
            ? props.children.map(exports.html).join('')
            : (0, exports.html)(props.children)
        : '';
    return `<${type}${attrs ? ' ' + attrs : ''}>${domChildren}</${type}>`;
};
exports.html = html;
const dom = (elem) => {
    if (typeof elem === 'string')
        return [elem];
    const { type, props } = elem;
    if (typeof type === 'function') {
        const out = type(props);
        if (out === null)
            return [];
        if (typeof out === 'string')
            return [out];
        // FIXME: types indicate this isn't needed, but it is
        if (Array.isArray(out)) {
            return out.reduce((acc, x) => [...acc, ...(0, exports.dom)(x)], []);
        }
        return (0, exports.dom)(out);
    }
    const node = document.createElement(type);
    Object.entries(props).forEach(([key, value]) => {
        ;
        node[key] = value;
    });
    const childNodes = props.children
        ? Array.isArray(props.children)
            ? props.children.reduce((acc, x) => [...acc, ...(0, exports.dom)(x)], [])
            : (0, exports.dom)(props.children)
        : [];
    (0, exports.append)(node, childNodes);
    return [node];
};
exports.dom = dom;
const append = (node, children) => {
    children.forEach(child => {
        if (typeof child === 'string') {
            node.innerText = child;
        }
        else {
            node.appendChild(child);
        }
    });
};
exports.append = append;
