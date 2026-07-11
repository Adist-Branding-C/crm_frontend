import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const DealsStatsBar = React.memo(({ totalAmount, totalCount }) => (_jsxs("div", { className: "deals-stats-row", children: [_jsxs("div", { className: "stat-item", children: [_jsx("span", { className: "stat-label", children: "Total Deal Amount:" }), _jsxs("span", { className: "stat-value", children: ["\u20B9", totalAmount.toLocaleString()] })] }), _jsxs("div", { className: "stat-item", children: [_jsx("span", { className: "stat-label", children: "Total Deals Count:" }), _jsx("span", { className: "stat-value", children: totalCount })] })] })));
DealsStatsBar.displayName = 'DealsStatsBar';
export default DealsStatsBar;
//# sourceMappingURL=DealsStatsBar.js.map