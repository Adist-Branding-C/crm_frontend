import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import { LEAD_SETTINGS_TABS } from '../constants/navigation';
const LeadSettingsSidebar = () => (_jsx("div", { className: "settings-tabs", children: LEAD_SETTINGS_TABS.map(tab => {
        const Icon = tab.icon;
        return (_jsxs(NavLink, { to: tab.path, className: ({ isActive }) => `settings-tab${isActive ? ' active' : ''}`, children: [_jsx(Icon, { size: 16 }), _jsx("span", { style: { paddingLeft: '10px' }, children: tab.label })] }, tab.id));
    }) }));
export default LeadSettingsSidebar;
//# sourceMappingURL=LeadSettingsSidebar.js.map