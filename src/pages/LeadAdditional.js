import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Plus, X, FileText, Tag, Globe, Layers } from 'lucide-react';
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
    { id: 1, field: 'Assigned Date', type: 'DateTime', inFilter: false, inList: true, required: false, purpose: false },
    { id: 2, field: 'Date', type: 'Date', inFilter: true, inList: true, required: false, purpose: false },
    { id: 3, field: 'Remarks', type: 'Text', inFilter: true, inList: true, required: false, purpose: false },
    { id: 4, field: 'location', type: 'Text', inFilter: true, inList: true, required: false, purpose: false },
];
const LeadAdditionalPage = () => {
    const [data, setData] = useState(initialData);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [formData, setFormData] = useState({
        fieldName: '',
        fieldType: '',
        inFilter: false,
        inList: false,
        required: false,
        purpose: false,
    });
    const handleAddClick = () => {
        setShowForm(true);
        setEditingItem(null);
        setFormData({
            fieldName: '',
            fieldType: '',
            inFilter: false,
            inList: false,
            required: false,
            purpose: false,
        });
    };
    const handleEditClick = (item) => {
        setShowForm(true);
        setEditingItem(item);
        setFormData({
            fieldName: item.field,
            fieldType: item.type,
            inFilter: item.inFilter,
            inList: item.inList,
            required: item.required,
            purpose: item.purpose,
        });
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
    };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingItem) {
            setData(prev => prev.map(item => item.id === editingItem.id ? {
                ...item,
                field: formData.fieldName,
                type: formData.fieldType,
                inFilter: formData.inFilter,
                inList: formData.inList,
                required: formData.required,
                purpose: formData.purpose,
            } : item));
        }
        else {
            setData(prev => [...prev, {
                    id: Date.now(),
                    field: formData.fieldName,
                    type: formData.fieldType,
                    inFilter: formData.inFilter,
                    inList: formData.inList,
                    required: formData.required,
                    purpose: formData.purpose,
                }]);
        }
        handleCloseForm();
    };
    return (_jsxs("div", { className: "lead-settings-page", children: [_jsx(PageHeader, { title: "Lead Settings", description: "Configure lead purposes, statuses, sources and types" }), _jsxs("div", { className: "lead-settings-layout", children: [_jsx("div", { className: "settings-menu", children: menuItems.map(item => (_jsxs(Link, { to: item.link, className: `menu-item ${item.id === 'additional' ? 'active' : ''}`, children: [_jsx(item.icon, { size: 18 }), item.label] }, item.id))) }), _jsx("div", { className: "settings-content", children: _jsxs("div", { className: "additional-fields-layout", children: [_jsx("div", { className: "additional-form-panel", children: _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("h5", { children: "Add Field" }) }), _jsx("div", { className: "card-body", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "checkbox-group", children: [_jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", name: "inFilter", checked: formData.inFilter, onChange: handleInputChange }), "Is Shown in filter"] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", name: "inList", checked: formData.inList, onChange: handleInputChange }), "Show in list"] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", name: "required", checked: formData.required, onChange: handleInputChange }), "Is Required?"] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", name: "purpose", checked: formData.purpose, onChange: handleInputChange }), "Connect with lead purpose?"] })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Field Name ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", name: "fieldName", className: "form-control", placeholder: "Enter field name", value: formData.fieldName, onChange: handleInputChange })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Select Type ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs("select", { name: "fieldType", className: "form-control", value: formData.fieldType, onChange: handleInputChange, children: [_jsx("option", { value: "", children: "Select Type" }), _jsx("option", { value: "text", children: "Text" }), _jsx("option", { value: "number", children: "Number" }), _jsx("option", { value: "date", children: "Date" }), _jsx("option", { value: "datetime", children: "DateTime" }), _jsx("option", { value: "dropdown", children: "Dropdown" }), _jsx("option", { value: "checkbox", children: "Checkbox" })] })] }), _jsxs("button", { type: "submit", className: "btn btn-primary", children: [_jsx(Plus, { size: 16 }), " ", editingItem ? 'Update' : 'Add Field'] })] }) })] }) }), _jsx("div", { className: "additional-table-panel", children: _jsx("div", { className: "table-container", children: _jsx("div", { className: "table-scroll", children: _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "#" }), _jsx("th", { children: "Field" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "in filter" }), _jsx("th", { children: "in list" }), _jsx("th", { children: "Required" }), _jsx("th", { children: "Purpose" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: data.map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: item.field }), _jsx("td", { children: item.type }), _jsx("td", { children: _jsx("span", { className: `badge ${item.inFilter ? 'badge-success' : 'badge-secondary'}`, children: item.inFilter ? 'YES' : 'NO' }) }), _jsx("td", { children: _jsx("span", { className: `badge ${item.inList ? 'badge-success' : 'badge-secondary'}`, children: item.inList ? 'YES' : 'NO' }) }), _jsx("td", { children: _jsx("span", { className: `badge ${item.required ? 'badge-success' : 'badge-secondary'}`, children: item.required ? 'YES' : 'NO' }) }), _jsx("td", { children: _jsx("span", { className: `badge ${item.purpose ? 'badge-success' : 'badge-secondary'}`, children: item.purpose ? 'YES' : 'NO' }) }), _jsx("td", { children: _jsxs("div", { className: "dropdown-container", children: [_jsx("button", { className: "dropdown-toggle", onClick: () => setDropdownOpen(dropdownOpen === `add_${item.id}` ? null : `add_${item.id}`), children: _jsx(MoreHorizontal, { size: 16 }) }), dropdownOpen === `add_${item.id}` && (_jsxs("div", { className: "dropdown-menu", children: [_jsxs("a", { className: "dropdown-item", onClick: () => handleEditClick(item), children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("a", { className: "dropdown-item", onClick: () => handleDeleteClick(item), children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }) })] }, item.id))) })] }) }) }) })] }) })] }), deletingItem && (_jsx("div", { className: "modal-overlay", onClick: () => setDeletingItem(null), children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { children: "Confirm Delete" }), _jsx("button", { className: "modal-close", onClick: () => setDeletingItem(null), children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "modal-body", children: _jsxs("p", { children: ["Are you sure you want to delete ", _jsx("strong", { children: deletingItem.field }), "?"] }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-danger", onClick: handleConfirmDelete, children: "Confirm" }), _jsx("button", { className: "btn btn-secondary", onClick: () => setDeletingItem(null), children: "Cancel" })] })] }) }))] }));
};
export default LeadAdditionalPage;
//# sourceMappingURL=LeadAdditional.js.map