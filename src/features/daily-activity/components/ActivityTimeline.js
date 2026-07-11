import { jsx as _jsx } from "react/jsx-runtime";
import ActivityTimelineCard from './ActivityTimelineCard';
import ActivityEmptyState from './ActivityEmptyState';
import './ActivityTimeline.css';
const ActivityTimeline = ({ activities }) => {
    if (activities.length === 0) {
        return (_jsx("div", { className: "activity-timeline", children: _jsx(ActivityEmptyState, {}) }));
    }
    return (_jsx("div", { className: "activity-timeline", children: activities.map(activity => (_jsx(ActivityTimelineCard, { activity: activity }, activity.id))) }));
};
export default ActivityTimeline;
//# sourceMappingURL=ActivityTimeline.js.map