import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import './AddLeadDrawer.css';
const sampleLeads = [
    { id: 1, name: 'Rahul Sharma', phone: '9876543210' },
    { id: 2, name: 'Priya Patel', phone: '9876543211' },
    { id: 3, name: 'Amit Kumar', phone: '9876543212' },
    { id: 4, name: 'Sneha Reddy', phone: '9876543213' },
    { id: 5, name: 'Vikram Singh', phone: '9876543214' },
];
const sampleAgents = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
];
const AddDealDrawer = ({ isOpen, onClose, deal = null, onSave }) => {
    const [formData, setFormData] = useState({
        dealName: deal?.dealName || '',
        lead: deal?.lead || '',
        mobile: deal?.mobile || '',
        amount: deal?.amount || '',
        status: deal?.status || '',
        type: deal?.type || '',
        startDate: deal?.startDate || '',
        endDate: deal?.endDate || '',
        assignAgent: deal?.assignAgent || '',
    });
    const [errors, setErrors] = useState({});
    const [showLeadDropdown, setShowLeadDropdown] = useState(false);
    const [leadSearch, setLeadSearch] = useState('');
    const filteredLeads = useMemo(() => {
        if (!leadSearch)
            return sampleLeads;
        return sampleLeads.filter(lead => lead.name.toLowerCase().includes(leadSearch.toLowerCase()));
    }, [leadSearch]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    const handleLeadSelect = (lead) => {
        setFormData(prev => ({
            ...prev,
            lead: lead.name,
            mobile: lead.phone
        }));
        setShowLeadDropdown(false);
        setLeadSearch('');
    };
    const validate = () => {
        const newErrors = {};
        if (!formData.dealName.trim())
            newErrors.dealName = 'Deal name is required';
        if (!formData.lead)
            newErrors.lead = 'Lead is required';
        if (!formData.mobile.trim())
            newErrors.mobile = 'Mobile is required';
        if (!formData.amount)
            newErrors.amount = 'Amount is required';
        if (!formData.status)
            newErrors.status = 'Status is required';
        if (!formData.type)
            newErrors.type = 'Type is required';
        if (!formData.assignAgent)
            newErrors.assignAgent = 'Assign agent is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = () => {
        if (validate()) {
            onSave(formData);
            onClose();
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "drawer-overlay", onClick: onClose, children: _jsxs("div", { className: "drawer-panel", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h2", { children: deal ? 'Edit Deal' : 'Add Deal' }), _jsx("button", { className: "drawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "drawer-body", children: [_jsx("div", { className: "form-section-title", children: "Deal Information" }), _jsxs("form", { className: "lead-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Deal Name *" }), _jsx("input", { type: "text", name: "dealName", placeholder: "Enter deal name", value: formData.dealName, onChange: handleChange }), errors.dealName && _jsx("span", { className: "error-text", children: errors.dealName })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Lead *" }), _jsxs("div", { className: "dropdown-search-container", children: [_jsxs("div", { className: "search-input-wrapper", children: [_jsx("input", { type: "text", placeholder: "Search lead...", value: formData.lead || leadSearch, onChange: (e) => {
                                                                setLeadSearch(e.target.value);
                                                                setShowLeadDropdown(true);
                                                                if (!e.target.value)
                                                                    setFormData(prev => ({ ...prev, lead: '' }));
                                                            }, onFocus: () => setShowLeadDropdown(true) }), _jsx(Search, { size: 16, className: "search-icon-inner" })] }), showLeadDropdown && filteredLeads.length > 0 && (_jsx("div", { className: "dropdown-list", children: filteredLeads.map(lead => (_jsxs("button", { type: "button", onClick: () => handleLeadSelect(lead), children: [lead.name, " - ", lead.phone] }, lead.id))) }))] }), errors.lead && _jsx("span", { className: "error-text", children: errors.lead })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Mobile *" }), _jsx("input", { type: "tel", name: "mobile", placeholder: "Enter mobile number", value: formData.mobile, onChange: handleChange }), errors.mobile && _jsx("span", { className: "error-text", children: errors.mobile })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Amount (\u20B9) *" }), _jsx("input", { type: "number", name: "amount", placeholder: "Enter amount", value: formData.amount, onChange: handleChange }), errors.amount && _jsx("span", { className: "error-text", children: errors.amount })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Status *" }), _jsxs("select", { name: "status", value: formData.status, onChange: handleChange, children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "win", children: "Deal Win" }), _jsx("option", { value: "lost", children: "Deal Lost" }), _jsx("option", { value: "invoice", children: "Invoice" }), _jsx("option", { value: "pending", children: "Pending" })] }), errors.status && _jsx("span", { className: "error-text", children: errors.status })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Type *" }), _jsxs("select", { name: "type", value: formData.type, onChange: handleChange, children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "sales", children: "Sales" }), _jsx("option", { value: "registration", children: "Registration" }), _jsx("option", { value: "renewal", children: "Renewal" }), _jsx("option", { value: "upsell", children: "Upsell" })] }), errors.type && _jsx("span", { className: "error-text", children: errors.type })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Start Date" }), _jsx("input", { type: "date", name: "startDate", value: formData.startDate, onChange: handleChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "End Date" }), _jsx("input", { type: "date", name: "endDate", value: formData.endDate, onChange: handleChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Assign Agent *" }), _jsxs("select", { name: "assignAgent", value: formData.assignAgent, onChange: handleChange, children: [_jsx("option", { value: "", children: "Select" }), sampleAgents.map(agent => (_jsx("option", { value: agent.name, children: agent.name }, agent.id)))] }), errors.assignAgent && _jsx("span", { className: "error-text", children: errors.assignAgent })] })] })] }), _jsxs("div", { className: "drawer-footer", children: [_jsx("button", { className: "btn btn-secondary", onClick: onClose, children: "Cancel" }), _jsx("button", { className: "btn btn-primary", onClick: handleSubmit, children: "Save Deal" })] })] }) }));
};
export default AddDealDrawer;
//# sourceMappingURL=AddDealDrawer.js.map