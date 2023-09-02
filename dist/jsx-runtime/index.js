"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fragment = exports.jsxDev = exports.jsxs = exports.jsx = void 0;
const jsx = (type, props, _key) => ({
    type,
    props: props || {},
});
exports.jsx = jsx;
exports.jsxDev = exports.jsx;
const jsxs = (type, props, _key) => ({
    type,
    props: props || {},
});
exports.jsxs = jsxs;
// TODO: fix as any
const Fragment = ({ children }) => children || null;
exports.Fragment = Fragment;
