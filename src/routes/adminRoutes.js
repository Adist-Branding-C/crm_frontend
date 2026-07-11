import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from 'react-router-dom';
import AccountPage from '../features/account-settings/pages/AccountSettings';
import DepartmentPage from '../features/account-settings/department/pages/DepartmentPage';
import WorkModePage from '../features/account-settings/staff-work-modes/pages/WorkModePage';
import CheckoutNotePage from '../features/account-settings/checkout-note/pages/CheckoutNotePage';
import DesignationPage from '../features/account-settings/designations/pages/DesignationPage';
import BranchPage from '../features/account-settings/branch/pages/BranchPage';
import MailConfigPage from '../features/mail-config/pages/MailConfigPage';
import EmailTemplatePage from '../features/account-settings/email-template/pages/EmailTemplatePage';
import ProfilePage from '../features/profile/pages/ProfilePage';
import PasswordPage from '../features/account-settings/password/pages/PasswordPage';
import WhatsAppTemplatePage from '../features/account-settings/whatsapp-template/pages/WhatsappTemplatePage';
export default (_jsxs(_Fragment, { children: [_jsx(Route, { path: "account", element: _jsx(AccountPage, {}) }), _jsx(Route, { path: "account/department", element: _jsx(DepartmentPage, {}) }), _jsx(Route, { path: "account/workmode", element: _jsx(WorkModePage, {}) }), _jsx(Route, { path: "account/checkout", element: _jsx(CheckoutNotePage, {}) }), _jsx(Route, { path: "account/designation", element: _jsx(DesignationPage, {}) }), _jsx(Route, { path: "account/branch", element: _jsx(BranchPage, {}) }), _jsx(Route, { path: "account/mailconfig", element: _jsx(MailConfigPage, {}) }), _jsx(Route, { path: "account/emailtemplate", element: _jsx(EmailTemplatePage, {}) }), _jsx(Route, { path: "account/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "account/password", element: _jsx(PasswordPage, {}) }), _jsx(Route, { path: "account/whatsapptemplate", element: _jsx(WhatsAppTemplatePage, {}) })] }));
//# sourceMappingURL=adminRoutes.js.map