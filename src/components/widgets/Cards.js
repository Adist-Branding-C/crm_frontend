import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ChevronRight } from 'lucide-react';
import './Cards.css';
export const StatCard = ({ title, value }) => {
    return (_jsxs("div", { className: "card stat-card", children: [_jsx("div", { className: "stat-value", children: value }), _jsxs("div", { className: "stat-footer", children: [_jsx("span", { className: "stat-title", children: title }), _jsx(ChevronRight, { size: 14, className: "stat-icon" })] })] }));
};
export const KpiCard = ({ title, value, isPrimary, isHighlight }) => {
    return (_jsxs("div", { className: `card kpi-card ${isPrimary ? 'primary-outline' : 'secondary-outline'} ${isHighlight ? 'highlighted' : ''}`, children: [_jsx("div", { className: "kpi-value", children: value }), _jsxs("div", { className: "kpi-footer", children: [_jsx("span", { className: "kpi-title", children: title }), _jsx(ChevronRight, { size: 14, className: "kpi-icon" })] })] }));
};
//# sourceMappingURL=Cards.js.map