import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './LeadPurposeWidget.css';
const LeadPurposeWidget = () => {
    const data = [
        { label: 'CRM', value: '02', width: '30%', color: '#f97316' },
        { label: 'GI scratch', value: '08', width: '70%', color: '#8b5cf6' },
        { label: 'Gdesk', value: '12', width: '90%', color: '#e0323e' },
    ];
    return (_jsxs("div", { className: "card widget-base lead-purpose-widget", children: [_jsx("h3", { className: "widget-title", children: "Lead Purpose" }), _jsx("div", { className: "purpose-list", children: data.map((item, index) => (_jsxs("div", { className: "purpose-item", children: [_jsxs("div", { className: "purpose-header", children: [_jsx("span", { className: "purpose-label", children: item.label }), _jsx("span", { className: "purpose-value", children: item.value })] }), _jsx("div", { className: "purpose-bar-bg", children: _jsx("div", { className: "purpose-bar-fill", style: { width: item.width, backgroundColor: item.color } }) })] }, index))) })] }));
};
export default LeadPurposeWidget;
//# sourceMappingURL=LeadPurposeWidget.js.map