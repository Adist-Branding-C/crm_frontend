import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import AgentPage from '../agent/pages/AgentPage';
import './AccountSettings.css';
const AccountSettings = () => {
    return (_jsxs("div", { className: "account-page", children: [_jsx(PageHeader, { title: "Account Settings", description: "Manage your login credentials, settings, and preferences" }), _jsx(SettingsTabs, {}), _jsx("div", { className: "account-content", style: { width: '100%', maxWidth: '100%' }, children: _jsx(AgentPage, {}) })] }));
};
export default AccountSettings;
//# sourceMappingURL=AccountSettings.js.map