import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './WidgetStyles.css';
const CampaignsWidget = () => {
    const data = [
        { name: 'Group A', value: 45, color: '#fbbf24' },
        { name: 'Group B', value: 55, color: '#e0323e' },
    ];
    return (_jsxs("div", { className: "card widget-base campaigns-widget", children: [_jsx("h3", { className: "widget-title", children: "Campaigns" }), _jsx("div", { style: { width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }, children: _jsx(ResponsiveContainer, { width: "100%", height: "80%", children: _jsx(PieChart, { children: _jsx(Pie, { data: data, cx: "50%", cy: "50%", innerRadius: 0, outerRadius: 80, dataKey: "value", stroke: "none", children: data.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }) }) }) })] }));
};
export default CampaignsWidget;
//# sourceMappingURL=CampaignsWidget.js.map