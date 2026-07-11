import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './WidgetStyles.css';
import { DEAL_BY_STAGE_DATA as data } from '../../constants/dashboard.constants';
const DealByStageWidget = () => {
    return (_jsxs("div", { className: "card widget-base", children: [_jsx("h3", { className: "widget-title", children: "Deal by stage" }), _jsx("div", { className: "list-container", children: data.map((item, index) => (_jsxs("div", { className: "list-item", children: [_jsxs("div", { className: "list-item-left", children: [_jsx("div", { className: "color-box", style: { backgroundColor: item.color } }), _jsx("span", { children: item.label })] }), _jsx("span", { className: "list-item-value", children: item.value })] }, index))) })] }));
};
export default DealByStageWidget;
//# sourceMappingURL=DealByStageWidget.js.map