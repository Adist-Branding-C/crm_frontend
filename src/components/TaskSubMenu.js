import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ListChecks, Phone, Megaphone, CheckSquare, ChevronRight, ChevronDown } from 'lucide-react';
import './TaskSubMenu.css';
const taskMenuItems = [
    { id: 'tasks', label: 'Task', path: '/user/tasks', icon: ListChecks },
    { id: 'call-tasks', label: 'Call Tasks', path: '/user/call-tasks', icon: Phone },
    { id: 'campaign-tasks', label: 'Campaign Tasks', path: '/user/campaign-tasks', icon: Megaphone },
    { id: 'deal-tasks', label: 'Deal Tasks', path: '/user/deal-tasks', icon: CheckSquare },
];
const TaskSubMenu = ({ expanded: propExpanded, onToggle }) => {
    const location = useLocation();
    const isTaskRoute = taskMenuItems.some(item => item.path === location.pathname);
    const isExpanded = propExpanded !== undefined ? propExpanded : isTaskRoute;
    const currentParent = taskMenuItems.find(item => item.path === location.pathname);
    const handleToggle = () => {
        if (onToggle) {
            onToggle(!isExpanded);
        }
    };
    return (_jsxs("div", { className: `task-submenu ${isExpanded ? 'expanded' : 'collapsed'}`, children: [_jsxs("button", { className: "task-submenu-toggle", onClick: handleToggle, children: [_jsxs("span", { className: "task-submenu-label", children: [_jsx(ListChecks, { size: 18 }), _jsx("span", { children: "Tasks" })] }), isExpanded ? (_jsx(ChevronDown, { size: 16, className: "chevron-icon" })) : (_jsx(ChevronRight, { size: 16, className: "chevron-icon" }))] }), isExpanded && (_jsx("div", { className: "task-submenu-items", children: taskMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (_jsxs(NavLink, { to: item.path, className: `task-submenu-item ${isActive ? 'active' : ''}`, children: [_jsx(Icon, { size: 16 }), _jsx("span", { children: item.label })] }, item.id));
                }) }))] }));
};
export { taskMenuItems };
export default TaskSubMenu;
//# sourceMappingURL=TaskSubMenu.js.map