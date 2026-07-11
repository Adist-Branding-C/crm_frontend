import { jsx as _jsx } from "react/jsx-runtime";
const STATUS_CLASS_MAP = {
    active: 'status-active',
    inactive: 'status-inactive',
};
const SettingsStatusBadge = ({ status }) => {
    const displayStatus = status || 'Active';
    const cssClass = STATUS_CLASS_MAP[displayStatus.toLowerCase()] || 'status-active';
    return _jsx("span", { className: `status-badge ${cssClass}`, children: displayStatus });
};
export default SettingsStatusBadge;
//# sourceMappingURL=SettingsStatusBadge.js.map