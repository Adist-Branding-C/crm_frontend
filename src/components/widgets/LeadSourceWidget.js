import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './WidgetStyles.css';
const LeadSourceWidget = () => {
    const data = [
        { label: 'Facebook', value: '08', color: '#e2e8f0' },
        { label: 'Instagram', value: '50', color: '#cbd5e1' },
        { label: 'Advertisement', value: '100', color: '#e2e8f0' },
        { label: 'Sale', value: '08', color: '#cbd5e1' },
        { label: 'Marketing', value: '50', color: '#e2e8f0' },
        { label: 'Other', value: '100', color: '#cbd5e1' },
    ];
    return (_jsxs("div", { className: "card widget-base", children: [_jsx("h3", { className: "widget-title", children: "Lead source" }), _jsx("div", { className: "list-container", children: data.map((item, index) => (_jsxs("div", { className: "list-item", children: [_jsxs("div", { className: "list-item-left", children: [_jsx("div", { className: "color-box", style: { backgroundColor: item.color } }), _jsx("span", { children: item.label })] }), _jsx("span", { className: "list-item-value", children: item.value })] }, index))) })] }));
};
export default LeadSourceWidget;
//# sourceMappingURL=LeadSourceWidget.js.map