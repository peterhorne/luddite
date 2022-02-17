"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.append = exports.dom = exports.html = exports.factory = exports.Fragment = void 0;
var Fragment = function (_a) {
    var children = _a.children;
    return children || null;
};
exports.Fragment = Fragment;
var factory = function (type, props) {
    var nestedChildren = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        nestedChildren[_i - 2] = arguments[_i];
    }
    var children = nestedChildren.flat();
    return {
        type: type,
        props: props || {},
        children: children
    };
};
exports.factory = factory;
var html = function (elem) {
    if (!elem)
        return '';
    if (typeof elem === 'string')
        return elem;
    var type = elem.type, props = elem.props, children = elem.children;
    if (typeof type === 'function') {
        var out = type(__assign(__assign({}, props), { children: children }));
        if (out === null)
            return '';
        if (typeof out === 'string')
            return out;
        // FIXME: types indicate this isn't needed, but it is
        if (Array.isArray(out))
            return out.map(exports.html).join('');
        return (0, exports.html)(out);
    }
    var attrs = props
        ? Object.entries(props)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, "=\"").concat(value, "\"");
        })
            .join(' ')
        : null;
    var domChildren = Array.isArray(children)
        ? children.map(exports.html).join('')
        : (0, exports.html)(children);
    return "<".concat(type).concat(attrs ? ' ' + attrs : '', ">").concat(domChildren, "</").concat(type, ">");
};
exports.html = html;
var dom = function (elem) {
    if (typeof elem === 'string')
        return [elem];
    var type = elem.type, props = elem.props, children = elem.children;
    if (typeof type === 'function') {
        var out = type(__assign(__assign({}, props), { children: children }));
        if (out === null)
            return [];
        if (typeof out === 'string')
            return [out];
        // FIXME: types indicate this isn't needed, but it is
        if (Array.isArray(out)) {
            return out.reduce(function (acc, x) { return __spreadArray(__spreadArray([], acc, true), (0, exports.dom)(x), true); }, []);
        }
        return (0, exports.dom)(out);
    }
    var node = document.createElement(type);
    Object.entries(props).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        ;
        node[key] = value;
    });
    var childNodes = Array.isArray(children)
        ? children.reduce(function (acc, x) { return __spreadArray(__spreadArray([], acc, true), (0, exports.dom)(x), true); }, [])
        : (0, exports.dom)(children);
    (0, exports.append)(node, childNodes);
    return [node];
};
exports.dom = dom;
var append = function (node, children) {
    children.forEach(function (child) {
        if (typeof child === 'string') {
            node.innerText = child;
        }
        else {
            node.appendChild(child);
        }
    });
};
exports.append = append;
