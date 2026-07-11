import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Users, DollarSign, Clock, Bell, CreditCard, Link as LinkIcon, Globe } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Settings.css';
const settingsItems = [
    { id: 'account', title: 'Account', description: 'Manage your login credentials, settings, and preferences', link: '/account', icon: _jsx(Settings, { size: 24 }) },
    { id: 'leads', title: 'Lead Settings', description: 'Configure status, source, purpose, and custom fields for seamless management', link: '/settings/lead-settings/purpose', icon: _jsx(Users, { size: 24 }) },
    { id: 'deals', title: 'Deal Settings', description: 'Adjust Deal settings, and custom fields for streamlined management', link: '/user/deal-types', icon: _jsx(DollarSign, { size: 24 }) },
    { id: 'tasks', title: 'Task Settings', description: 'Organize task categories, priorities, and customizations for improved productivity', link: '/user/call_status', icon: _jsx(Clock, { size: 24 }) },
    { id: 'notifications', title: 'Notifications', description: 'Customize alerts, messages, and updates for your account', link: '/user/notifications-users', icon: _jsx(Bell, { size: 24 }) },
    { id: 'subscriptions', title: 'Subscriptions', description: 'View, modify, or cancel your active services and memberships', link: '/user/payment-plans', icon: _jsx(CreditCard, { size: 24 }) },
    { id: 'glconnect', title: 'GL Connect', description: 'Connect your third party integration to Getlead CRM', link: '/user/gl-connect', icon: _jsx(LinkIcon, { size: 24 }) },
    { id: 'general', title: 'General', description: 'Manage your general settings, and preferences', link: '/user/general-settings', icon: _jsx(Globe, { size: 24 }) },
];
const SettingsPage = () => {
    return (_jsxs("div", { className: "settings-page", children: [_jsx(PageHeader, { title: "Settings", description: "Manage your account settings and preferences" }), _jsx("div", { className: "settings-grid", children: settingsItems.map((item) => (_jsxs(Link, { to: item.link, className: "settings-card", children: [_jsx("div", { className: "settings-icon", children: item.icon }), _jsx("h6", { children: item.title }), _jsx("p", { children: item.description }), _jsx("div", { className: "settings-link", children: _jsxs("p", { children: [item.title.toLowerCase(), " settings"] }) })] }, item.id))) })] }));
};
export default SettingsPage;
//# sourceMappingURL=Settings.js.map