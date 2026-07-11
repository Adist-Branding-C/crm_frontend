import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { CheckCircle, MessageCircle, Home, LayoutDashboard, Flame, DollarSign, CheckSquare, Megaphone, ListChecks, HeartPulse, Network, Users, BookOpen, Settings, UserCircle, Bell, FileText, Calendar, Activity, BarChart3, Kanban, Building } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
const Sidebar = () => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: MessageCircle, label: 'Leads', path: '/leads' },
        // { icon: UserCircle, label: 'Enquiries', path: '/enquiries' },
        { icon: Bell, label: 'Followup Required', path: '/followup-required' },
        { icon: Flame, label: 'Spotlight', path: '/spotlight' },
        { icon: DollarSign, label: 'Deals', path: '/user/deals' },
        { icon: Kanban, label: 'Sales Pipeline', path: '/sales-pipeline' },
        { icon: ListChecks, label: 'Tasks', path: '/user/tasks' },
        { icon: Calendar, label: 'Calendar', path: '/calendar' },
        { icon: Activity, label: 'Daily Activity', path: '/daily-activity' },
        { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
        { icon: FileText, label: 'Reports', path: '/reports' },
        { icon: BarChart3, label: 'Staff Performance', path: '/staff-performance' },
        { icon: Building, label: 'Companies', path: '/companies' },
    ];
    return (_jsxs("div", { className: "sidebar", children: [_jsx("div", { className: "sidebar-logo", children: _jsx("div", { className: "logo-circle", children: _jsx(CheckCircle, { size: 20, color: "#fff" }) }) }), _jsxs("div", { className: "sidebar-nav", children: [menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (_jsx(NavLink, { to: item.path, className: ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`, title: item.label, end: item.path === '/home', children: _jsx(Icon, { size: 20, className: "nav-icon" }) }, index));
                    }), _jsx(NavLink, { to: "/settings", className: ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`, title: "Settings", end: true, children: _jsx(Settings, { size: 20, className: "nav-icon" }) })] })] }));
};
export default Sidebar;
//# sourceMappingURL=Sidebar.js.map