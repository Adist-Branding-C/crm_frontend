import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X, Filter, List, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './LeadSettings.css';
const purposeData = [
    { id: 1, title: '12th Pass' },
    { id: 2, title: '12th Grade' },
    { id: 3, title: 'MBBS' },
    { id: 4, title: 'bachelor' },
    { id: 5, title: 'HOT' },
    { id: 6, title: 'WARM' },
];
const statusData = [
    { id: 1, status: 'New', color: '#22c55e' },
    { id: 2, status: 'Connected', color: '#3b82f6' },
    { id: 3, status: 'Interested', color: '#f59e0b' },
    { id: 4, status: 'Registered', color: '#8b5cf6' },
    { id: 5, status: 'Not Interested', color: '#ef4444' },
    { id: 6, status: 'Just Enquiry', color: '#6b7280' },
];
const sourceData = [
    { id: 1, addedBy: 'You', source: 'TMU | Kerala | Lead | VD | Ad' },
    { id: 2, addedBy: 'You', source: 'PG ENG - 349000 Whatsapp' },
    { id: 3, addedBy: 'You', source: 'BSC Nursing | Bulgaria | V2' },
];
const typeData = [
    { id: 1, addedBy: 'You', type: 'Seminar Saudi' },
    { id: 2, addedBy: 'You', type: 'Seminar UAE' },
    { id: 3, addedBy: 'You', type: 'Seminar Qatar' },
    { id: 4, addedBy: 'You', type: 'MBBS Doing' },
    { id: 5, addedBy: 'You', type: 'Hot' },
    { id: 6, addedBy: 'You', type: 'In follow up' },
];
const additionalFieldsData = [
    { id: 1, field: 'Assigned Date', type: 'DateTime', inFilter: false, inList: true, required: false, purpose: false },
    { id: 2, field: 'Date', type: 'Date', inFilter: true, inList: true, required: false, purpose: false },
    { id: 3, field: 'Remarks', type: 'Text', inFilter: true, inList: true, required: false, purpose: false },
    { id: 4, field: 'location', type: 'Text', inFilter: true, inList: true, required: false, purpose: false },
];
const menuItems = [
    { id: 'purpose', label: 'Purpose', icon: FileText },
    { id: 'status', label: 'Status', icon: FileText },
    { id: 'source', label: 'Source', icon: FileText },
    { id: 'types', label: 'Types', icon: FileText },
    { id: 'additional', label: 'Additional Fields', icon: FileText },
];
const LeadSettingsPage = () => {
    const [activeTab, setActiveTab] = useState('purpose');
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [additionalForm, setAdditionalForm] = useState({
        fieldName: '',
        fieldType: '',
        isShownInFilter: false,
        showInList: false,
        isRequired: false,
        connectWithPurpose: false,
    });
    const getData = () => {
        switch (activeTab) {
            case 'purpose': return purposeData;
            case 'status': return statusData;
            case 'source': return sourceData;
            case 'types': return typeData;
            case 'additional': return additionalFieldsData;
            default: return [];
        }
    };
    const filteredData = getData().filter(item => {
        const searchFields = activeTab === 'purpose' ? item.title :
            activeTab === 'status' ? item.status :
                activeTab === 'source' ? item.source :
                    activeTab === 'types' ? item.type :
                        activeTab === 'additional' ? item.field : '';
        return searchFields?.toLowerCase().includes(searchQuery.toLowerCase());
    });
    const handleAddClick = () => {
        setShowForm(true);
        setEditingItem(null);
        if (activeTab === 'status') {
            setFormData({ status: '', color: '#3b82f6' });
        }
        else if (activeTab === 'purpose') {
            setFormData({ title: '' });
        }
        else if (activeTab === 'source') {
            setFormData({ source: '' });
        }
        else if (activeTab === 'types') {
            setFormData({ type: '' });
        }
    };
    const handleEditClick = (item) => {
        setShowForm(true);
        setEditingItem(item);
        if (activeTab === 'status') {
            setFormData({ status: item.status, color: item.color });
        }
        else if (activeTab === 'purpose') {
            setFormData({ title: item.title });
        }
        else if (activeTab === 'source') {
            setFormData({ source: item.source });
        }
        else if (activeTab === 'types') {
            setFormData({ type: item.type });
        }
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
        setFormData({});
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const getTitle = () => {
        switch (activeTab) {
            case 'purpose': return 'Lead Purpose';
            case 'status': return 'Lead Status';
            case 'source': return 'Lead Source';
            case 'types': return 'Lead Type';
            case 'additional': return 'Additional Fields';
            default: return '';
        }
    };
    const handleAdditionalFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAdditionalForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleAdditionalSubmit = (e) => {
        e.preventDefault();
        console.log('Additional field submitted:', additionalForm);
    };
    return (_jsxs("div", { className: "lead-settings-page", children: [_jsx(PageHeader, { title: "Lead Settings", description: "Configure lead purposes, statuses, sources and types" }), _jsxs("div", { className: "lead-settings-layout", children: [_jsx("div", { className: "settings-menu", children: menuItems.map(item => (_jsxs("button", { className: `menu-item ${activeTab === item.id ? 'active' : ''}`, onClick: () => setActiveTab(item.id), children: [_jsx(item.icon, { size: 18 }), item.label] }, item.id))) }), _jsxs("div", { className: "settings-content", children: [activeTab !== 'additional' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "content-header", children: [_jsx("div", { className: "header-left", children: _jsx("div", { className: "entries-select", children: _jsxs("label", { children: ["Show", _jsxs("select", { value: rowsPerPage, onChange: (e) => setRowsPerPage(Number(e.target.value)), children: [_jsx("option", { value: "10", children: "10" }), _jsx("option", { value: "25", children: "25" }), _jsx("option", { value: "50", children: "50" }), _jsx("option", { value: "100", children: "100" })] }), "entries"] }) }) }), _jsxs("div", { className: "header-right", children: [_jsxs("div", { className: "search-input", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "search", placeholder: "Search", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("button", { className: "btn btn-primary", onClick: handleAddClick, children: [_jsx(Plus, { size: 16 }), activeTab === 'purpose' ? 'Lead Purpose' :
                                                                activeTab === 'status' ? 'Lead Status' :
                                                                    activeTab === 'source' ? 'Lead Source' : 'Lead Type'] })] })] }), _jsxs("div", { className: "table-container", children: [_jsx("div", { className: "table-scroll", children: _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Sl No" }), activeTab === 'purpose' && _jsx("th", { children: "Purpose Title" }), activeTab === 'status' && _jsx("th", { children: "Status" }), activeTab === 'status' && _jsx("th", { children: "Color" }), activeTab === 'source' && _jsx("th", { children: "Added By" }), activeTab === 'source' && _jsx("th", { children: "Source" }), activeTab === 'types' && _jsx("th", { children: "Added By" }), activeTab === 'types' && _jsx("th", { children: "Lead Type" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: filteredData.slice(0, rowsPerPage).map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 }), activeTab === 'purpose' && _jsx("td", { children: item.title }), activeTab === 'status' && _jsx("td", { children: item.status }), activeTab === 'status' && (_jsx("td", { children: _jsx("span", { className: "color-pill", style: { background: item.color } }) })), activeTab === 'source' && _jsx("td", { children: item.addedBy }), activeTab === 'source' && (_jsx("td", { className: "truncate-cell", title: item.source, children: item.source })), activeTab === 'types' && _jsx("td", { children: item.addedBy }), activeTab === 'types' && _jsx("td", { children: item.type }), _jsx("td", { children: _jsxs("div", { className: "dropdown-container", children: [_jsx("button", { className: "dropdown-toggle", onClick: () => setDropdownOpen(dropdownOpen === item.id ? null : item.id), children: _jsx(MoreHorizontal, { size: 16 }) }), dropdownOpen === item.id && (_jsxs("div", { className: "dropdown-menu", children: [_jsxs("a", { className: "dropdown-item", onClick: () => handleEditClick(item), children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("a", { className: "dropdown-item", onClick: () => handleDeleteClick(item), children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }) })] }, item.id))) })] }) }), _jsxs("div", { className: "table-footer", children: [_jsxs("div", { className: "table-info", children: ["Showing 1 to ", Math.min(rowsPerPage, filteredData.length), " of ", filteredData.length, " entries"] }), _jsxs("div", { className: "pagination", children: [_jsx("button", { className: "paginate-button disabled", children: "Previous" }), _jsx("button", { className: "paginate-button current", children: "1" }), _jsx("button", { className: "paginate-button disabled", children: "Next" })] })] })] })] })), activeTab === 'additional' && (_jsxs("div", { className: "additional-fields-layout", children: [_jsx("div", { className: "additional-form-panel", children: _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("h5", { children: "Add Field" }) }), _jsx("div", { className: "card-body", children: _jsxs("form", { onSubmit: handleAdditionalSubmit, children: [_jsxs("div", { className: "checkbox-group", children: [_jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", name: "isShownInFilter", checked: additionalForm.isShownInFilter, onChange: handleAdditionalFormChange }), "Is Shown in filter"] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", name: "showInList", checked: additionalForm.showInList, onChange: handleAdditionalFormChange }), "Show in list"] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", name: "isRequired", checked: additionalForm.isRequired, onChange: handleAdditionalFormChange }), "Is Required?"] }), _jsxs("label", { className: "checkbox-item", children: [_jsx("input", { type: "checkbox", name: "connectWithPurpose", checked: additionalForm.connectWithPurpose, onChange: handleAdditionalFormChange }), "Connect with lead purpose?"] })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Field Name ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", name: "fieldName", className: "form-control", placeholder: "Enter field name", value: additionalForm.fieldName, onChange: handleAdditionalFormChange })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Select Type ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs("select", { name: "fieldType", className: "form-control", value: additionalForm.fieldType, onChange: handleAdditionalFormChange, children: [_jsx("option", { value: "", children: "Select Type" }), _jsx("option", { value: "text", children: "Text" }), _jsx("option", { value: "number", children: "Number" }), _jsx("option", { value: "date", children: "Date" }), _jsx("option", { value: "datetime", children: "DateTime" }), _jsx("option", { value: "dropdown", children: "Dropdown" }), _jsx("option", { value: "checkbox", children: "Checkbox" })] })] }), _jsxs("button", { type: "submit", className: "btn btn-primary", children: [_jsx(Plus, { size: 16 }), " Add Field"] })] }) })] }) }), _jsx("div", { className: "additional-table-panel", children: _jsx("div", { className: "table-container", children: _jsx("div", { className: "table-scroll", children: _jsxs("table", { className: "data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "#" }), _jsx("th", { children: "Field" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "in filter" }), _jsx("th", { children: "in list" }), _jsx("th", { children: "Required" }), _jsx("th", { children: "Purpose" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: additionalFieldsData.map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: index + 1 }), _jsx("td", { children: item.field }), _jsx("td", { children: item.type }), _jsx("td", { children: _jsx("span", { className: `badge ${item.inFilter ? 'badge-success' : 'badge-secondary'}`, children: item.inFilter ? 'YES' : 'NO' }) }), _jsx("td", { children: _jsx("span", { className: `badge ${item.inList ? 'badge-success' : 'badge-secondary'}`, children: item.inList ? 'YES' : 'NO' }) }), _jsx("td", { children: _jsx("span", { className: `badge ${item.required ? 'badge-success' : 'badge-secondary'}`, children: item.required ? 'YES' : 'NO' }) }), _jsx("td", { children: _jsx("span", { className: `badge ${item.purpose ? 'badge-success' : 'badge-secondary'}`, children: item.purpose ? 'YES' : 'NO' }) }), _jsx("td", { children: _jsxs("div", { className: "dropdown-container", children: [_jsx("button", { className: "dropdown-toggle", onClick: () => setDropdownOpen(dropdownOpen === `add_${item.id}` ? null : `add_${item.id}`), children: _jsx(MoreHorizontal, { size: 16 }) }), dropdownOpen === `add_${item.id}` && (_jsxs("div", { className: "dropdown-menu", children: [_jsxs("a", { className: "dropdown-item", children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("a", { className: "dropdown-item", children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }) })] }, item.id))) })] }) }) }) })] }))] })] }), showForm && (_jsx("div", { className: "drawer-overlay", onClick: handleCloseForm, children: _jsxs("div", { className: "drawer drawer-right", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h5", { children: editingItem ? `Edit ${getTitle()}` : `Add ${getTitle()}` }), _jsx("button", { className: "drawer-close", onClick: handleCloseForm, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", children: _jsxs("form", { children: [activeTab === 'purpose' && (_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Purpose Title ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", name: "title", className: "form-control", placeholder: "Enter purpose title", value: formData.title, onChange: handleInputChange })] })), activeTab === 'status' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Status ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", name: "status", className: "form-control", placeholder: "Enter status", value: formData.status, onChange: handleInputChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Color" }), _jsx("input", { type: "color", name: "color", className: "form-control color-input", value: formData.color, onChange: handleInputChange })] })] })), activeTab === 'source' && (_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Source ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", name: "source", className: "form-control", placeholder: "Enter source", value: formData.source, onChange: handleInputChange })] })), activeTab === 'types' && (_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Lead Type ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", name: "type", className: "form-control", placeholder: "Enter lead type", value: formData.type, onChange: handleInputChange })] })), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", children: editingItem ? 'Update' : 'Save' }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: handleCloseForm, children: "Cancel" })] })] }) })] }) })), deletingItem && (_jsx("div", { className: "modal-overlay", onClick: () => setDeletingItem(null), children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { children: "Confirm Delete" }), _jsx("button", { className: "modal-close", onClick: () => setDeletingItem(null), children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "modal-body", children: _jsx("p", { children: "Are you sure you want to delete this item?" }) }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-danger", onClick: handleConfirmDelete, children: "Confirm" }), _jsx("button", { className: "btn btn-secondary", onClick: () => setDeletingItem(null), children: "Cancel" })] })] }) }))] }));
};
export default LeadSettingsPage;
//# sourceMappingURL=LeadSettings.js.map