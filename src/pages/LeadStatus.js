import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X, FileText, Tag, Globe, Layers } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './LeadSettings.css';
const menuItems = [
    { id: 'purpose', label: 'Purpose', link: '/settings/lead-settings/purpose', icon: FileText },
    { id: 'status', label: 'Status', link: '/settings/lead-settings/status', icon: Tag },
    { id: 'source', label: 'Source', link: '/settings/lead-settings/source', icon: Globe },
    { id: 'types', label: 'Types', link: '/settings/lead-settings/types', icon: Layers },
    { id: 'additional', label: 'Additional Fields', link: '/settings/lead-settings/additional', icon: FileText },
];
const initialData = [
    { id: 1, status: 'New', color: '#22c55e', useForConversion: false },
    { id: 2, status: 'Connected', color: '#3b82f6', useForConversion: false },
    { id: 3, status: 'Interested', color: '#f59e0b', useForConversion: true },
    { id: 4, status: 'Registered', color: '#8b5cf6', useForConversion: true },
    { id: 5, status: 'Not Interested', color: '#ef4444', useForConversion: false },
    { id: 6, status: 'Just Enquiry', color: '#6b7280', useForConversion: false },
];
const LeadStatusPage = () => {
    const [data, setData] = useState(initialData);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [formData, setFormData] = useState({ status: '', color: '#3b82f6', useForConversion: false });
    const filteredData = data.filter(item => item.status.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleAddClick = () => {
        setShowForm(true);
        setEditingItem(null);
        setFormData({ status: '', color: '#3b82f6', useForConversion: false });
    };
    const handleEditClick = (item) => {
        setShowForm(true);
        setEditingItem(item);
        setFormData({ status: item.status, color: item.color, useForConversion: item.useForConversion || false });
        setDropdownOpen(null);
    };
    const handleDeleteClick = (item) => {
        setDeletingItem(item);
        setDropdownOpen(null);
    };
    const handleConfirmDelete = () => {
        setData(prev => prev.filter(item => item.id !== deletingItem.id));
        setDeletingItem(null);
    };
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingItem(null);
        setFormData({ status: '', color: '#3b82f6', useForConversion: false });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            setData(prev => prev.map(item => item.id === editingItem.id ? { ...item, status: formData.status, color: formData.color, useForConversion: formData.useForConversion } : item));
        }
        else {
            setData(prev => [...prev, { id: Date.now(), status: formData.status, color: formData.color, useForConversion: formData.useForConversion }]);
        }
        handleCloseForm();
    };
    return (_jsxs("div", { className: "lead-settings-page", children: [_jsx(PageHeader, { title: "Lead Settings", description: "Configure lead purposes, statuses, sources and types" }), _jsxs("div", { className: "lead-settings-layout", children: [_jsx("div", { className: "settings-menu", children: menuItems.map(item => (_jsxs(Link, { to: item.link, className: `menu-item ${item.id === 'status' ? 'active' : ''}`, children: [_jsx(item.icon, { size: 18 }), item.label] }, item.id))) }), _jsxs("div", { className: "settings-content", children: [_jsxs("div", { className: "content-header", children: [_jsx("div", { className: "header-left", children: _jsx("div", { className: "entries-select", children: _jsxs("label", { children: ["Show", _jsxs("select", { value: rowsPerPage, onChange: (e) => setRowsPerPage(Number(e.target.value)), children: [_jsx("option", { value: "10", children: "10" }), _jsx("option", { value: "25", children: "25" }), _jsx("option", { value: "50", children: "50" }), _jsx("option", { value: "100", children: "100" })] }), "entries"] }) }) }), _jsxs("div", { className: "header-right", children: [_jsxs("div", { className: "search-input", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "search", placeholder: "Search", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("button", { className: "btn btn-primary", onClick: handleAddClick, children: [_jsx(Plus, { size: 16 }), " Lead Status"] })] })] }), _jsxs("div", { className: "table-container", children: [_jsx("div", { className: "table-scroll", children: _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Sl No" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Color" }), _jsx("th", { children: "Use for Conversion Metrics" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: filteredData.slice(0, rowsPerPage).map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: item.status }), _jsx("td", { children: _jsx("span", { className: "color-pill", style: { background: item.color } }) }), _jsx("td", { children: _jsx("span", { className: `badge ${item.useForConversion ? 'badge-success' : 'badge-secondary'}`, children: item.useForConversion ? 'Yes' : 'No' }) }), _jsx("td", { children: _jsxs("div", { className: "dropdown-container", children: [_jsx("button", { className: "dropdown-toggle", onClick: () => setDropdownOpen(dropdownOpen === item.id ? null : item.id), children: _jsx(MoreHorizontal, { size: 16 }) }), dropdownOpen === item.id && (_jsxs("div", { className: "dropdown-menu", children: [_jsxs("a", { className: "dropdown-item", onClick: () => handleEditClick(item), children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("a", { className: "dropdown-item", onClick: () => handleDeleteClick(item), children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }) })] }, item.id))) })] }) }), _jsxs("div", { className: "table-footer", children: [_jsxs("div", { className: "table-info", children: ["Showing 1 to ", Math.min(rowsPerPage, filteredData.length), " of ", filteredData.length, " entries"] }), _jsxs("div", { className: "pagination", children: [_jsx("button", { className: "paginate-button disabled", children: "Previous" }), _jsx("button", { className: "paginate-button current", children: "1" }), _jsx("button", { className: "paginate-button disabled", children: "Next" })] })] })] })] })] }), showForm && (_jsx("div", { className: "drawer-overlay", onClick: handleCloseForm, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: editingItem ? 'Edit Lead Status' : 'Add Lead Status' }), _jsx("button", { className: "drawer-close", onClick: handleCloseForm, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Status ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", name: "status", className: "form-control", placeholder: "Enter status", value: formData.status, onChange: (e) => setFormData({ ...formData, status: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Color" }), _jsx("input", { type: "color", name: "color", className: "form-control color-input", value: formData.color, onChange: (e) => setFormData({ ...formData, color: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Use for Conversion Metrics" }), _jsxs("label", { className: "toggle-switch", children: [_jsx("input", { type: "checkbox", checked: formData.useForConversion, onChange: (e) => setFormData({ ...formData, useForConversion: e.target.checked }) }), _jsx("span", { className: "toggle-slider" })] })] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", children: editingItem ? 'Update' : 'Save' }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: handleCloseForm, children: "Cancel" })] })] }) })] }) })), deletingItem && (_jsx("div", { className: "modal-overlay", onClick: () => setDeletingItem(null), children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { children: "Confirm Delete" }), _jsx("button", { className: "modal-close", onClick: () => setDeletingItem(null), children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "modal-body", children: _jsxs("p", { children: ["Are you sure you want to delete ", _jsx("strong", { children: deletingItem.status }), "?"] }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-danger", onClick: handleConfirmDelete, children: "Confirm" }), _jsx("button", { className: "btn btn-secondary", onClick: () => setDeletingItem(null), children: "Cancel" })] })] }) }))] }));
};
export default LeadStatusPage;
//# sourceMappingURL=LeadStatus.js.map