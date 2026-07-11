import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
const subMenuItems = [
    { id: 'agent', title: 'Agent', link: '/account' },
    { id: 'roles', title: 'Roles', link: '/account/roles' },
    { id: 'department', title: 'Departments', link: '/account/department' },
    { id: 'workmode', title: 'Staff Work Modes', link: '/account/workmode' },
    { id: 'checkout', title: 'Checkout Note', link: '/account/checkout' },
    { id: 'designation', title: 'Designations', link: '/account/designation' },
    { id: 'branch', title: 'Branch', link: '/account/branch' },
    { id: 'mailconfig', title: 'Mail Configuration', link: '/account/mailconfig' },
    { id: 'emailtemplate', title: 'Email Template', link: '/account/emailtemplate' },
    { id: 'whatsapptemplate', title: 'Whatsapp Template', link: '/account/whatsapptemplate' },
    { id: 'profile', title: 'Profile', link: '/account/profile' },
    { id: 'password', title: 'Change Password', link: '/account/password' },
];
const AccountSidebar = ({ activeItem }) => {
    const location = useLocation();
    const getCurrentActiveItem = () => {
        const currentPath = location.pathname;
        const active = subMenuItems.find(item => item.link === currentPath);
        return active ? active.id : 'agent';
    };
    const currentActive = activeItem || getCurrentActiveItem();
    return (_jsxs("div", { className: "account-sidebar", children: [_jsxs("div", { className: "account-sidebar-header", children: [_jsx("div", { className: "account-logo", children: _jsx("img", { src: "https://app.getleadcrm.com/backend/images/images-V2/logo-new.svg", alt: "Getlead" }) }), _jsxs("p", { children: ["Your plan expires in ", _jsx("span", { children: "75 days" })] })] }), _jsxs("div", { className: "account-menu-section", children: [_jsx("div", { className: "account-menu-title", children: _jsx("h4", { children: "Account settings" }) }), _jsx("div", { className: "account-menu-links", children: subMenuItems.map((item) => (_jsx(Link, { to: item.link, className: item.id === currentActive ? 'active' : '', children: item.title }, item.id))) })] })] }));
};
export default AccountSidebar;
//# sourceMappingURL=AccountSidebar.js.map