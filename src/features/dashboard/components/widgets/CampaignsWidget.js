import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './WidgetStyles.css';
import { CAMPAIGNS_DATA as data } from '../../constants/dashboard.constants';
const CampaignsWidget = () => {
    return (_jsxs("div", { className: "card widget-base campaigns-widget", children: [_jsx("h3", { className: "widget-title", children: "Campaigns" }), _jsx("div", { style: { width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }, children: _jsx(ResponsiveContainer, { width: "100%", height: "80%", children: _jsx(PieChart, { children: _jsx(Pie, { data: data, cx: "50%", cy: "50%", innerRadius: 0, outerRadius: 80, dataKey: "value", stroke: "none", children: data.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }) }) }) })] }));
};
export default CampaignsWidget;
//# sourceMappingURL=CampaignsWidget.js.map