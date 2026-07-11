import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import './AddLeadDrawer.css';
const sampleDeals = [
    { id: 1, name: 'Website Development', dealId: 'DL001', amount: 150000 },
    { id: 2, name: 'CRM Implementation', dealId: 'DL002', amount: 200000 },
    { id: 3, name: 'Annual Maintenance', dealId: 'DL003', amount: 50000 },
];
const sampleAgents = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
];
const sampleCategories = [
    { id: 1, name: 'Follow Up' },
    { id: 2, name: 'Payment Reminder' },
    { id: 3, name: 'Demo' },
    { id: 4, name: 'Documentation' },
    { id: 5, name: 'Closing' },
];
const AddDealTaskDrawer = ({ isOpen, onClose, task = null, onSave }) => {
    const [formData, setFormData] = useState({
        title: task?.title || '',
        category: task?.category || '',
        deal: task?.deal || '',
        dealId: task?.dealId || '',
        amount: task?.amount || '',
        description: task?.description || '',
        scheduledDate: task?.scheduledDate || '',
        scheduledTime: task?.scheduledTime || '',
        assignedBy: task?.assignedBy || 'Admin',
        assignedTo: task?.assignedTo || '',
        priority: task?.priority || 'medium',
        status: task?.status || 'pending',
    });
    const [errors, setErrors] = useState({});
    const [showDealDropdown, setShowDealDropdown] = useState(false);
    const [dealSearch, setDealSearch] = useState('');
    const filteredDeals = useMemo(() => {
        if (!dealSearch)
            return sampleDeals;
        return sampleDeals.filter(deal => deal.name.toLowerCase().includes(dealSearch.toLowerCase()));
    }, [dealSearch]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    const handleDealSelect = (deal) => {
        setFormData(prev => ({
            ...prev,
            deal: deal.name,
            dealId: deal.dealId,
            amount: String(deal.amount)
        }));
        setShowDealDropdown(false);
        setDealSearch('');
    };
    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim())
            newErrors.title = 'Title is required';
        if (!formData.category)
            newErrors.category = 'Category is required';
        if (!formData.deal)
            newErrors.deal = 'Deal is required';
        if (!formData.scheduledDate)
            newErrors.scheduledDate = 'Scheduled date is required';
        if (!formData.scheduledTime)
            newErrors.scheduledTime = 'Scheduled time is required';
        if (!formData.assignedTo)
            newErrors.assignedTo = 'Assigned to is required';
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
    return (_jsx("div", { className: "drawer-overlay", onClick: onClose, children: _jsxs("div", { className: "drawer-panel", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h2", { children: task ? 'Edit Deal Task' : 'Create Deal Task' }), _jsx("button", { className: "drawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "drawer-body", children: [_jsx("div", { className: "form-section-title", children: "Task Details" }), _jsxs("form", { className: "lead-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Title *" }), _jsx("input", { type: "text", name: "title", placeholder: "Enter task title", value: formData.title, onChange: handleChange }), errors.title && _jsx("span", { className: "error-text", children: errors.title })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Category *" }), _jsxs("select", { name: "category", value: formData.category, onChange: handleChange, children: [_jsx("option", { value: "", children: "Select" }), sampleCategories.map(cat => (_jsx("option", { value: cat.name, children: cat.name }, cat.id)))] }), errors.category && _jsx("span", { className: "error-text", children: errors.category })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Deal *" }), _jsxs("div", { className: "dropdown-search-container", children: [_jsxs("div", { className: "search-input-wrapper", children: [_jsx("input", { type: "text", placeholder: "Search deal...", value: formData.deal || dealSearch, onChange: (e) => {
                                                                setDealSearch(e.target.value);
                                                                setShowDealDropdown(true);
                                                                if (!e.target.value)
                                                                    setFormData(prev => ({ ...prev, deal: '', dealId: '', amount: '' }));
                                                            }, onFocus: () => setShowDealDropdown(true) }), _jsx(Search, { size: 16, className: "search-icon-inner" })] }), showDealDropdown && filteredDeals.length > 0 && (_jsx("div", { className: "dropdown-list", children: filteredDeals.map(deal => (_jsxs("button", { type: "button", onClick: () => handleDealSelect(deal), children: [deal.name, " - \u20B9", deal.amount.toLocaleString()] }, deal.id))) }))] }), errors.deal && _jsx("span", { className: "error-text", children: errors.deal })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Amount (\u20B9)" }), _jsx("input", { type: "number", name: "amount", placeholder: "Enter amount", value: formData.amount, onChange: handleChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Description" }), _jsx("textarea", { name: "description", placeholder: "Enter description", value: formData.description, onChange: handleChange, rows: 3 })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Scheduled Date *" }), _jsx("input", { type: "date", name: "scheduledDate", value: formData.scheduledDate, onChange: handleChange }), errors.scheduledDate && _jsx("span", { className: "error-text", children: errors.scheduledDate })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Scheduled Time *" }), _jsx("input", { type: "time", name: "scheduledTime", value: formData.scheduledTime, onChange: handleChange }), errors.scheduledTime && _jsx("span", { className: "error-text", children: errors.scheduledTime })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Assigned By" }), _jsx("input", { type: "text", name: "assignedBy", value: formData.assignedBy, disabled: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Assigned To *" }), _jsxs("select", { name: "assignedTo", value: formData.assignedTo, onChange: handleChange, children: [_jsx("option", { value: "", children: "Select" }), sampleAgents.map(agent => (_jsx("option", { value: agent.name, children: agent.name }, agent.id)))] }), errors.assignedTo && _jsx("span", { className: "error-text", children: errors.assignedTo })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Priority" }), _jsxs("select", { name: "priority", value: formData.priority, onChange: handleChange, children: [_jsx("option", { value: "low", children: "Low" }), _jsx("option", { value: "medium", children: "Medium" }), _jsx("option", { value: "high", children: "High" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Status" }), _jsxs("select", { name: "status", value: formData.status, onChange: handleChange, children: [_jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "completed", children: "Completed" }), _jsx("option", { value: "overdue", children: "OverDue" })] })] })] })] }), _jsxs("div", { className: "drawer-footer", children: [_jsx("button", { className: "btn btn-secondary", onClick: onClose, children: "Cancel" }), _jsx("button", { className: "btn btn-primary", onClick: handleSubmit, children: "Save Task" })] })] }) }));
};
export default AddDealTaskDrawer;
//# sourceMappingURL=AddDealTaskDrawer.js.map