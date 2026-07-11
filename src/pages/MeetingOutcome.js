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
const initialData = [];
const MeetingOutcomePage = () => {
    const [data, setData] = useState(initialData);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [formData, setFormData] = useState({ name: '' });
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleAddClick = () => {
        setShowForm(true);
        setEditingItem(null);
        setFormData({ name: '' });
    };
    const handleEditClick = (item) => {
        setShowForm(true);
        setEditingItem(item);
        setFormData({ name: item.name });
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
        setFormData({ name: '' });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            setData(prev => prev.map(item => item.id === editingItem.id ? { ...item, name: formData.name } : item));
        }
        else {
            setData(prev => [...prev, { id: Date.now(), name: formData.name }]);
        }
        handleCloseForm();
    };
    return (_jsxs("div", { className: "task-settings-page", children: [_jsx(PageHeader, { title: "Task Settings", description: "Configure call status, reasons, meeting outcomes and task categories" }), _jsxs("div", { className: "task-settings-layout", children: [_jsx("div", { className: "settings-menu", children: menuItems.map(item => (_jsxs(Link, { to: item.link, className: `menu-item ${item.id === 'outcome' ? 'active' : ''}`, children: [_jsx(item.icon, { size: 18 }), item.label] }, item.id))) }), _jsxs("div", { className: "settings-content", children: [_jsxs("div", { className: "content-header", children: [_jsx("div", { className: "header-left", children: _jsx("div", { className: "entries-select", children: _jsxs("label", { children: ["Show", _jsxs("select", { value: rowsPerPage, onChange: (e) => setRowsPerPage(Number(e.target.value)), children: [_jsx("option", { value: "10", children: "10" }), _jsx("option", { value: "25", children: "25" }), _jsx("option", { value: "50", children: "50" }), _jsx("option", { value: "100", children: "100" })] }), "entries"] }) }) }), _jsxs("div", { className: "header-right", children: [_jsxs("div", { className: "search-input", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "search", placeholder: "Search", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("button", { className: "btn btn-primary", onClick: handleAddClick, children: [_jsx(Plus, { size: 16 }), " Meeting Outcome"] })] })] }), _jsxs("div", { className: "table-container", children: [_jsx("div", { className: "table-scroll", children: _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Sl No" }), _jsx("th", { children: "Name" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: filteredData.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: "3", className: "dataTables_empty", children: "No data available in table" }) })) : (filteredData.slice(0, rowsPerPage).map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: item.name }), _jsx("td", { children: _jsxs("div", { className: "dropdown-container", children: [_jsx("button", { className: "dropdown-toggle", onClick: () => setDropdownOpen(dropdownOpen === item.id ? null : item.id), children: _jsx(MoreHorizontal, { size: 16 }) }), dropdownOpen === item.id && (_jsxs("div", { className: "dropdown-menu", children: [_jsxs("a", { className: "dropdown-item", onClick: () => handleEditClick(item), children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("a", { className: "dropdown-item", onClick: () => handleDeleteClick(item), children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }) })] }, item.id)))) })] }) }), _jsxs("div", { className: "table-footer", children: [_jsx("div", { className: "table-info", children: filteredData.length === 0
                                                    ? 'Showing 0 to 0 of 0 entries'
                                                    : `Showing 1 to ${Math.min(rowsPerPage, filteredData.length)} of ${filteredData.length} entries` }), _jsxs("div", { className: "pagination", children: [_jsx("button", { className: "paginate-button disabled", children: "Previous" }), _jsx("button", { className: "paginate-button current", children: "1" }), _jsx("button", { className: "paginate-button disabled", children: "Next" })] })] })] })] })] }), showForm && (_jsx("div", { className: "drawer-overlay", onClick: handleCloseForm, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: editingItem ? 'Edit Meeting Outcome' : 'Add Meeting Outcome' }), _jsx("button", { className: "drawer-close", onClick: handleCloseForm, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Name ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", name: "name", className: "form-control", placeholder: "Enter name", value: formData.name, onChange: (e) => setFormData({ name: e.target.value }) })] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", children: editingItem ? 'Update' : 'Save' }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: handleCloseForm, children: "Cancel" })] })] }) })] }) })), deletingItem && (_jsx("div", { className: "modal-overlay", onClick: () => setDeletingItem(null), children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { children: "Confirm Delete" }), _jsx("button", { className: "modal-close", onClick: () => setDeletingItem(null), children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "modal-body", children: _jsxs("p", { children: ["Are you sure you want to delete ", _jsx("strong", { children: deletingItem.name }), "?"] }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-danger", onClick: handleConfirmDelete, children: "Confirm" }), _jsx("button", { className: "btn btn-secondary", onClick: () => setDeletingItem(null), children: "Cancel" })] })] }) }))] }));
};
export default MeetingOutcomePage;
//# sourceMappingURL=MeetingOutcome.js.map