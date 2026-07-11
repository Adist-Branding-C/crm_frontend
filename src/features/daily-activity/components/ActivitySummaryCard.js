import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Activity as ActivityIcon } from 'lucide-react';
import './ActivitySummaryCard.css';
const ActivitySummaryCard = ({ totalActivities }) => (_jsxs("div", { className: "activity-count-section", children: [_jsx("div", { className: "activity-count-icon", children: _jsx(ActivityIcon, { size: 24 }) }), _jsxs("div", { className: "activity-count-info", children: [_jsx("span", { className: "activity-count-label", children: "Activity Count" }), _jsx("span", { className: "activity-count-number", children: totalActivities })] })] }));
export default ActivitySummaryCard;
//# sourceMappingURL=ActivitySummaryCard.js.map