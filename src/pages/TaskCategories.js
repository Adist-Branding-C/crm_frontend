import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X, Phone, MessageSquare, Users, Tag } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './TaskSettings.css';
const menuItems = [
    { id: 'call_status', label: 'Call Status', link: '/user/call_status', icon: Phone },
    { id: 'reason', label: 'Call Reasons', link: '/user/reason', icon: MessageSquare },
    { id: 'outcome', label: 'Meeting Outcome', link: '/user/meeting-outcome', icon: Users },
    { id: 'categories', label: 'Task Categories', link: '/user/task-categories', icon: Tag },
];
const initialData = [
    { id: 1, category: 'Meeting', action: 'Default' },
    { id: 2, category: 'Call', action: 'Default' },
    { id: 3, category: 'Sales', action: 'Default' },
];
const TaskCategoriesPage = () => {
    const [data, setData] = useState(initialData);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [formData, setFormData] = useState({ category: '', action: 'Default' });
    const filteredData = data.filter(item => item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleAddClick = () => {
        setShowForm(true);
        setEditingItem(null);
        setFormData({ category: '', action: 'Default' });
    };
    const handleEditClick = (item) => {
        setShowForm(true);
        setEditingItem(item);
        setFormData({ category: item.category, action: item.action });
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
        setFormData({ category: '', action: 'Default' });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            setData(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
        }
        else {
            setData(prev => [...prev, { id: Date.now(), ...formData }]);
        }
        handleCloseForm();
    };
    return (_jsxs("div", { className: "task-settings-page", children: [_jsx(PageHeader, { title: "Task Settings", description: "Configure call status, reasons, meeting outcomes and task categories" }), _jsxs("div", { className: "task-settings-layout", children: [_jsx("div", { className: "settings-menu", children: menuItems.map(item => (_jsxs(Link, { to: item.link, className: `menu-item ${item.id === 'categories' ? 'active' : ''}`, children: [_jsx(item.icon, { size: 18 }), item.label] }, item.id))) }), _jsxs("div", { className: "settings-content", children: [_jsxs("div", { className: "content-header", children: [_jsx("div", { className: "header-left", children: _jsx("div", { className: "entries-select", children: _jsxs("label", { children: ["Show", _jsxs("select", { value: rowsPerPage, onChange: (e) => setRowsPerPage(Number(e.target.value)), children: [_jsx("option", { value: "10", children: "10" }), _jsx("option", { value: "25", children: "25" }), _jsx("option", { value: "50", children: "50" }), _jsx("option", { value: "100", children: "100" })] }), "entries"] }) }) }), _jsxs("div", { className: "header-right", children: [_jsxs("div", { className: "search-input", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "search", placeholder: "Search", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("button", { className: "btn btn-primary", onClick: handleAddClick, children: [_jsx(Plus, { size: 16 }), " Task Categories"] })] })] }), _jsxs("div", { className: "table-container", children: [_jsx("div", { className: "table-scroll", children: _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Sl No" }), _jsx("th", { children: "Task Category" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: filteredData.slice(0, rowsPerPage).map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: item.category }), _jsx("td", { children: _jsx("span", { className: "action-link", children: item.action }) })] }, item.id))) })] }) }), _jsxs("div", { className: "table-footer", children: [_jsxs("div", { className: "table-info", children: ["Showing 1 to ", Math.min(rowsPerPage, filteredData.length), " of ", filteredData.length, " entries"] }), _jsxs("div", { className: "pagination", children: [_jsx("button", { className: "paginate-button disabled", children: "Previous" }), _jsx("button", { className: "paginate-button current", children: "1" }), _jsx("button", { className: "paginate-button disabled", children: "Next" })] })] })] })] })] }), showForm && (_jsx("div", { className: "drawer-overlay", onClick: handleCloseForm, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: editingItem ? 'Edit Task Categories' : 'Add Task Categories' }), _jsx("button", { className: "drawer-close", onClick: handleCloseForm, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Task Category ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", name: "category", className: "form-control", placeholder: "Enter category", value: formData.category, onChange: (e) => setFormData({ ...formData, category: e.target.value }) })] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", children: editingItem ? 'Update' : 'Save' }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: handleCloseForm, children: "Cancel" })] })] }) })] }) })), deletingItem && (_jsx("div", { className: "modal-overlay", onClick: () => setDeletingItem(null), children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { children: "Confirm Delete" }), _jsx("button", { className: "modal-close", onClick: () => setDeletingItem(null), children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "modal-body", children: _jsxs("p", { children: ["Are you sure you want to delete ", _jsx("strong", { children: deletingItem.category }), "?"] }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-danger", onClick: handleConfirmDelete, children: "Confirm" }), _jsx("button", { className: "btn btn-secondary", onClick: () => setDeletingItem(null), children: "Cancel" })] })] }) }))] }));
};
export default TaskCategoriesPage;
//# sourceMappingURL=TaskCategories.js.map