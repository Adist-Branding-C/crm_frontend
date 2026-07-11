import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { settingsItems } from '../constants';
import './SettingsPage.css';
const SettingsPage = () => {
    return (_jsxs("div", { className: "settings-page", children: [_jsx(PageHeader, { title: "Settings", description: "Manage your account settings and preferences" }), _jsx("div", { className: "settings-grid", children: settingsItems.map((item) => (_jsxs(Link, { to: item.link, className: "settings-card", children: [_jsx("div", { className: "settings-icon", children: item.icon }), _jsx("h6", { children: item.title }), _jsx("p", { children: item.description }), _jsx("div", { className: "settings-link", children: _jsxs("p", { children: [item.title.toLowerCase(), " settings"] }) })] }, item.id))) })] }));
};
export default SettingsPage;
//# sourceMappingURL=SettingsPage.js.map