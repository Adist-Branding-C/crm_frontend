import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './WidgetStyles.css';
const LeadStatusWidget = () => {
    const data = [
        { label: 'New', value: '08', color: '#f472b6' },
        { label: 'Interested', value: '50', color: '#38bdf8' },
        { label: 'Cool', value: '100', color: '#eab308' },
        { label: 'Warm', value: '08', color: '#fb7185' },
        { label: 'No reply', value: '50', color: '#34d399' },
        { label: 'Hot', value: '100', color: '#fbbf24' },
    ];
    return (_jsxs("div", { className: "card widget-base", children: [_jsx("h3", { className: "widget-title", children: "Lead status" }), _jsx("div", { className: "list-container", children: data.map((item, index) => (_jsxs("div", { className: "list-item", children: [_jsxs("div", { className: "list-item-left", children: [_jsx("div", { className: "color-box", style: { backgroundColor: item.color } }), _jsx("span", { children: item.label })] }), _jsx("span", { className: "list-item-value", children: item.value })] }, index))) })] }));
};
export default LeadStatusWidget;
//# sourceMappingURL=LeadStatusWidget.js.map