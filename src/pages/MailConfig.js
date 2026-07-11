import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X } from 'lucide-react';
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
const mailConfigData = [
    { id: 1, driver: 'SMTP', port: 587, encryption: 'TLS', auth: 'Yes', active: true },
];
const MailConfigPage = () => {
    const location = useLocation();
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [formData, setFormData] = useState({
        driver: '',
        host: '',
        port: '',
        encryption: '',
        username: '',
        password: '',
        fromEmail: '',
        fromName: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const filteredData = mailConfigData.filter(item => item.driver.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleAddClick = () => {
        setShowForm(true);
        setEditingItem(null);
        setFormData({
            driver: '',
            host: '',
            port: '',
            encryption: '',
            username: '',
            password: '',
            fromEmail: '',
            fromName: '',
        });
    };
    const handleEditClick = (item) => {
        setShowForm(true);
        setEditingItem(item);
        setFormData({
            driver: item.driver,
            host: item.host || '',
            port: item.port.toString(),
            encryption: item.encryption,
            username: item.username || '',
            password: item.password || '',
            fromEmail: item.fromEmail || '',
            fromName: item.fromName || '',
        });
        setDropdownOpen(null);
    };
    const handleDeleteClick = (item) => {
        setDeletingItem(item);
        setDropdownOpen(null);
    };
    const handleConfirmDelete = () => {
        console.log('Deleting:', deletingItem);
        setDeletingItem(null);
    };
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingItem(null);
    };
    return (_jsxs("div", { className: "account-page", children: [_jsx("div", { className: "account-layout", children: _jsxs("div", { className: "account-content", style: { width: '100%', maxWidth: '100%' }, children: [_jsx(PageHeader, { title: "Mail Configuration", description: "Configure email settings", action: _jsxs("button", { className: "btn btn-primary", onClick: handleAddClick, children: [_jsx(Plus, { size: 16 }), " Add Config"] }) }), _jsx(SettingsTabs, {}), _jsxs("div", { className: "table-container", children: [_jsxs("div", { className: "table-header-controls", children: [_jsx("div", { className: "entries-select", children: _jsxs("label", { children: ["Show", _jsxs("select", { value: rowsPerPage, onChange: (e) => setRowsPerPage(Number(e.target.value)), children: [_jsx("option", { value: "10", children: "10" }), _jsx("option", { value: "25", children: "25" }), _jsx("option", { value: "50", children: "50" }), _jsx("option", { value: "100", children: "100" })] }), "entries"] }) }), _jsxs("div", { className: "search-input", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "search", placeholder: "Search", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] })] }), _jsx("div", { className: "table-scroll", children: _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Sl No" }), _jsx("th", { children: "Driver/Host" }), _jsx("th", { children: "Port/Encryption" }), _jsx("th", { children: "Authentication" }), _jsx("th", { children: "Active" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: filteredData.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: "6", className: "dataTables_empty", children: "No data available in table" }) })) : (filteredData.slice(0, rowsPerPage).map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: item.driver }), _jsxs("td", { children: [item.port, "/", item.encryption] }), _jsx("td", { children: item.auth }), _jsx("td", { children: item.active ? 'Yes' : 'No' }), _jsx("td", { children: _jsxs("div", { className: "dropdown-container", children: [_jsx("button", { className: "dropdown-toggle", onClick: () => setDropdownOpen(dropdownOpen === item.id ? null : item.id), children: _jsx(MoreHorizontal, { size: 16 }) }), dropdownOpen === item.id && (_jsxs("div", { className: "dropdown-menu", children: [_jsxs("a", { className: "dropdown-item", onClick: () => handleEditClick(item), children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("a", { className: "dropdown-item", onClick: () => handleDeleteClick(item), children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }) })] }, item.id)))) })] }) }), _jsx("div", { className: "table-footer", children: _jsx("div", { className: "table-info", children: filteredData.length === 0
                                            ? 'Showing 0 to 0 of 0 entries'
                                            : `Showing 1 to ${Math.min(rowsPerPage, filteredData.length)} of ${filteredData.length} entries` }) })] })] }) }), showForm && (_jsx("div", { className: "drawer-overlay", onClick: handleCloseForm, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: editingItem ? 'Edit Mail Config' : 'Add Mail Config' }), _jsx("button", { className: "drawer-close", onClick: handleCloseForm, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", children: _jsxs("form", { children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Mail Driver ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs("select", { name: "driver", className: "form-control", value: formData.driver, onChange: handleInputChange, children: [_jsx("option", { value: "", children: "Select Driver" }), _jsx("option", { value: "smtp", children: "SMTP" }), _jsx("option", { value: "sendmail", children: "Sendmail" }), _jsx("option", { value: "mailgun", children: "Mailgun" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Host" }), _jsx("input", { type: "text", name: "host", className: "form-control", placeholder: "mail.example.com", value: formData.host, onChange: handleInputChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Port" }), _jsx("input", { type: "text", name: "port", className: "form-control", placeholder: "587", value: formData.port, onChange: handleInputChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Encryption" }), _jsxs("select", { name: "encryption", className: "form-control", value: formData.encryption, onChange: handleInputChange, children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "tls", children: "TLS" }), _jsx("option", { value: "ssl", children: "SSL" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Username" }), _jsx("input", { type: "text", name: "username", className: "form-control", placeholder: "username", value: formData.username, onChange: handleInputChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Password" }), _jsx("input", { type: "password", name: "password", className: "form-control", placeholder: "password", value: formData.password, onChange: handleInputChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "From Email" }), _jsx("input", { type: "email", name: "fromEmail", className: "form-control", placeholder: "noreply@example.com", value: formData.fromEmail, onChange: handleInputChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "From Name" }), _jsx("input", { type: "text", name: "fromName", className: "form-control", placeholder: "Company Name", value: formData.fromName, onChange: handleInputChange })] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", children: editingItem ? 'Update' : 'Save' }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: handleCloseForm, children: "Cancel" })] })] }) })] }) })), deletingItem && (_jsx("div", { className: "modal-overlay", onClick: () => setDeletingItem(null), children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { children: "Confirm Delete" }), _jsx("button", { className: "modal-close", onClick: () => setDeletingItem(null), children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "modal-body", children: _jsx("p", { className: "delete-warning", children: "Are you sure you want to delete this mail configuration?" }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-danger", onClick: handleConfirmDelete, children: "Confirm" }), _jsx("button", { className: "btn btn-secondary", onClick: () => setDeletingItem(null), children: "Cancel" })] })] }) }))] }));
};
export default MailConfigPage;
//# sourceMappingURL=MailConfig.js.map