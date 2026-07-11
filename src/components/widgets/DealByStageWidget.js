import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './WidgetStyles.css';
const DealByStageWidget = () => {
    const data = [
        { label: 'New', value: '08', color: '#f472b6' },
        { label: 'Follow up', value: '50', color: '#3b82f6' },
        { label: 'Partially interested', value: '100', color: '#fbbf24' },
        { label: 'Interested', value: '08', color: '#10b981' },
        // Add a few more to match image if needed
    ];
    return (_jsxs("div", { className: "card widget-base", children: [_jsx("h3", { className: "widget-title", children: "Deal by stage" }), _jsx("div", { className: "list-container", children: data.map((item, index) => (_jsxs("div", { className: "list-item", children: [_jsxs("div", { className: "list-item-left", children: [_jsx("div", { className: "color-box", style: { backgroundColor: item.color } }), _jsx("span", { children: item.label })] }), _jsx("span", { className: "list-item-value", children: item.value })] }, index))) })] }));
};
export default DealByStageWidget;
//# sourceMappingURL=DealByStageWidget.js.map