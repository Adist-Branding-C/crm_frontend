import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './PageHeader.css';
const Breadcrumb = ({ items }) => {
    if (!items || items.length === 0)
        return null;
    return (_jsx("div", { className: "page-breadcrumb", children: items.map((item, index) => (_jsxs(React.Fragment, { children: [index > 0 && _jsx(ChevronRight, { size: 14, className: "breadcrumb-separator" }), item.link ? (_jsx(Link, { to: item.link, className: "breadcrumb-item", children: item.label })) : (_jsx("span", { className: "breadcrumb-item active", children: item.label }))] }, index))) }));
};
const PageHeader = ({ title, description, action, breadcrumb }) => {
    const defaultBreadcrumb = [
        { label: 'Tasks', link: '/user/tasks' },
        { label: title, link: null }
    ];
    return (_jsx("div", { className: "page-header", children: _jsxs("div", { className: "page-header-content", children: [_jsxs("div", { className: "page-header-text", children: [(breadcrumb !== false) && _jsx(Breadcrumb, { items: breadcrumb || defaultBreadcrumb }), _jsx("h1", { className: "page-title", children: title }), description && _jsx("p", { className: "page-description", children: description })] }), action && _jsx("div", { className: "page-header-action", children: action })] }) }));
};
export { Breadcrumb };
export default PageHeader;
//# sourceMappingURL=PageHeader.js.map