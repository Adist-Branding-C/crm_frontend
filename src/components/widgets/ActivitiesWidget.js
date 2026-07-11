import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './ActivitiesWidget.css';
const ActivitiesWidget = () => {
    const activities = [
        {
            id: 1,
            title: 'Farah left a Note',
            time: 'Jan 14 at 2:40 PM',
            highlight: false
        },
        {
            id: 2,
            title: 'Getlead demo created a Call task',
            time: 'Jan 14 at 2:40 PM',
            highlight: true
        }
        // Can add more if scrollable
    ];
    return (_jsxs("div", { className: "card widget-base activities-widget", children: [_jsx("h3", { className: "widget-title", children: "Activities" }), _jsx("div", { className: "activities-list", children: activities.map((activity, index) => (_jsxs("div", { className: "activity-item", children: [_jsx("div", { className: `timeline-dot ${activity.highlight ? 'timeline-dot-highlight' : ''}` }), index !== activities.length - 1 && _jsx("div", { className: "timeline-line" }), _jsxs("div", { className: "activity-content", children: [_jsx("div", { className: "activity-title", children: activity.title }), _jsx("div", { className: "activity-time", children: activity.time })] })] }, activity.id))) })] }));
};
export default ActivitiesWidget;
//# sourceMappingURL=ActivitiesWidget.js.map