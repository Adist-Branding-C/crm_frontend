import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { X, Search, User } from 'lucide-react';
import './AddLeadDrawer.css';
const sampleLeads = [
    { id: 1, name: 'Rahul Sharma', phone: '9876543210', status: 'Active' },
    { id: 2, name: 'Priya Patel', phone: '9876543211', status: 'Active' },
    { id: 3, name: 'Amit Kumar', phone: '9876543212', status: 'Pending' },
    { id: 4, name: 'Sneha Reddy', phone: '9876543213', status: 'Active' },
    { id: 5, name: 'Vikram Singh', phone: '9876543214', status: 'Inactive' },
    { id: 6, name: 'Ananya Gupta', phone: '9876543215', status: 'Active' },
    { id: 7, name: 'Rajesh Verma', phone: '9876543216', status: 'Pending' },
    { id: 8, name: 'Kavitha Nair', phone: '9876543217', status: 'Active' },
];
const sampleTypes = ['Email', 'SMS', 'WhatsApp', 'Social'];
const AddCampaignDrawer = ({ isOpen, onClose, onSave, campaign = null }) => {
    const [formData, setFormData] = useState({
        name: campaign?.name || '',
        type: campaign?.type || '',
        selectedLeads: campaign?.selectedLeads || [],
        description: campaign?.description || '',
        startDate: campaign?.startDate || '',
        endDate: campaign?.endDate || '',
        createdBy: campaign?.createdBy || 'Admin',
    });
    const [errors, setErrors] = useState({});
    const [showLeadDropdown, setShowLeadDropdown] = useState(false);
    const [leadSearch, setLeadSearch] = useState('');
    const filteredLeads = useMemo(() => {
        if (!leadSearch)
            return sampleLeads;
        return sampleLeads.filter(lead => lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
            lead.phone.includes(leadSearch));
    }, [leadSearch]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name])
            setErrors(prev => ({ ...prev, [name]: '' }));
    };
    const handleLeadSelect = (lead) => {
        if (!formData.selectedLeads.find(l => l.id === lead.id)) {
            setFormData(prev => ({ ...prev, selectedLeads: [...prev.selectedLeads, lead] }));
        }
        setShowLeadDropdown(false);
        setLeadSearch('');
    };
    const handleLeadRemove = (leadId) => {
        setFormData(prev => ({ ...prev, selectedLeads: prev.selectedLeads.filter(l => l.id !== leadId) }));
    };
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Campaign name is required';
        if (!formData.type)
            newErrors.type = 'Type is required';
        if (formData.selectedLeads.length === 0)
            newErrors.selectedLeads = 'Select at least one lead';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = () => {
        if (validate()) {
            const totalTasks = formData.selectedLeads.length;
            onSave({
                name: formData.name,
                type: formData.type,
                totalTasks,
                completedTasks: 0,
                completedPercent: 0,
                createdBy: formData.createdBy,
                createdAt: new Date().toISOString().split('T')[0]
            });
            onClose();
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "drawer-overlay", onClick: onClose, children: _jsxs("div", { className: "drawer-panel", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h2", { children: campaign ? 'Edit Campaign' : 'Add Campaign' }), _jsx("button", { className: "drawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "drawer-body", children: [_jsx("div", { className: "form-section-title", children: "Campaign Information" }), _jsxs("form", { className: "lead-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Campaign Name *" }), _jsx("input", { type: "text", name: "name", placeholder: "Enter campaign name", value: formData.name, onChange: handleChange }), errors.name && _jsx("span", { className: "error-text", children: errors.name })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Type *" }), _jsxs("select", { name: "type", value: formData.type, onChange: handleChange, children: [_jsx("option", { value: "", children: "Select" }), sampleTypes.map(type => (_jsx("option", { value: type, children: type }, type)))] }), errors.type && _jsx("span", { className: "error-text", children: errors.type })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Select Leads *" }), _jsxs("div", { className: "dropdown-search-container", children: [_jsxs("div", { className: "search-input-wrapper", children: [_jsx("input", { type: "text", placeholder: "Search leads...", value: leadSearch, onChange: (e) => { setLeadSearch(e.target.value); setShowLeadDropdown(true); }, onFocus: () => setShowLeadDropdown(true) }), _jsx(Search, { size: 16, className: "search-icon-inner" })] }), showLeadDropdown && filteredLeads.length > 0 && (_jsx("div", { className: "dropdown-list", children: filteredLeads.map(lead => (_jsxs("button", { type: "button", onClick: () => handleLeadSelect(lead), children: [_jsx(User, { size: 14 }), " ", lead.name, " - ", lead.phone] }, lead.id))) }))] }), errors.selectedLeads && _jsx("span", { className: "error-text", children: errors.selectedLeads })] }), formData.selectedLeads.length > 0 && (_jsxs("div", { className: "selected-leads-list", children: [_jsxs("label", { children: ["Selected Leads (", formData.selectedLeads.length, ")"] }), _jsx("div", { className: "leads-tags", children: formData.selectedLeads.map(lead => (_jsxs("span", { className: "lead-tag", children: [lead.name, _jsx("button", { type: "button", onClick: () => handleLeadRemove(lead.id), children: "\u00D7" })] }, lead.id))) })] })), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Description" }), _jsx("textarea", { name: "description", placeholder: "Enter description", value: formData.description, onChange: handleChange, rows: 3 })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Start Date" }), _jsx("input", { type: "date", name: "startDate", value: formData.startDate, onChange: handleChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "End Date" }), _jsx("input", { type: "date", name: "endDate", value: formData.endDate, onChange: handleChange })] })] })] }), _jsxs("div", { className: "drawer-footer", children: [_jsx("button", { className: "btn btn-secondary", onClick: onClose, children: "Cancel" }), _jsx("button", { className: "btn btn-primary", onClick: handleSubmit, children: "Save Campaign" })] })] }) }));
};
export default AddCampaignDrawer;
//# sourceMappingURL=AddCampaignDrawer.js.map