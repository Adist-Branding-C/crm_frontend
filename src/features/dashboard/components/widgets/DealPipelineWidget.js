import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import './WidgetStyles.css';
const DealPipelineWidget = () => {
    const data = [
        { name: 'Open', value: 90000, displayValue: '₹90,000', color: '#fbbf24' },
        { name: 'Won', value: 40000, displayValue: '₹40,000', color: '#3b82f6' },
        { name: 'Lost', value: 112000, displayValue: '₹112,000', color: '#ec4899' },
    ];
    const formatYAxis = (tickItem) => {
        return `₹${tickItem}`;
    };
    const CustomLabel = (props) => {
        const { x = 0, y = 0, width = 0, index = 0 } = props;
        const item = data[index];
        return (_jsx("text", { x: x + width / 2, y: y - 10, fill: "#1a1b1d", textAnchor: "middle", fontSize: "12", fontWeight: "600", children: item?.displayValue ?? '' }));
    };
    return (_jsxs("div", { className: "card widget-base deal-pipeline-widget", children: [_jsx("h3", { className: "widget-title", children: "Deal pipeline" }), _jsx("div", { style: { width: '100%', height: '100%', flex: 1, minHeight: 0 }, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: data, margin: { top: 20, right: 0, left: -20, bottom: 0 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#f1f5f9" }), _jsx(XAxis, { dataKey: "name", axisLine: true, tickLine: false, tick: { fontSize: 12, fill: '#6b7280' } }), _jsx(YAxis, { axisLine: false, tickLine: false, tick: { fontSize: 10, fill: '#6b7280' }, tickFormatter: formatYAxis }), _jsx(Bar, { dataKey: "value", barSize: 32, radius: [2, 2, 0, 0], children: data.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) })] }) }) })] }));
};
export default DealPipelineWidget;
//# sourceMappingURL=DealPipelineWidget.js.map