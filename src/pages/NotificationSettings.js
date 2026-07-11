import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Search, X, Bell } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './NotificationSettings.css';
const menuItems = [
    { id: 'configure', label: 'Configure Notification', link: '/user/notifications-users', icon: Bell },
];
const initialData = [
    { id: 1, type: 'Email', status: 'Active', config: { smtpHost: '', port: '', username: '', password: '', fromName: '' } },
    { id: 2, type: 'SMS', status: 'Inactive', config: { provider: '', apiKey: '', senderId: '' } },
    { id: 3, type: 'Telegram', status: 'Active', config: { botToken: '', chatId: '', webhookUrl: '' } },
];
const NotificationSettingsPage = () => {
    const [data, setData] = useState(initialData);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [configuringItem, setConfiguringItem] = useState(null);
    const [formData, setFormData] = useState({});
    const filteredData = data.filter(item => item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleConfigClick = (item) => {
        setConfiguringItem(item);
        setFormData({ ...item.config });
        setShowConfigModal(true);
        setDropdownOpen(null);
    };
    const handleToggleStatus = (item) => {
        setData(prev => prev.map(d => d.id === item.id ? { ...d, status: d.status === 'Active' ? 'Inactive' : 'Active' } : d));
        setDropdownOpen(null);
    };
    const handleCloseModal = () => {
        setShowConfigModal(false);
        setConfiguringItem(null);
        setFormData({});
    };
    const handleSaveConfig = (e) => {
        e.preventDefault();
        setData(prev => prev.map(item => item.id === configuringItem.id ? { ...item, config: { ...formData } } : item));
        handleCloseModal();
    };
    const getConfigFields = (type) => {
        switch (type) {
            case 'Email':
                return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "SMTP Host" }), _jsx("input", { type: "text", className: "form-control", placeholder: "smtp.example.com", value: formData.smtpHost || '', onChange: (e) => setFormData({ ...formData, smtpHost: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Port" }), _jsx("input", { type: "text", className: "form-control", placeholder: "587", value: formData.port || '', onChange: (e) => setFormData({ ...formData, port: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Username" }), _jsx("input", { type: "text", className: "form-control", placeholder: "username", value: formData.username || '', onChange: (e) => setFormData({ ...formData, username: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Password" }), _jsx("input", { type: "password", className: "form-control", placeholder: "password", value: formData.password || '', onChange: (e) => setFormData({ ...formData, password: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "From Name" }), _jsx("input", { type: "text", className: "form-control", placeholder: "Company Name", value: formData.fromName || '', onChange: (e) => setFormData({ ...formData, fromName: e.target.value }) })] })] }));
            case 'SMS':
                return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Provider" }), _jsx("input", { type: "text", className: "form-control", placeholder: "Twilio / MSG91 / etc", value: formData.provider || '', onChange: (e) => setFormData({ ...formData, provider: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "API Key" }), _jsx("input", { type: "text", className: "form-control", placeholder: "API Key", value: formData.apiKey || '', onChange: (e) => setFormData({ ...formData, apiKey: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Sender ID" }), _jsx("input", { type: "text", className: "form-control", placeholder: "SENDER", value: formData.senderId || '', onChange: (e) => setFormData({ ...formData, senderId: e.target.value }) })] })] }));
            case 'Telegram':
                return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Bot Token" }), _jsx("input", { type: "text", className: "form-control", placeholder: "123456:ABC-DEF1234ghIkl-zyx57W2v", value: formData.botToken || '', onChange: (e) => setFormData({ ...formData, botToken: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Chat ID" }), _jsx("input", { type: "text", className: "form-control", placeholder: "123456789", value: formData.chatId || '', onChange: (e) => setFormData({ ...formData, chatId: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Webhook URL" }), _jsx("input", { type: "text", className: "form-control", placeholder: "https://your-webhook.com", value: formData.webhookUrl || '', onChange: (e) => setFormData({ ...formData, webhookUrl: e.target.value }) })] })] }));
            default:
                return null;
        }
    };
    const isStatusActive = (status) => status.toLowerCase() === 'active';
    return (_jsxs("div", { className: "notification-settings-page", children: [_jsx(PageHeader, { title: "Notification Settings", description: "Configure notification channels and preferences" }), _jsxs("div", { className: "notification-settings-layout", children: [_jsx("div", { className: "settings-menu", children: menuItems.map(item => (_jsxs(Link, { to: item.link, className: `menu-item active`, children: [_jsx(item.icon, { size: 18 }), item.label] }, item.id))) }), _jsxs("div", { className: "settings-content", children: [_jsxs("div", { className: "content-header", children: [_jsx("div", { className: "header-left", children: _jsx("div", { className: "entries-select", children: _jsxs("label", { children: ["Show", _jsxs("select", { value: rowsPerPage, onChange: (e) => setRowsPerPage(Number(e.target.value)), children: [_jsx("option", { value: "10", children: "10" }), _jsx("option", { value: "25", children: "25" }), _jsx("option", { value: "50", children: "50" }), _jsx("option", { value: "100", children: "100" })] }), "entries"] }) }) }), _jsx("div", { className: "header-right", children: _jsxs("div", { className: "search-input", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "search", placeholder: "Search", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }) })] }), _jsxs("div", { className: "table-container", children: [_jsx("div", { className: "table-scroll", children: _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Sl No" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: filteredData.slice(0, rowsPerPage).map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: item.type }), _jsx("td", { children: _jsx("span", { className: `status-badge ${isStatusActive(item.status) ? 'active' : 'inactive'}`, children: item.status }) }), _jsx("td", { children: _jsxs("div", { className: "dropdown-container", children: [_jsx("button", { className: "dropdown-toggle", onClick: () => setDropdownOpen(dropdownOpen === item.id ? null : item.id), children: _jsx(MoreHorizontal, { size: 16 }) }), dropdownOpen === item.id && (_jsxs("div", { className: "dropdown-menu", children: [_jsxs("a", { className: "dropdown-item", onClick: () => handleConfigClick(item), children: [_jsx(Edit2, { size: 14 }), " Configure"] }), _jsx("a", { className: "dropdown-item", onClick: () => handleToggleStatus(item), children: isStatusActive(item.status) ? 'Disable' : 'Enable' })] }))] }) })] }, item.id))) })] }) }), _jsxs("div", { className: "table-footer", children: [_jsxs("div", { className: "table-info", children: ["Showing 1 to ", Math.min(rowsPerPage, filteredData.length), " of ", filteredData.length, " entries"] }), _jsxs("div", { className: "pagination", children: [_jsx("button", { className: "paginate-button disabled", children: "Previous" }), _jsx("button", { className: "paginate-button current", children: "1" }), _jsx("button", { className: "paginate-button disabled", children: "Next" })] })] })] })] })] }), showConfigModal && configuringItem && (_jsx("div", { className: "drawer-overlay", onClick: handleCloseModal, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsxs("h5", { children: ["Configure ", configuringItem.type] }), _jsx("button", { className: "drawer-close", onClick: handleCloseModal, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", children: _jsxs("form", { onSubmit: handleSaveConfig, children: [getConfigFields(configuringItem.type), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", children: "Save Configuration" }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: handleCloseModal, children: "Cancel" })] })] }) })] }) }))] }));
};
export default NotificationSettingsPage;
//# sourceMappingURL=NotificationSettings.js.map