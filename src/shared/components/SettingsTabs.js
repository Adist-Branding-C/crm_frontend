import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Building2, Clock, FileText, MapPinned, Mail, MessageSquare, User, Lock, Briefcase, Plus, Minus } from 'lucide-react';
const defaultTabs = [
    { id: 'agent', title: 'Agent', link: '/account', icon: Users },
    { id: 'department', title: 'Departments', link: '/account/department', icon: Building2 },
    { id: 'workmode', title: 'Staff Work Modes', link: '/account/workmode', icon: Clock },
    { id: 'checkout', title: 'Checkout Note', link: '/account/checkout', icon: FileText },
    { id: 'designation', title: 'Designations', link: '/account/designation', icon: Briefcase },
    { id: 'branch', title: 'Branch', link: '/account/branch', icon: MapPinned },
    { id: 'mailconfig', title: 'Mail Configuration', link: '/account/mailconfig', icon: Mail },
    { id: 'emailtemplate', title: 'Email Template', link: '/account/emailtemplate', icon: Mail },
    { id: 'whatsapptemplate', title: 'Whatsapp Template', link: '/account/whatsapptemplate', icon: MessageSquare },
    { id: 'profile', title: 'Profile', link: '/account/profile', icon: User },
    { id: 'password', title: 'Change Password', link: '/account/password', icon: Lock },
];
const SettingsTabs = ({ items = defaultTabs }) => {
    const location = useLocation();
    const [limit, setLimit] = useState(8);
    return (_jsxs("div", { className: "settings-tabs", children: [items.slice(0, limit).map((item) => {
                const Icon = item.icon;
                return (_jsxs(Link, { to: item.link, className: `settings-tab ${location.pathname === item.link ? 'active' : ''}`, children: [_jsx(Icon, { size: 16 }), _jsx("span", { style: { paddingLeft: '10px' }, children: item.title })] }, item.id));
            }), items.length > 8 && (_jsxs("span", { onClick: () => setLimit(limit > 8 ? 8 : items.length), className: `settings-tab ${location.pathname === items[8]?.link ? 'active' : ''}`, role: "button", tabIndex: 0, onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ')
                    setLimit(limit > 8 ? 8 : items.length); }, children: [limit > 8 ? _jsx(Minus, { size: 16 }) : _jsx(Plus, { size: 16 }), _jsx("span", { style: { paddingLeft: '10px' }, children: limit > 8 ? 'Reset' : 'More' })] }))] }));
};
export default SettingsTabs;
//# sourceMappingURL=SettingsTabs.js.map