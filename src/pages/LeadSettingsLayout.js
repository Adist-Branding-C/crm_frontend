import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { FileText, Tag, Globe, Layers, PlusCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './LeadSettings.css';
const menuItems = [
    { id: 'purpose', label: 'Purpose', link: '/settings/lead-settings/purpose', icon: FileText },
    { id: 'status', label: 'Status', link: '/settings/lead-settings/status', icon: Tag },
    { id: 'source', label: 'Source', link: '/settings/lead-settings/source', icon: Globe },
    { id: 'types', label: 'Types', link: '/settings/lead-settings/types', icon: Layers },
    { id: 'additional', label: 'Additional Fields', link: '/settings/lead-settings/additional', icon: PlusCircle },
];
const LeadSettingsLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/settings/lead-settings') {
            navigate('/settings/lead-settings/purpose', { replace: true });
        }
    }, [location.pathname, navigate]);
    const isRoot = location.pathname === '/settings/lead-settings';
    return (_jsxs("div", { className: "lead-settings-page", children: [_jsx(PageHeader, { title: "Lead Settings", description: "Configure lead purposes, statuses, sources and types" }), _jsxs("div", { className: "lead-settings-layout", children: [_jsx("div", { className: "settings-menu", children: menuItems.map(item => (_jsxs(Link, { to: item.link, className: `menu-item ${location.pathname === item.link ? 'active' : ''}`, children: [_jsx(item.icon, { size: 18 }), item.label] }, item.id))) }), _jsx("div", { className: "settings-content", children: !isRoot && _jsx(Outlet, {}) })] })] }));
};
export default LeadSettingsLayout;
//# sourceMappingURL=LeadSettingsLayout.js.map