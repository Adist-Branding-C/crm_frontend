import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { PRIORITY_OPTIONS } from '../features/task/shared/constants/priorityOptions';
import { STATUS_OPTIONS } from '../features/task/shared/constants/statusOptions';
import './AddLeadDrawer.css';
const AddLeadTaskDrawer = ({ isOpen, onClose, onSubmit, task, isLoading, error, categoryOptions, staffOptions, isLoadingCategories, isLoadingStaff, categoriesError, staffError }) => {
    const cats = Array.isArray(categoryOptions) ? categoryOptions : [];
    const staffs = Array.isArray(staffOptions) ? staffOptions : [];
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        category: task?.category || '',
        scheduledDate: task?.scheduledDate || '',
        scheduledTime: task?.scheduledTime || '',
        assignedTo: task?.assignedTo || '',
        priority: task?.priority || '',
        status: task?.status || 'Pending',
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name])
            setErrors(prev => ({ ...prev, [name]: '' }));
    };
    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim())
            newErrors.title = 'Title is required';
        if (!formData.status)
            newErrors.status = 'Status is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate())
            return;
        const success = await onSubmit(formData);
        if (success)
            onClose();
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "drawer-overlay", onClick: onClose, children: _jsxs("div", { className: "drawer-panel", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "drawer-header", children: [_jsx("h2", { children: task ? 'Edit Task' : 'Create Task' }), _jsx("button", { className: "drawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "drawer-body", children: _jsxs("form", { className: "lead-form", onSubmit: handleSubmit, children: [error && _jsx("div", { className: "error-text", style: { marginBottom: '1rem' }, children: error }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Title ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsx("input", { type: "text", name: "title", placeholder: "Enter task title", value: formData.title, onChange: handleChange }), errors.title && _jsx("span", { className: "error-text", children: errors.title })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Description" }), _jsx("textarea", { name: "description", placeholder: "Enter description", value: formData.description, onChange: handleChange, rows: 3 })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Category" }), categoriesError && _jsx("div", { className: "error-text", style: { fontSize: '0.75rem' }, children: categoriesError }), _jsxs("select", { name: "category", value: formData.category, onChange: handleChange, disabled: isLoadingCategories, children: [_jsx("option", { value: "", children: isLoadingCategories ? 'Loading...' : 'Select a category' }), cats.length === 0 && !isLoadingCategories && _jsx("option", { value: "", disabled: true, children: "No categories available" }), cats.map(cat => (_jsx("option", { value: cat.value, children: cat.label }, cat.value)))] })] }), _jsxs("div", { className: "form-row", style: { display: 'flex', gap: '1rem' }, children: [_jsxs("div", { className: "form-group", style: { flex: 1 }, children: [_jsx("label", { children: "Scheduled Date" }), _jsx("input", { type: "date", name: "scheduledDate", value: formData.scheduledDate, onChange: handleChange })] }), _jsxs("div", { className: "form-group", style: { flex: 1 }, children: [_jsx("label", { children: "Scheduled Time" }), _jsx("input", { type: "time", name: "scheduledTime", value: formData.scheduledTime, onChange: handleChange })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Assigned To" }), staffError && _jsx("div", { className: "error-text", style: { fontSize: '0.75rem' }, children: staffError }), _jsxs("select", { name: "assignedTo", value: formData.assignedTo, onChange: handleChange, disabled: isLoadingStaff, children: [_jsx("option", { value: "", children: isLoadingStaff ? 'Loading...' : 'Select a staff member' }), staffs.length === 0 && !isLoadingStaff && _jsx("option", { value: "", disabled: true, children: "No staff available" }), staffs.map(staff => (_jsx("option", { value: staff.value, children: staff.label }, staff.value)))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Priority" }), _jsxs("select", { name: "priority", value: formData.priority, onChange: handleChange, children: [_jsx("option", { value: "", children: "Select priority" }), PRIORITY_OPTIONS.map(o => (_jsx("option", { value: o.value, children: o.label }, o.value)))] })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Status ", _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs("select", { name: "status", value: formData.status, onChange: handleChange, children: [_jsx("option", { value: "", children: "Select status" }), STATUS_OPTIONS.map(o => (_jsx("option", { value: o.value, children: o.label }, o.value)))] }), errors.status && _jsx("span", { className: "error-text", children: errors.status })] }), _jsxs("div", { className: "form-actions", style: { display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }, children: [_jsx("button", { type: "button", className: "btn btn-secondary", onClick: onClose, children: "Cancel" }), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: isLoading, children: isLoading ? _jsx(Loader2, { size: 16, className: "spin" }) : task ? 'Update' : 'Save' })] })] }) })] }) }));
};
export default AddLeadTaskDrawer;
//# sourceMappingURL=AddLeadTaskDrawer.js.map