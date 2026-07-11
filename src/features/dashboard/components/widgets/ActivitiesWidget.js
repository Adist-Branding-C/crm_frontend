import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './ActivitiesWidget.css';
import { ACTIVITIES_DATA as activities } from '../../constants/dashboard.constants';
const ActivitiesWidget = () => {
    return (_jsxs("div", { className: "card widget-base activities-widget", children: [_jsx("h3", { className: "widget-title", children: "Activities" }), _jsx("div", { className: "activities-list", children: activities.map((activity, index) => (_jsxs("div", { className: "activity-item", children: [_jsx("div", { className: `timeline-dot ${activity.highlight ? 'timeline-dot-highlight' : ''}` }), index !== activities.length - 1 && _jsx("div", { className: "timeline-line" }), _jsxs("div", { className: "activity-content", children: [_jsx("div", { className: "activity-title", children: activity.title }), _jsx("div", { className: "activity-time", children: activity.time })] })] }, activity.id))) })] }));
};
export default ActivitiesWidget;
//# sourceMappingURL=ActivitiesWidget.js.map