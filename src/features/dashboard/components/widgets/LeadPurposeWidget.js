import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './LeadPurposeWidget.css';
import { LEAD_PURPOSE_DATA as data } from '../../constants/dashboard.constants';
const LeadPurposeWidget = () => {
    return (_jsxs("div", { className: "card widget-base lead-purpose-widget", children: [_jsx("h3", { className: "widget-title", children: "Lead Purpose" }), _jsx("div", { className: "purpose-list", children: data.map((item, index) => (_jsxs("div", { className: "purpose-item", children: [_jsxs("div", { className: "purpose-header", children: [_jsx("span", { className: "purpose-label", children: item.label }), _jsx("span", { className: "purpose-value", children: item.value })] }), _jsx("div", { className: "purpose-bar-bg", children: _jsx("div", { className: "purpose-bar-fill", style: { width: item.width, backgroundColor: item.color } }) })] }, index))) })] }));
};
export default LeadPurposeWidget;
//# sourceMappingURL=LeadPurposeWidget.js.map