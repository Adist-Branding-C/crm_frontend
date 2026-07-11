import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import styles from './SettingsTabs.module.css';
const SettingsTabs = ({ tabs }) => {
    return (_jsx("nav", { className: styles.tabs, children: tabs.map((tab) => (_jsxs(NavLink, { to: tab.path, className: ({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`, children: [tab.icon && _jsx("span", { className: styles.icon, children: tab.icon }), _jsx("span", { children: tab.label })] }, tab.path))) }));
};
export default SettingsTabs;
//# sourceMappingURL=SettingsTabs.js.map