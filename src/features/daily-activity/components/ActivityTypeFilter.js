import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './ActivityTypeFilter.css';
const ActivityTypeFilter = ({ activityTypeFilter, activityTypes, onChange }) => (_jsx("div", { className: "activity-type-filter", children: _jsxs("div", { className: "activity-type-dropdown-group", children: [_jsx("label", { htmlFor: "activity-type-filter", children: "Activity Type" }), _jsx("select", { id: "activity-type-filter", className: "filter-select", value: activityTypeFilter, onChange: (e) => onChange(e.target.value), children: activityTypes.map(type => (_jsx("option", { value: type.value, children: type.label }, type.value))) })] }) }));
export default ActivityTypeFilter;
//# sourceMappingURL=ActivityTypeFilter.js.map