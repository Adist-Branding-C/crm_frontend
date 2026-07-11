import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { useNavigate, useParams, NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { Search, Plus, MoreVertical, Edit2, Trash2, ChevronLeft, X, Check, AlertTriangle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './FacebookWorkflows.css';
const facebookPages = [
    { id: 1, name: 'GetLead Official' },
    { id: 2, name: 'CRM Solutions' },
    { id: 3, name: 'Sales Tools' },
];
const facebookForms = [
    { id: 1, pageId: 1, name: 'Contact Form - Demo Request' },
    { id: 2, pageId: 1, name: 'Product Inquiry Form' },
    { id: 3, pageId: 2, name: 'Support Request Form' },
    { id: 4, pageId: 2, name: 'Feedback Form' },
    { id: 5, pageId: 3, name: 'Newsletter Signup' },
];
const facebookFields = [
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'full_name', label: 'Full Name' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'company', label: 'Company' },
    { value: 'city', label: 'City' },
    { value: 'state', label: 'State' },
    { value: 'country', label: 'Country' },
    { value: 'gender', label: 'Gender' },
    { value: 'age', label: 'Age' },
    { value: 'dob', label: 'Date of Birth' },
    { value: 'education', label: 'Education' },
    { value: 'occupation', label: 'Occupation' },
    { value: 'custom_question_1', label: 'Custom Question 1' },
    { value: 'custom_question_2', label: 'Custom Question 2' },
];
const crmFields = [
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'full_name', label: 'Full Name' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'company', label: 'Company' },
    { value: 'designation', label: 'Designation' },
    { value: 'address', label: 'Address' },
    { value: 'city', label: 'City' },
    { value: 'state', label: 'State' },
    { value: 'country', label: 'Country' },
    { value: 'pincode', label: 'Pincode' },
    { value: 'website', label: 'Website' },
    { value: 'industry', label: 'Industry' },
    { value: 'source', label: 'Source' },
    { value: 'status', label: 'Status' },
    { value: 'assigned_to', label: 'Assigned To' },
    { value: 'notes', label: 'Notes' },
    { value: 'custom_field_1', label: 'Custom Field 1' },
    { value: 'custom_field_2', label: 'Custom Field 2' },
];
let workflowsStore = [
    { id: 1, name: 'Demo Request Flow', pageName: 'GetLead Official', formName: 'Contact Form - Demo Request', status: 'active', createdAt: '2026-04-20' },
    { id: 2, name: 'Product Inquiry Handler', pageName: 'GetLead Official', formName: 'Product Inquiry Form', status: 'active', createdAt: '2026-04-18' },
    { id: 3, name: 'Support Ticket Flow', pageName: 'CRM Solutions', formName: 'Support Request Form', status: 'inactive', createdAt: '2026-04-15' },
];
const FacebookWorkflowsPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [workflows, setWorkflows] = useState(workflowsStore);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingWorkflow, setDeletingWorkflow] = useState(null);
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const filteredWorkflows = useMemo(() => {
        let filtered = [...workflows];
        if (searchQuery) {
            filtered = filtered.filter(w => w.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (statusFilter) {
            filtered = filtered.filter(w => w.status === statusFilter);
        }
        return filtered;
    }, [workflows, searchQuery, statusFilter]);
    const paginatedWorkflows = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredWorkflows.slice(start, start + rowsPerPage);
    }, [filteredWorkflows, currentPage, rowsPerPage]);
    const totalPages = Math.ceil(filteredWorkflows.length / rowsPerPage);
    const handleDelete = (workflow) => {
        setDeletingWorkflow(workflow);
        setShowDeleteModal(true);
        setActionMenuOpen(null);
    };
    const confirmDelete = () => {
        const newWorkflows = workflows.filter(w => w.id !== deletingWorkflow.id);
        setWorkflows(newWorkflows);
        workflowsStore = newWorkflows;
        setShowDeleteModal(false);
        setDeletingWorkflow(null);
    };
    return (_jsxs("div", { className: "facebook-workflows-page", children: [_jsx(PageHeader, { title: "Facebook Integration", description: "Manage Facebook lead form workflows and routing", breadcrumb: [
                    { label: 'GL Connect', link: '/user/gl-connect' },
                    { label: 'Facebook Integration' }
                ] }), _jsxs("div", { className: "workflows-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16 }), _jsx("input", { type: "text", placeholder: "Search by workflow name...", value: searchQuery, onChange: (e) => { setSearchQuery(e.target.value); setCurrentPage(1); } })] }), _jsxs("select", { className: "status-filter", value: statusFilter, onChange: (e) => { setStatusFilter(e.target.value); setCurrentPage(1); }, children: [_jsx("option", { value: "", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" })] }), _jsxs("select", { className: "rows-per-page", value: rowsPerPage, onChange: (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }, children: [_jsx("option", { value: 10, children: "10 / page" }), _jsx("option", { value: 25, children: "25 / page" }), _jsx("option", { value: 50, children: "50 / page" })] })] }), _jsx("div", { className: "toolbar-right", children: _jsxs("button", { className: "btn btn-primary", onClick: () => navigate('/facebook/workflows/create'), children: [_jsx(Plus, { size: 16 }), "Create Workflow"] }) })] }), filteredWorkflows.length === 0 ? (_jsxs("div", { className: "empty-state", children: [_jsx("div", { className: "empty-illustration", children: _jsxs("svg", { width: "64", height: "64", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", children: [_jsx("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }), _jsx("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }), _jsx("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })] }) }), _jsx("h3", { children: "No workflows created yet" }), _jsx("p", { children: "Connect Facebook forms and automate lead routing." }), _jsxs("button", { className: "btn btn-primary", onClick: () => navigate('/facebook/workflows/create'), children: [_jsx(Plus, { size: 16 }), "Create First Workflow"] })] })) : (_jsx("div", { className: "workflows-table-wrapper", children: _jsxs("table", { className: "workflows-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Sl No" }), _jsx("th", { children: "Workflow Name" }), _jsx("th", { children: "Facebook Page Name" }), _jsx("th", { children: "Lead Form Name" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Created At" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: paginatedWorkflows.map((workflow, index) => (_jsxs("tr", { children: [_jsx("td", { children: (currentPage - 1) * rowsPerPage + index + 1 }), _jsx("td", { children: _jsx("button", { className: "workflow-name-link", onClick: () => navigate(`/facebook/workflows/${workflow.id}/edit`), children: workflow.name }) }), _jsx("td", { children: workflow.pageName }), _jsx("td", { children: workflow.formName }), _jsx("td", { children: _jsx("span", { className: `status-badge ${workflow.status}`, children: workflow.status === 'active' ? 'Active' : 'Inactive' }) }), _jsx("td", { children: workflow.createdAt }), _jsx("td", { children: _jsxs("div", { className: "actions-cell", children: [_jsx("button", { className: "action-menu-btn", onClick: () => setActionMenuOpen(actionMenuOpen === workflow.id ? null : workflow.id), children: _jsx(MoreVertical, { size: 16 }) }), actionMenuOpen === workflow.id && (_jsxs("div", { className: "action-dropdown", children: [_jsxs("button", { onClick: () => { navigate(`/facebook/workflows/${workflow.id}/edit`); setActionMenuOpen(null); }, children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("button", { className: "delete-action", onClick: () => handleDelete(workflow), children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }) })] }, workflow.id))) })] }) })), filteredWorkflows.length > 0 && (_jsxs("div", { className: "pagination-bar", children: [_jsxs("span", { className: "showing-text", children: ["Showing ", (currentPage - 1) * rowsPerPage + 1, " to ", Math.min(currentPage * rowsPerPage, filteredWorkflows.length), " of ", filteredWorkflows.length, " entries"] }), _jsxs("div", { className: "pagination-controls", children: [_jsx("button", { className: "pagination-btn", onClick: () => setCurrentPage(Math.max(1, currentPage - 1)), disabled: currentPage === 1, children: "Prev" }), Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (_jsx("button", { className: `pagination-number ${currentPage === page ? 'active' : ''}`, onClick: () => setCurrentPage(page), children: page }, page))), _jsx("button", { className: "pagination-btn", onClick: () => setCurrentPage(Math.min(totalPages, currentPage + 1)), disabled: currentPage === totalPages, children: "Next" })] })] })), showDeleteModal && (_jsx("div", { className: "modal-overlay", onClick: () => setShowDeleteModal(false), children: _jsxs("div", { className: "modal-content delete-modal", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h3", { children: "Delete Workflow?" }), _jsx("button", { className: "modal-close", onClick: () => setShowDeleteModal(false), children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "modal-body", children: [_jsxs("div", { className: "delete-warning", children: [_jsx(AlertTriangle, { size: 24 }), _jsx("p", { children: "This action cannot be undone." })] }), _jsxs("p", { className: "delete-message", children: ["Are you sure you want to delete ", _jsx("strong", { children: deletingWorkflow?.name }), "?"] }), _jsxs("div", { className: "modal-actions", children: [_jsx("button", { className: "btn btn-outline", onClick: () => setShowDeleteModal(false), children: "Cancel" }), _jsx("button", { className: "btn btn-danger", onClick: confirmDelete, children: "Delete" })] })] })] }) }))] }));
};
const CreateWorkflowPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        pageId: '',
        formId: '',
        mappings: [{ label: '', value: '' }],
        status: 'active'
    });
    const [errors, setErrors] = useState({});
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field])
            setErrors({ ...errors, [field]: null });
    };
    const addMapping = () => {
        setFormData({ ...formData, mappings: [...formData.mappings, { label: '', value: '' }] });
    };
    const updateMapping = (index, field, value) => {
        const newMappings = [...formData.mappings];
        newMappings[index][field] = value;
        setFormData({ ...formData, mappings: newMappings });
    };
    const removeMapping = (index) => {
        if (formData.mappings.length > 1) {
            const newMappings = formData.mappings.filter((_, i) => i !== index);
            setFormData({ ...formData, mappings: newMappings });
        }
    };
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Workflow name is required';
        if (!formData.pageId)
            newErrors.pageId = 'Facebook page is required';
        if (!formData.formId)
            newErrors.formId = 'Lead form is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSave = () => {
        if (!validate())
            return;
        const page = facebookPages.find(p => p.id === Number(formData.pageId));
        const form = facebookForms.find(f => f.id === Number(formData.formId));
        const newWorkflow = {
            id: Date.now(),
            name: formData.name,
            pageName: page?.name || '',
            formName: form?.name || '',
            status: formData.status,
            createdAt: new Date().toISOString().split('T')[0]
        };
        workflowsStore.push(newWorkflow);
        navigate('/facebook/workflows');
    };
    return (_jsxs("div", { className: "create-workflow-page", children: [_jsxs("div", { className: "page-header-with-toggle", children: [_jsx("div", { className: "header-content", children: _jsx(PageHeader, { title: "Create Workflow", description: "Create a new Facebook lead workflow", breadcrumb: [
                                { label: 'GL Connect', link: '/user/gl-connect' },
                                { label: 'Facebook Integration', link: '/facebook/workflows' },
                                { label: 'Create Workflow' }
                            ] }) }), _jsxs("div", { className: "header-actions", children: [_jsxs("button", { className: "facebook-connect-btn", children: [_jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "currentColor", children: _jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.637H7.9v-3.577h2.3V9.275c0-2.18 1.313-3.396 3.3-3.396.955 0 1.95.16 1.95.16v2.133h-1.097c-1.078 0-1.413.676-1.413 1.37v1.645h2.393l-.383 3.577h-2.01v8.637C19.612 23.027 24 18.062 24 12.073z" }) }), "Connect with Facebook"] }), _jsxs("label", { className: "toggle-switch", children: [_jsx("input", { type: "checkbox", checked: formData.status === 'active', onChange: (e) => handleChange('status', e.target.checked ? 'active' : 'inactive') }), _jsx("span", { className: "toggle-slider" }), _jsx("span", { className: "toggle-label", children: formData.status === 'active' ? 'On' : 'Off' })] })] })] }), _jsxs("div", { className: "workflow-form-card", children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Workflow Name ", _jsx("span", { className: "required", children: "*" })] }), _jsx("input", { type: "text", placeholder: "Enter workflow name", value: formData.name, onChange: (e) => handleChange('name', e.target.value), className: errors.name ? 'error' : '' }), errors.name && _jsx("span", { className: "error-message", children: errors.name })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Choose Facebook Page ", _jsx("span", { className: "required", children: "*" })] }), _jsxs("select", { value: formData.pageId, onChange: (e) => handleChange('pageId', e.target.value), className: errors.pageId ? 'error' : '', children: [_jsx("option", { value: "", children: "Select Facebook Page" }), facebookPages.map(page => (_jsx("option", { value: page.id, children: page.name }, page.id)))] }), errors.pageId && _jsx("span", { className: "error-message", children: errors.pageId })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Select Lead Form ", _jsx("span", { className: "required", children: "*" })] }), _jsxs("select", { value: formData.formId, onChange: (e) => handleChange('formId', e.target.value), className: errors.formId ? 'error' : '', children: [_jsx("option", { value: "", children: "Select Lead Form" }), facebookForms
                                                .filter(f => !formData.pageId || f.pageId === Number(formData.pageId))
                                                .map(form => (_jsx("option", { value: form.id, children: form.name }, form.id)))] }), errors.formId && _jsx("span", { className: "error-message", children: errors.formId })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Field Mapping" }), _jsxs("div", { className: "mapping-rows", children: [formData.mappings.map((mapping, index) => (_jsxs("div", { className: "mapping-row", children: [_jsxs("select", { value: mapping.label, onChange: (e) => updateMapping(index, 'label', e.target.value), children: [_jsx("option", { value: "", children: "Select Facebook Field" }), facebookFields.map(field => (_jsx("option", { value: field.value, children: field.label }, field.value)))] }), _jsxs("select", { value: mapping.value, onChange: (e) => updateMapping(index, 'value', e.target.value), children: [_jsx("option", { value: "", children: "Select CRM Field" }), crmFields.map(field => (_jsx("option", { value: field.value, children: field.label }, field.value)))] }), _jsx("button", { className: "remove-mapping-btn", onClick: () => removeMapping(index), disabled: formData.mappings.length === 1, children: _jsx(X, { size: 16 }) })] }, index))), _jsxs("button", { className: "add-mapping-btn", onClick: addMapping, children: [_jsx(Plus, { size: 16 }), " Add Field Mapping"] })] })] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { className: "btn btn-primary", onClick: handleSave, children: "Save Workflow" }), _jsx("button", { className: "btn btn-outline", onClick: () => navigate('/facebook/workflows'), children: "Cancel" })] })] })] }));
};
const EditWorkflowPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const workflow = workflowsStore.find(w => w.id === Number(id));
    const [formData, setFormData] = useState({
        name: workflow?.name || '',
        pageId: facebookPages.find(p => p.name === workflow?.pageName)?.id || '',
        formId: facebookForms.find(f => f.name === workflow?.formName)?.id || '',
        mappings: [{ label: '', value: '' }],
        status: workflow?.status || 'active'
    });
    const [errors, setErrors] = useState({});
    if (!workflow) {
        return _jsx(Navigate, { to: "/facebook/workflows" });
    }
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field])
            setErrors({ ...errors, [field]: null });
    };
    const addMapping = () => {
        setFormData({ ...formData, mappings: [...formData.mappings, { label: '', value: '' }] });
    };
    const updateMapping = (index, field, value) => {
        const newMappings = [...formData.mappings];
        newMappings[index][field] = value;
        setFormData({ ...formData, mappings: newMappings });
    };
    const removeMapping = (index) => {
        if (formData.mappings.length > 1) {
            const newMappings = formData.mappings.filter((_, i) => i !== index);
            setFormData({ ...formData, mappings: newMappings });
        }
    };
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Workflow name is required';
        if (!formData.pageId)
            newErrors.pageId = 'Facebook page is required';
        if (!formData.formId)
            newErrors.formId = 'Lead form is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleUpdate = () => {
        if (!validate())
            return;
        const page = facebookPages.find(p => p.id === Number(formData.pageId));
        const form = facebookForms.find(f => f.id === Number(formData.formId));
        const index = workflowsStore.findIndex(w => w.id === Number(id));
        if (index !== -1) {
            workflowsStore[index] = {
                ...workflowsStore[index],
                name: formData.name,
                pageName: page?.name || '',
                formName: form?.name || '',
                status: formData.status
            };
        }
        navigate('/facebook/workflows');
    };
    const handleDelete = () => {
        const index = workflowsStore.findIndex(w => w.id === Number(id));
        if (index !== -1) {
            workflowsStore.splice(index, 1);
        }
        navigate('/facebook/workflows');
    };
    return (_jsxs("div", { className: "create-workflow-page", children: [_jsxs("div", { className: "page-header-with-toggle", children: [_jsx("div", { className: "header-content", children: _jsx(PageHeader, { title: "Edit Workflow", description: "Edit the Facebook lead workflow", breadcrumb: [
                                { label: 'GL Connect', link: '/user/gl-connect' },
                                { label: 'Facebook Integration', link: '/facebook/workflows' },
                                { label: 'Edit Workflow' }
                            ] }) }), _jsxs("div", { className: "header-actions", children: [_jsxs("button", { className: "facebook-connect-btn", children: [_jsx("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "currentColor", children: _jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.637H7.9v-3.577h2.3V9.275c0-2.18 1.313-3.396 3.3-3.396.955 0 1.95.16 1.95.16v2.133h-1.097c-1.078 0-1.413.676-1.413 1.37v1.645h2.393l-.383 3.577h-2.01v8.637C19.612 23.027 24 18.062 24 12.073z" }) }), "Connect with Facebook"] }), _jsxs("label", { className: "toggle-switch", children: [_jsx("input", { type: "checkbox", checked: formData.status === 'active', onChange: (e) => handleChange('status', e.target.checked ? 'active' : 'inactive') }), _jsx("span", { className: "toggle-slider" }), _jsx("span", { className: "toggle-label", children: formData.status === 'active' ? 'On' : 'Off' })] })] })] }), _jsxs("div", { className: "workflow-form-card", children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Workflow Name ", _jsx("span", { className: "required", children: "*" })] }), _jsx("input", { type: "text", placeholder: "Enter workflow name", value: formData.name, onChange: (e) => handleChange('name', e.target.value), className: errors.name ? 'error' : '' }), errors.name && _jsx("span", { className: "error-message", children: errors.name })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Choose Facebook Page ", _jsx("span", { className: "required", children: "*" })] }), _jsxs("select", { value: formData.pageId, onChange: (e) => handleChange('pageId', e.target.value), className: errors.pageId ? 'error' : '', children: [_jsx("option", { value: "", children: "Select Facebook Page" }), facebookPages.map(page => (_jsx("option", { value: page.id, children: page.name }, page.id)))] }), errors.pageId && _jsx("span", { className: "error-message", children: errors.pageId })] }), _jsxs("div", { className: "form-group", children: [_jsxs("label", { children: ["Select Lead Form ", _jsx("span", { className: "required", children: "*" })] }), _jsxs("select", { value: formData.formId, onChange: (e) => handleChange('formId', e.target.value), className: errors.formId ? 'error' : '', children: [_jsx("option", { value: "", children: "Select Lead Form" }), facebookForms
                                                .filter(f => !formData.pageId || f.pageId === Number(formData.pageId))
                                                .map(form => (_jsx("option", { value: form.id, children: form.name }, form.id)))] }), errors.formId && _jsx("span", { className: "error-message", children: errors.formId })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Field Mapping" }), _jsxs("div", { className: "mapping-rows", children: [formData.mappings.map((mapping, index) => (_jsxs("div", { className: "mapping-row", children: [_jsxs("select", { value: mapping.label, onChange: (e) => updateMapping(index, 'label', e.target.value), children: [_jsx("option", { value: "", children: "Select Facebook Field" }), facebookFields.map(field => (_jsx("option", { value: field.value, children: field.label }, field.value)))] }), _jsxs("select", { value: mapping.value, onChange: (e) => updateMapping(index, 'value', e.target.value), children: [_jsx("option", { value: "", children: "Select CRM Field" }), crmFields.map(field => (_jsx("option", { value: field.value, children: field.label }, field.value)))] }), _jsx("button", { className: "remove-mapping-btn", onClick: () => removeMapping(index), disabled: formData.mappings.length === 1, children: _jsx(X, { size: 16 }) })] }, index))), _jsxs("button", { className: "add-mapping-btn", onClick: addMapping, children: [_jsx(Plus, { size: 16 }), " Add Field Mapping"] })] })] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { className: "btn btn-primary", onClick: handleUpdate, children: "Update Workflow" }), _jsx("button", { className: "btn btn-outline", onClick: () => navigate('/facebook/workflows'), children: "Cancel" }), _jsx("button", { className: "btn btn-danger-outline", onClick: handleDelete, children: "Delete Workflow" })] })] })] }));
};
const FacebookWorkflows = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "", element: _jsx(FacebookWorkflowsPage, {}) }), _jsx(Route, { path: "create", element: _jsx(CreateWorkflowPage, {}) }), _jsx(Route, { path: ":id/edit", element: _jsx(EditWorkflowPage, {}) })] }));
};
export default FacebookWorkflows;
//# sourceMappingURL=FacebookWorkflows.js.map