import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, MoreHorizontal, Edit2, Trash2, Search, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Account.css';
import SettingsTabs from '../components/SettingsTabs';
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
const rolesData = [
    { id: 1, name: 'Admin', permissions: 'All Access', createdAt: '2025-11-05', status: 'Active' },
    { id: 2, name: 'Manager', permissions: '25 permissions', createdAt: '2025-11-05', status: 'Active' },
    { id: 3, name: 'Staff', permissions: '15 permissions', createdAt: '2025-11-05', status: 'Active' },
];
const permissionsData = {
    CRM: [
        { name: 'Home', actions: ['View'] },
        { name: 'Dashboard', actions: ['View', 'Dashboard'] },
        { name: 'Change Password', actions: ['View', 'Store'] },
        { name: 'Profile', actions: ['View', 'Show', 'Update'] },
        { name: 'Settings', actions: ['View'] },
        { name: 'User Data', actions: ['Update'] },
        { name: 'MailConfiguration', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data', 'Activate', 'Deactivate', 'Default'] },
        { name: 'Designations', actions: ['List', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Agent', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'View Dashboard', 'Location History', 'Location map', 'View Data'] },
        { name: 'Leads', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data', 'Import Page', 'TimeLine', 'Edit', 'TimeLine Edit', 'TimeLine Update', 'TimeLine Add Note', 'TimeLine Delete', 'Multiple Delete', 'Update lead profile', 'Timeline status change', 'Import Step1', 'Import step2', 'Import step3'] },
        { name: 'Activity', actions: ['View'] },
        { name: 'Facebook Leads', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Calendar', actions: ['List', 'Create', 'View', 'Edit'] },
        { name: 'Group', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Auto Assign', actions: ['List', 'Create', 'Store'] },
        { name: 'Assign To Agent', actions: ['Assign', 'Assign to Multiple'] },
        { name: 'Enquiry Source', actions: ['List', 'Store', 'View', 'Update', 'Delete', 'Data', 'Activate', 'Deactivate'] },
        { name: 'Enquiry Purpose', actions: ['List', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Enquiry Status', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Export', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Whatsapp Template', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data', 'Choose template'] },
        { name: 'SMS Templates', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Email Template', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Lead Types', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Fields', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Followup', actions: ['List', 'Add', 'Update', 'Data'] },
        { name: 'Tasks', actions: ['List', 'Data', 'Import', 'Import Data', 'Delete Multiple', 'Delete', 'Create from Timeline', 'Update', 'Show'] },
        { name: 'Task Category', actions: ['List', 'Data', 'Create', 'Edit', 'Update', 'Store', 'Delete'] },
        { name: 'Calls', actions: ['List', 'Complete Call', 'Complete call push', 'Complete multiple task'] },
        { name: 'Timeline', actions: ['Add Log'] },
        { name: 'Deals', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Get deal data', 'Update timeline data', 'Deal activity', 'Assign deal agent', 'Deal timeline note', 'Get deal note', 'Edit', 'Get Lead Company'] },
        { name: 'Reports', actions: ['Lead Reports', 'Deal Reports', 'Task Reports', 'Checking report', 'Attendance', 'Checking data', 'Attandance list', 'Attandace details'] },
        { name: 'Lead Reports', actions: ['Daily activity', 'Activity Data', 'Status Vise', 'Status vise data', 'Status Change', 'Status change data', 'Source Change', 'Source change data', 'Staff checkin', 'Checkin data', 'Import History', 'Api History', 'History data'] },
        { name: 'Deal Reports', actions: ['Deal Summary', 'Summary data', 'Deal Stage', 'Deal stage data', 'Lead conversion', 'Data'] },
        { name: 'Task Reports', actions: ['Task Vise', 'Data fetch', 'Lead vise', 'Data get'] },
        { name: 'Timeline Activities', actions: ['View Tasks', 'View Deals', 'View Activities', 'View Log Notes', 'View Orders', 'Update Tasks'] },
    ],
    SMS: [
        { name: 'Sms Dashboard', actions: ['View'] },
        { name: 'Compose SMS', actions: ['Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Dynamic Messaging', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Sender Id', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data'] },
        { name: 'API Template', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'SMS History', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    ],
    IVR: [
        { name: 'Ivr Dashboard', actions: ['View'] },
        { name: 'Ivr Flow', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data'] },
        { name: 'Ivr Call Logs', actions: ['List', 'View', 'Data'] },
    ],
    Sales: [
        { name: 'Sales Dashboard', actions: ['View'] },
        { name: 'Product', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete', 'Data'] },
        { name: 'Product Category', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Tax', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Coupon', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
        { name: 'Pos', actions: ['List', 'Create', 'Store', 'View', 'Update', 'Delete'] },
    ],
};
const RolesPage = () => {
    const location = useLocation();
    const [showForm, setShowForm] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [deletingRole, setDeletingRole] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [roleName, setRoleName] = useState('');
    const [permissions, setPermissions] = useState({});
    const filteredRoles = rolesData.filter(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handlePermissionChange = (module, action, checked) => {
        setPermissions(prev => {
            if (checked) {
                return { ...prev, [module + '-' + action]: true };
            }
            else {
                const { [module + '-' + action]: _, ...rest } = prev;
                return rest;
            }
        });
    };
    const handleSelectAll = (module, actions) => {
        const allChecked = actions.every(action => permissions[module + '-' + action]);
        setPermissions(prev => {
            const updated = { ...prev };
            actions.forEach(action => {
                updated[module + '-' + action] = !allChecked;
            });
            return updated;
        });
    };
    const checkAllSelected = (module, actions) => {
        return actions.every(action => permissions[module + '-' + action]);
    };
    const isChecked = (module, action) => {
        return !!permissions[module + '-' + action];
    };
    const handleAddClick = () => {
        setShowForm(true);
        setEditingRole(null);
        setRoleName('');
        setPermissions({});
    };
    const handleEditClick = (role) => {
        setShowForm(true);
        setEditingRole(role);
        setRoleName(role.name);
        setPermissions({});
    };
    const handleBackClick = () => {
        setShowForm(false);
        setEditingRole(null);
        setRoleName('');
        setPermissions({});
    };
    const handleDeleteClick = (role) => {
        setDeletingRole(role);
        setDropdownOpen(null);
    };
    const handleConfirmDelete = () => {
        console.log('Deleting role:', deletingRole);
        setDeletingRole(null);
    };
    const handleCloseDeleteModal = () => {
        setDeletingRole(null);
    };
    return (_jsxs("div", { className: "account-page", children: [_jsx(PageHeader, { title: "Roles", description: "Create and manage user roles and permissions", action: _jsxs("button", { className: "btn btn-primary", onClick: handleAddClick, children: [_jsx(Plus, { size: 16 }), " Add Role"] }) }), _jsx(SettingsTabs, {}), _jsx("div", { className: "account-content", style: { width: '100%', maxWidth: '100%' }, children: !showForm ? (_jsx(_Fragment, { children: _jsxs("div", { className: "table-container", children: [_jsxs("div", { className: "table-header-controls", children: [_jsx("div", { className: "entries-select", children: _jsxs("label", { children: ["Show", _jsxs("select", { value: rowsPerPage, onChange: (e) => setRowsPerPage(Number(e.target.value)), children: [_jsx("option", { value: "10", children: "10" }), _jsx("option", { value: "25", children: "25" }), _jsx("option", { value: "50", children: "50" }), _jsx("option", { value: "100", children: "100" })] }), "entries"] }) }), _jsxs("div", { className: "search-input", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "search", placeholder: "Search", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] })] }), _jsx("div", { className: "table-scroll", children: _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Sl No" }), _jsx("th", { children: "Role Name" }), _jsx("th", { children: "Permissions" }), _jsx("th", { children: "Created At" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: filteredRoles.slice(0, rowsPerPage).map((role, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: role.name }), _jsx("td", { children: role.permissions }), _jsx("td", { children: role.createdAt }), _jsx("td", { children: _jsx("span", { className: 'status-badge status-' + role.status.toLowerCase(), children: role.status }) }), _jsx("td", { children: _jsxs("div", { className: "dropdown-container", children: [_jsx("button", { className: "dropdown-toggle", onClick: () => setDropdownOpen(dropdownOpen === role.id ? null : role.id), children: _jsx(MoreHorizontal, { size: 16 }) }), dropdownOpen === role.id && (_jsxs("div", { className: "dropdown-menu", children: [_jsxs("a", { className: "dropdown-item", onClick: () => handleEditClick(role), children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("a", { className: "dropdown-item", onClick: () => handleDeleteClick(role), children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }) })] }, role.id))) })] }) }), _jsxs("div", { className: "table-footer", children: [_jsx("div", { className: "table-footer-left", children: _jsxs("span", { className: "limit-text", children: ["Limit: ", filteredRoles.length, "/", filteredRoles.length] }) }), _jsxs("div", { className: "table-info", children: ["Showing 1 to ", Math.min(rowsPerPage, filteredRoles.length), " of ", filteredRoles.length, " entries"] })] })] }) })) : (_jsxs("div", { className: "form-container", children: [_jsxs("div", { className: "form-header", children: [_jsx("h3", { children: editingRole ? 'Edit Role' : 'Create New Role' }), _jsx("button", { className: "btn btn-secondary", onClick: handleBackClick, children: "Cancel" })] }), _jsxs("div", { className: "form-body", children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Role Name ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", className: "form-control", placeholder: "Enter role name", value: roleName, onChange: (e) => setRoleName(e.target.value) })] }), _jsxs("div", { className: "permissions-section", children: [_jsx("h4", { children: "Permissions" }), Object.entries(permissionsData).map(([module, permissionsList], idx) => (_jsxs("div", { className: "permission-module", children: [_jsx("div", { className: "module-header", children: _jsx("h5", { children: module }) }), _jsx("div", { className: "module-permissions", children: permissionsList.map((perm, permIdx) => (_jsxs("div", { className: "permission-group", children: [_jsx("div", { className: "permission-header", children: _jsxs("div", { className: "form-check", children: [_jsx("input", { type: "checkbox", className: "form-check-input", id: 'select-all-' + module + '-' + permIdx, checked: checkAllSelected(perm.name, perm.actions), onChange: () => handleSelectAll(perm.name, perm.actions) }), _jsx("label", { className: "form-check-label", htmlFor: 'select-all-' + module + '-' + permIdx, children: perm.name })] }) }), _jsx("div", { className: "permission-actions", children: perm.actions.map((action, actionIdx) => (_jsxs("div", { className: "form-check", children: [_jsx("input", { type: "checkbox", className: "permission form-check-input", id: 'permission-' + module + '-' + permIdx + '-' + actionIdx, checked: isChecked(perm.name, action), onChange: (e) => handlePermissionChange(perm.name, action, e.target.checked) }), _jsx("label", { className: "form-check-label", htmlFor: 'permission-' + module + '-' + permIdx + '-' + actionIdx, children: action })] }, actionIdx))) })] }, permIdx))) })] }, module)))] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary px-4", children: editingRole ? 'Update Role' : 'Save Role' }), _jsx("button", { type: "button", className: "btn btn-secondary ms-2 px-4", onClick: handleBackClick, children: "Cancel" })] })] })] })) }), deletingRole && (_jsx("div", { className: "modal-overlay", onClick: handleCloseDeleteModal, children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { children: "Confirm Delete" }), _jsx("button", { className: "modal-close", onClick: handleCloseDeleteModal, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "modal-body", children: _jsxs("p", { className: "delete-warning", children: ["Are you sure you want to delete ", _jsx("strong", { children: deletingRole.name }), " role?"] }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-danger", onClick: handleConfirmDelete, children: "Confirm" }), _jsx("button", { className: "btn btn-secondary", onClick: handleCloseDeleteModal, children: "Cancel" })] })] }) }))] }));
};
export default RolesPage;
//# sourceMappingURL=Roles.js.map