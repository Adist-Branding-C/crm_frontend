import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare, Trash2, Plus, Mail, Mail as MailIcon, Send, Check, Clock, ArrowLeft, Edit2, Calendar, User, FileText, AlertTriangle, Loader2 } from 'lucide-react';
import './LeadDetailDrawer.css';
import AddLeadTaskDrawer from './AddLeadTaskDrawer';
import AddLeadDrawer from '../shared/components/drawers/AddLeadDrawer';
import { useLeadActivities } from '../features/enquiries/hooks/useLeadActivities';
import Toast from '../shared/components/Toast';
import AdminDeleteModal from '../shared/components/crud/AdminDeleteModal';
import { useLeadRemarks } from '../features/enquiries/hooks/useLeadRemarks';
import { useLeadTasks } from '../features/enquiries/hooks/useLeadTasks';
import { useLeadTaskDropdowns } from '../features/enquiries/hooks/useLeadTaskDropdowns';
import { useLeadFormOptions } from '../features/enquiries/hooks/useLeadFormOptions';
import { leadDataService } from '../features/enquiries/services/leadDataService';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../features/enquiries/constants/messages';
import EditableDetailField from '../shared/components/drawers/EditableDetailField';
import { formatDateTime, formatRelativeDate, formatFollowUpDate } from '../shared/utils/dateUtils';
const LeadDetailDrawer = ({ lead, isOpen, onClose, onLeadUpdated }) => {
    const [activeTab, setActiveTab] = useState('activity');
    const [showTaskDrawer, setShowTaskDrawer] = useState(false);
    const [showEditDrawer, setShowEditDrawer] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [newRemarkText, setNewRemarkText] = useState('');
    const [editingRemarkId, setEditingRemarkId] = useState(null);
    const [editingRemarkText, setEditingRemarkText] = useState('');
    const [showDeleteRemarkModal, setShowDeleteRemarkModal] = useState(false);
    const [remarkToDelete, setRemarkToDelete] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [showToast, setShowToast] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [deleteTaskTarget, setDeleteTaskTarget] = useState(null);
    const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
    const [isDeletingTask, setIsDeletingTask] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 350);
        }
        else if (isVisible) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsVisible(false);
                setIsAnimating(false);
            }, 350);
        }
    }, [isOpen]);
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            return () => window.removeEventListener('keydown', handleEsc);
        }
    }, [isOpen, onClose]);
    const { activities: apiActivities, isLoading: activitiesLoading, error: activitiesError } = useLeadActivities(lead?.id, isOpen);
    const { remarks, isLoading: isLoadingRemarks, error: errorRemarks, isAdding: isAddingRemark, isUpdating: isUpdatingRemark, isDeleting: isDeletingRemark, addRemark, updateRemark, deleteRemark, } = useLeadRemarks(lead?.id, isOpen, activeTab);
    const { tasks, isLoading: isLoadingTasks, error: tasksError, addTask, updateTask, deleteTask, } = useLeadTasks(lead?.id, isOpen, activeTab);
    const { categoryOptions, staffOptions, isLoadingCategories, isLoadingStaff, categoriesError, staffError, } = useLeadTaskDropdowns(showTaskDrawer);
    const { staffOptions: agentOptions, purposeOptions, typeOptions, statusOptions, sourceOptions, additionalFieldDefs, } = useLeadFormOptions(isOpen);
    if (!isVisible || !lead)
        return null;
    const showToastMessage = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
    };
    const toSelectOptions = (options) => options.map((o) => ({ value: o.value, label: o.label }));
    const findOptionValueByLabel = (options, label) => {
        if (!label)
            return '';
        return options.find((o) => o.label === label)?.value ?? '';
    };
    const saveLeadField = async (payload) => {
        if (!lead?.leadId)
            return false;
        try {
            const res = await leadDataService.updateLead(lead.leadId, payload);
            if (res.status) {
                showToastMessage(SUCCESS_MESSAGES.LEAD_UPDATED, 'success');
                onLeadUpdated?.();
                return true;
            }
            showToastMessage(res.message || ERROR_MESSAGES.UPDATE_LEAD, 'error');
            return false;
        }
        catch {
            showToastMessage(ERROR_MESSAGES.UPDATE_LEAD, 'error');
            return false;
        }
    };
    const handleAddTask = async (formData) => {
        const success = await addTask(formData);
        if (success) {
            showToastMessage('Task created successfully', 'success');
        }
        else {
            showToastMessage('Failed to create task', 'error');
        }
        return success;
    };
    const handleEditTask = async (formData) => {
        if (!editTask)
            return false;
        const success = await updateTask(editTask.id, formData);
        if (success) {
            setEditTask(null);
            showToastMessage('Task updated successfully', 'success');
        }
        else {
            showToastMessage('Failed to update task', 'error');
        }
        return success;
    };
    const handleDeleteTaskClick = (task) => {
        setDeleteTaskTarget(task);
        setShowDeleteTaskModal(true);
    };
    const handleDeleteTaskConfirm = async () => {
        if (!deleteTaskTarget || isDeletingTask)
            return;
        setIsDeletingTask(true);
        try {
            const success = await deleteTask(deleteTaskTarget.id);
            if (success) {
                showToastMessage('Task deleted successfully', 'success');
            }
            else {
                showToastMessage('Failed to delete task', 'error');
            }
        }
        catch {
            showToastMessage('Failed to delete task', 'error');
        }
        finally {
            setShowDeleteTaskModal(false);
            setDeleteTaskTarget(null);
            setIsDeletingTask(false);
        }
    };
    const handleEditLeadSaved = (action) => {
        setShowEditDrawer(false);
        showToastMessage('Lead updated successfully', 'success');
        onLeadUpdated?.();
        onClose();
    };
    const getPriorityClass = (priority) => (priority || '').toLowerCase();
    const getStatusClass = (status) => {
        const s = (status || '').toLowerCase();
        return s === 'in progress' ? 'in-progress' : s;
    };
    const handleAddRemark = async () => {
        const trimmed = newRemarkText.trim();
        if (!trimmed)
            return;
        try {
            await addRemark(trimmed);
            setNewRemarkText('');
            showToastMessage('Remark added successfully.', 'success');
        }
        catch {
            showToastMessage('Failed to add remark.', 'error');
        }
    };
    const startEditRemark = (remark) => {
        setEditingRemarkId(remark.id);
        setEditingRemarkText(remark.remarkNote);
    };
    const cancelEditRemark = () => {
        setEditingRemarkId(null);
        setEditingRemarkText('');
    };
    const handleSaveEdit = async () => {
        const trimmed = editingRemarkText.trim();
        const original = remarks.find((r) => r.id === editingRemarkId);
        if (!trimmed) {
            cancelEditRemark();
            return;
        }
        if (trimmed === original?.remarkNote) {
            cancelEditRemark();
            return;
        }
        try {
            await updateRemark(editingRemarkId, trimmed);
            setEditingRemarkId(null);
            setEditingRemarkText('');
            showToastMessage('Remark updated successfully.', 'success');
        }
        catch {
            showToastMessage('Failed to update remark.', 'error');
        }
    };
    const handleDeleteClick = (remark) => {
        setRemarkToDelete(remark);
        setShowDeleteRemarkModal(true);
    };
    const handleDeleteConfirm = async () => {
        if (!remarkToDelete)
            return;
        try {
            await deleteRemark(remarkToDelete.id);
            setShowDeleteRemarkModal(false);
            setRemarkToDelete(null);
            showToastMessage('Remark deleted successfully.', 'success');
        }
        catch {
            showToastMessage('Failed to delete remark.', 'error');
        }
    };
    const getTypeBadgeClass = (type) => {
        if (!type)
            return '';
        return type.toLowerCase().replace(' ', '-');
    };
    return (_jsxs("div", { className: `leaddrawer-overlay ${isOpen ? 'visible' : ''}`, onClick: onClose, children: [_jsx("div", { className: `leaddrawer-panel ${isAnimating ? 'animating' : ''}`, onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "leaddrawer-two-col", children: [_jsxs("div", { className: "leaddrawer-left", children: [_jsxs("div", { className: "leaddrawer-left-header", children: [_jsx("div", { className: "leaddrawer-left-header-left", children: _jsxs("button", { className: "leaddrawer-back-btn", onClick: onClose, children: [_jsx(ArrowLeft, { size: 18 }), " Back"] }) }), _jsx("button", { className: "leaddrawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "leaddrawer-main", children: [_jsxs("div", { className: "leaddrawer-profile", children: [_jsx("div", { className: "leaddrawer-avatar", children: lead.name?.charAt(0) || 'L' }), _jsx("h2", { className: "leaddrawer-name", children: lead.name }), _jsxs("div", { className: "leaddrawer-badges", children: [_jsx("span", { className: `leaddrawer-badge ${getTypeBadgeClass(lead.type)}`, children: lead.type }), _jsx("span", { className: `leaddrawer-badge ${lead.status?.toLowerCase()}`, children: lead.status })] })] }), _jsxs("div", { className: "leaddrawer-actions", children: [_jsx("button", { className: "leaddrawer-action-btn", title: "Edit", onClick: () => setShowEditDrawer(true), children: _jsx(Edit2, { size: 16 }) }), _jsx("button", { className: "leaddrawer-action-btn", title: "WhatsApp", children: _jsx(MessageSquare, { size: 16 }) }), _jsx("button", { className: "leaddrawer-action-btn", title: "SMS", children: _jsx(Phone, { size: 16 }) }), _jsx("button", { className: "leaddrawer-action-btn delete", title: "Delete", onClick: () => setShowDeleteConfirm(true), children: _jsx(Trash2, { size: 16 }) })] }), _jsxs("div", { className: "leaddrawer-section", children: [_jsx("div", { className: "leaddrawer-section-title", children: "Basic Info" }), _jsxs("div", { className: "leaddrawer-info-grid", children: [_jsxs("div", { className: "leaddrawer-info-item", children: [_jsx("div", { className: "leaddrawer-info-icon", children: _jsx(User, { size: 14 }) }), _jsxs("div", { className: "leaddrawer-info-content", children: [_jsx("span", { className: "leaddrawer-info-label", children: "Created By" }), _jsx("span", { className: "leaddrawer-info-value", children: lead.assignedTo || '-' })] })] }), _jsxs("div", { className: "leaddrawer-info-item", children: [_jsx("div", { className: "leaddrawer-info-icon", children: _jsx(Calendar, { size: 14 }) }), _jsxs("div", { className: "leaddrawer-info-content", children: [_jsx("span", { className: "leaddrawer-info-label", children: "Created At" }), _jsx("span", { className: "leaddrawer-info-value", children: formatRelativeDate(lead.createdAt) })] })] }), _jsxs("div", { className: "leaddrawer-info-item", children: [_jsx("div", { className: "leaddrawer-info-icon", children: _jsx(Calendar, { size: 14 }) }), _jsxs("div", { className: "leaddrawer-info-content", children: [_jsx("span", { className: "leaddrawer-info-label", children: "Updated At" }), _jsx("span", { className: "leaddrawer-info-value", children: formatRelativeDate(lead.updatedAt) })] })] })] })] }), _jsxs("div", { className: "leaddrawer-section", children: [_jsx("div", { className: "leaddrawer-section-title", children: "Contact" }), _jsxs("div", { className: "leaddrawer-info-grid", children: [_jsxs("div", { className: "leaddrawer-info-item", children: [_jsx("div", { className: "leaddrawer-info-icon", children: _jsx(Phone, { size: 14 }) }), _jsxs("div", { className: "leaddrawer-info-content", children: [_jsx("span", { className: "leaddrawer-info-label", children: "Phone" }), _jsx("span", { className: "leaddrawer-info-value", children: lead.phone || '-' })] })] }), _jsxs("div", { className: "leaddrawer-info-item", children: [_jsx("div", { className: "leaddrawer-info-icon", children: _jsx(MailIcon, { size: 14 }) }), _jsxs("div", { className: "leaddrawer-info-content", children: [_jsx("span", { className: "leaddrawer-info-label", children: "Email" }), _jsx("span", { className: "leaddrawer-info-value", children: lead.email || '-' })] })] })] })] }), _jsxs("div", { className: "leaddrawer-section", children: [_jsx("div", { className: "leaddrawer-section-title", children: "More Info" }), _jsxs("div", { className: "leaddrawer-details-grid", children: [_jsx(EditableDetailField, { label: "Source", displayValue: lead.source || '', editValue: findOptionValueByLabel(sourceOptions, lead.source), type: "select", options: toSelectOptions(sourceOptions), onSave: (v) => saveLeadField({ sourceId: v }) }), _jsx(EditableDetailField, { label: "Purpose", displayValue: lead.purpose || '', editValue: findOptionValueByLabel(purposeOptions, lead.purpose), type: "select", options: toSelectOptions(purposeOptions), onSave: (v) => saveLeadField({ purposeId: v }) }), _jsx(EditableDetailField, { label: "Status", displayValue: lead.status || '', editValue: findOptionValueByLabel(statusOptions, lead.status), type: "select", options: toSelectOptions(statusOptions), onSave: (v) => saveLeadField({ statusId: v }) }), _jsx(EditableDetailField, { label: "Assigned To", displayValue: lead.assignedTo || '', editValue: findOptionValueByLabel(agentOptions, lead.assignedTo), type: "select", options: toSelectOptions(agentOptions), onSave: (v) => saveLeadField({ agentId: v }) }), _jsx(EditableDetailField, { label: "Type", displayValue: lead.type || '', editValue: findOptionValueByLabel(typeOptions, lead.type), type: "select", options: toSelectOptions(typeOptions), onSave: (v) => saveLeadField({ typeId: v }) }), _jsx(EditableDetailField, { label: "Follow Up", displayValue: formatFollowUpDate(lead.nextFollowUp), editValue: lead.nextFollowUp ? lead.nextFollowUp.slice(0, 10) : '', type: "date", onSave: (v) => saveLeadField({ nextFollowUp: v }) }), _jsx(EditableDetailField, { label: "Location", displayValue: lead.location || '', editValue: lead.location || '', type: "text", fullWidth: true, onSave: (v) => saveLeadField({ location: v }) }), (lead.additionalFields || []).map((af) => {
                                                            const def = additionalFieldDefs.find((d) => d.name === af.name);
                                                            const fieldType = (def?.fieldType || 'text').toLowerCase();
                                                            const isCheckbox = fieldType === 'checkbox';
                                                            const options = (def?.values || []).map((v) => ({ value: v, label: v }));
                                                            const editValue = isCheckbox
                                                                ? (af.value ? af.value.split(',').map((v) => v.trim()) : [])
                                                                : (af.value || '');
                                                            const inputType = fieldType === 'dropdown' ? 'select' : (fieldType === 'date' || fieldType === 'datetime') ? 'date' : isCheckbox ? 'checkbox' : 'text';
                                                            return (_jsx(EditableDetailField, { label: af.name, displayValue: af.value != null ? af.value : '', editValue: editValue, type: inputType, options: options, onSave: (v) => {
                                                                    const nextValue = Array.isArray(v) ? v.join(',') : v;
                                                                    const nextFields = (lead.additionalFields || []).map((f) => f.fieldId === af.fieldId ? { fieldId: f.fieldId, value: nextValue } : { fieldId: f.fieldId, value: f.value });
                                                                    return saveLeadField({ additionalFields: nextFields });
                                                                } }, af.fieldId));
                                                        })] })] })] })] }), _jsxs("div", { className: "leaddrawer-right", children: [_jsxs("div", { className: "leaddrawer-tabs", children: [_jsxs("button", { className: `leaddrawer-tab ${activeTab === 'activity' ? 'active' : ''}`, onClick: () => setActiveTab('activity'), children: [_jsx(Clock, { size: 14 }), " Activity"] }), _jsxs("button", { className: `leaddrawer-tab ${activeTab === 'note' ? 'active' : ''}`, onClick: () => setActiveTab('note'), children: [_jsx(FileText, { size: 14 }), " Log Note"] }), _jsxs("button", { className: `leaddrawer-tab ${activeTab === 'task' ? 'active' : ''}`, onClick: () => setActiveTab('task'), children: [_jsx(Check, { size: 14 }), " Task"] }), _jsxs("button", { className: `leaddrawer-tab ${activeTab === 'email' ? 'active' : ''}`, onClick: () => setActiveTab('email'), children: [_jsx(Mail, { size: 14 }), " Email"] })] }), _jsxs("div", { className: "leaddrawer-tab-content", children: [activeTab === 'activity' && (_jsxs("div", { children: [_jsx("div", { className: "leaddrawer-tab-header", children: _jsx("h3", { className: "leaddrawer-tab-heading", children: "Latest Activity" }) }), activitiesLoading ? (_jsx("div", { className: "leaddrawer-activity-list", children: _jsx("div", { className: "leaddrawer-loading", children: "Loading activities..." }) })) : activitiesError ? (_jsx("div", { className: "leaddrawer-activity-list", children: _jsx("div", { className: "leaddrawer-error", children: activitiesError }) })) : apiActivities.length === 0 ? (_jsx("div", { className: "leaddrawer-activity-list", children: _jsx("div", { className: "leaddrawer-empty", children: "No activities found." }) })) : (_jsx("div", { className: "leaddrawer-activity-list", children: apiActivities.map((item) => (_jsxs("div", { className: "leaddrawer-activity-card", children: [_jsx("div", { className: "leaddrawer-activity-avatar", children: (item.actorName || '?').charAt(0).toUpperCase() }), _jsxs("div", { className: "leaddrawer-activity-content", children: [_jsx("div", { className: "leaddrawer-activity-header", children: _jsx("span", { className: "leaddrawer-activity-user", children: item.actorName }) }), _jsx("span", { className: "leaddrawer-activity-time", children: formatDateTime(item.createdAt) }), _jsx("p", { className: "leaddrawer-activity-desc", children: item.description })] })] }, item.id))) }))] })), activeTab === 'note' && (_jsxs("div", { children: [_jsx("div", { className: "leaddrawer-tab-header", children: _jsx("h3", { className: "leaddrawer-tab-heading", children: "Notes Timeline" }) }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("textarea", { id: "note-input", placeholder: "Write a note...", value: newRemarkText, onChange: (e) => setNewRemarkText(e.target.value), style: {
                                                                width: '100%',
                                                                padding: '0.75rem',
                                                                border: '1px solid var(--border-color)',
                                                                borderRadius: 'var(--border-radius-sm)',
                                                                fontSize: '0.875rem',
                                                                background: 'var(--bg-card)',
                                                                color: 'var(--text-main)',
                                                                fontFamily: 'inherit',
                                                                minHeight: '80px',
                                                                resize: 'vertical'
                                                            }, disabled: isAddingRemark }), _jsx("button", { className: "btn btn-primary btn-sm", onClick: handleAddRemark, disabled: isAddingRemark || !newRemarkText.trim(), style: { marginTop: '0.5rem' }, children: isAddingRemark ? _jsxs(_Fragment, { children: [_jsx(Loader2, { size: 14, className: "spin" }), " Adding..."] }) : 'Save Note' })] }), isLoadingRemarks ? (_jsx("div", { className: "leaddrawer-loading", children: "Loading remarks..." })) : errorRemarks ? (_jsx("div", { className: "leaddrawer-error", children: errorRemarks })) : remarks.length === 0 ? (_jsxs("div", { className: "leaddrawer-empty-state", children: [_jsx("div", { className: "leaddrawer-empty-icon", children: _jsx(FileText, { size: 24 }) }), _jsx("h4", { className: "leaddrawer-empty-title", children: "No remarks yet" }), _jsx("p", { className: "leaddrawer-empty-text", children: "Add a note to start tracking updates." })] })) : (_jsx("div", { children: remarks.map((remark) => (_jsxs("div", { className: "leaddrawer-note-card", children: [_jsx("div", { className: "leaddrawer-note-avatar", children: (remark.agentName || '?').charAt(0).toUpperCase() }), _jsxs("div", { className: "leaddrawer-note-content", children: [_jsxs("div", { className: "leaddrawer-note-header", children: [_jsx("span", { className: "leaddrawer-note-user", children: remark.agentName }), _jsx("span", { className: "leaddrawer-note-time", children: formatDateTime(remark.createdAt) })] }), editingRemarkId === remark.id ? (_jsxs("div", { children: [_jsx("textarea", { className: "leaddrawer-remark-edit-textarea", value: editingRemarkText, onChange: (e) => setEditingRemarkText(e.target.value), disabled: isUpdatingRemark }), _jsxs("div", { className: "leaddrawer-note-edit-actions", children: [_jsx("button", { className: "btn btn-primary btn-sm", onClick: handleSaveEdit, disabled: isUpdatingRemark || !editingRemarkText.trim(), children: isUpdatingRemark ? _jsxs(_Fragment, { children: [_jsx(Loader2, { size: 14, className: "spin" }), " Saving..."] }) : 'Save' }), _jsx("button", { className: "btn btn-secondary btn-sm", onClick: cancelEditRemark, disabled: isUpdatingRemark, children: "Cancel" })] })] })) : (_jsx("p", { className: "leaddrawer-note-text", children: remark.remarkNote })), _jsxs("div", { className: "leaddrawer-note-actions", children: [_jsx("button", { className: "leaddrawer-note-action", onClick: () => startEditRemark(remark), children: _jsx(Edit2, { size: 14 }) }), _jsx("button", { className: "leaddrawer-note-action", onClick: () => handleDeleteClick(remark), children: _jsx(Trash2, { size: 14 }) })] })] })] }, remark.id))) })), _jsx(AdminDeleteModal, { isOpen: showDeleteRemarkModal, itemName: "this remark", onConfirm: handleDeleteConfirm, onClose: () => { setShowDeleteRemarkModal(false); setRemarkToDelete(null); }, isDeleting: isDeletingRemark }), _jsx(Toast, { message: toastMessage, type: toastType, isVisible: showToast, onClose: () => setShowToast(false) })] })), activeTab === 'task' && (_jsxs("div", { children: [_jsxs("div", { className: "leaddrawer-tab-header", children: [_jsx("h3", { className: "leaddrawer-tab-heading", children: "Tasks" }), _jsxs("button", { className: "btn btn-primary btn-sm", onClick: () => { setEditTask(null); setShowTaskDrawer(true); }, children: [_jsx(Plus, { size: 14 }), " Add Task"] })] }), isLoadingTasks ? (_jsx("div", { className: "leaddrawer-loading", children: "Loading tasks..." })) : tasksError ? (_jsx("div", { className: "leaddrawer-error", children: tasksError })) : tasks.length === 0 ? (_jsxs("div", { className: "leaddrawer-empty-state", children: [_jsx("div", { className: "leaddrawer-empty-icon", children: _jsx(Check, { size: 24 }) }), _jsx("h4", { className: "leaddrawer-empty-title", children: "No tasks yet" }), _jsx("p", { className: "leaddrawer-empty-text", children: "Add a task to keep track of work." })] })) : (_jsx("div", { children: tasks.map(task => (_jsxs("div", { className: "leaddrawer-task-card", children: [_jsxs("div", { className: "leaddrawer-task-info", children: [_jsx("div", { className: "leaddrawer-task-title", children: task.title }), _jsxs("div", { className: "leaddrawer-task-meta", children: [task.scheduledDate && _jsx("span", { children: (task.scheduledTime ? `${task.scheduledDate} ${task.scheduledTime}` : task.scheduledDate) }), _jsx("span", { children: task.assignedTo || '-' })] }), task.description && _jsx("p", { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }, children: task.description })] }), _jsxs("div", { className: "leaddrawer-task-badges", children: [task.priority && _jsx("span", { className: `leaddrawer-task-badge ${getPriorityClass(task.priority)}`, children: task.priority }), task.status && _jsx("span", { className: `leaddrawer-task-badge ${getStatusClass(task.status)}`, children: task.status })] }), _jsxs("div", { className: "leaddrawer-task-actions", children: [_jsx("button", { className: "leaddrawer-note-action", onClick: () => { setEditTask(task); setShowTaskDrawer(true); }, children: _jsx(Edit2, { size: 14 }) }), _jsx("button", { className: "leaddrawer-note-action", onClick: () => handleDeleteTaskClick(task), children: _jsx(Trash2, { size: 14 }) })] })] }, task.id))) }))] })), activeTab === 'email' && (_jsxs("div", { children: [_jsxs("div", { className: "leaddrawer-tab-header", children: [_jsx("h3", { className: "leaddrawer-tab-heading", children: "Compose Email" }), _jsxs("button", { className: "btn btn-primary btn-sm", children: [_jsx(Send, { size: 14 }), " Send"] })] }), _jsxs("div", { className: "leaddrawer-email-compose", children: [_jsx("div", { className: "leaddrawer-form-group", children: _jsx("input", { type: "email", placeholder: "To", defaultValue: lead.email || '' }) }), _jsx("div", { className: "leaddrawer-form-group", children: _jsx("input", { type: "text", placeholder: "Subject" }) }), _jsx("div", { className: "leaddrawer-form-group", children: _jsx("textarea", { placeholder: "Write your message..." }) })] })] }))] })] })] }) }), showDeleteConfirm && (_jsx("div", { style: {
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 9999,
                }, onClick: () => setShowDeleteConfirm(false), children: _jsxs("div", { style: {
                        background: 'white', borderRadius: '12px', width: '100%',
                        maxWidth: '420px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                    }, onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { style: {
                                display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', padding: '1.25rem 1.5rem',
                                borderBottom: '1px solid #e5e7eb',
                            }, children: [_jsx("h5", { style: { margin: 0, fontSize: '18px', fontWeight: 600 }, children: "Confirm Delete" }), _jsx("button", { style: { background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }, onClick: () => setShowDeleteConfirm(false), children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { style: { padding: '1.5rem', textAlign: 'center' }, children: [_jsx("div", { style: {
                                        width: '60px', height: '60px', background: '#fef2f2',
                                        borderRadius: '50%', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', margin: '0 auto 1.25rem', color: '#dc2626',
                                    }, children: _jsx(AlertTriangle, { size: 40 }) }), _jsxs("p", { style: { fontSize: '14px', color: '#1a1b1d', marginBottom: '0.5rem' }, children: ["Are you sure you want to delete ", _jsx("strong", { style: { color: '#dc2626' }, children: lead?.name }), "?", _jsx("br", {}), "This action cannot be undone."] })] }), _jsxs("div", { style: {
                                display: 'flex', gap: '1rem', padding: '1rem 1.5rem',
                                borderTop: '1px solid #e5e7eb', justifyContent: 'center',
                            }, children: [_jsx("button", { style: {
                                        padding: '0.625rem 1.25rem', borderRadius: '6px', fontSize: '14px',
                                        fontWeight: 500, cursor: 'pointer', background: '#dc2626',
                                        color: 'white', border: 'none',
                                    }, onClick: () => { setShowDeleteConfirm(false); onClose(); }, children: "Delete Lead" }), _jsx("button", { style: {
                                        padding: '0.625rem 1.25rem', borderRadius: '6px', fontSize: '14px',
                                        fontWeight: 500, cursor: 'pointer', background: '#f3f4f6',
                                        color: '#374151', border: 'none',
                                    }, onClick: () => setShowDeleteConfirm(false), children: "Cancel" })] })] }) })), _jsx(AddLeadTaskDrawer, { isOpen: showTaskDrawer, onClose: () => { setShowTaskDrawer(false); setEditTask(null); }, onSubmit: editTask ? handleEditTask : handleAddTask, task: editTask, isLoading: isLoadingTasks, error: tasksError, categoryOptions: categoryOptions, staffOptions: staffOptions, isLoadingCategories: isLoadingCategories, isLoadingStaff: isLoadingStaff, categoriesError: categoriesError, staffError: staffError }), _jsx(AddLeadDrawer, { isOpen: showEditDrawer, onClose: () => setShowEditDrawer(false), onSaved: handleEditLeadSaved, lead: lead }), _jsx(AdminDeleteModal, { isOpen: showDeleteTaskModal, itemName: deleteTaskTarget?.title || 'this task', onConfirm: handleDeleteTaskConfirm, onClose: () => { setShowDeleteTaskModal(false); setDeleteTaskTarget(null); }, isDeleting: isDeletingTask })] }));
};
export default LeadDetailDrawer;
//# sourceMappingURL=LeadDetailDrawer.js.map