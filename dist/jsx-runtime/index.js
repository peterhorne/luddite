"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fragment = exports.jsxDev = exports.jsxs = exports.jsx = void 0;
const jsx = (type, props, _key) => ({
    type,
    props: props || {},
    // children: (props as any)?.children ? [(props as any).children] : null,
});
exports.jsx = jsx;
exports.jsxDev = exports.jsx;
const jsxs = (type, props, _key) => ({
    type,
    props: props || {},
    // children: (props as any)?.children ?? null,
});
exports.jsxs = jsxs;
const Fragment = ({ children }) => children || null;
exports.Fragment = Fragment;
