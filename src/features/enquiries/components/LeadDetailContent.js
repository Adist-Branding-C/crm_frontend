import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Phone, MessageSquare, Trash2, Plus, Briefcase, User, Mail as MailIcon, Check, Clock, ArrowLeft, Edit2, Calendar, FileText, Loader2 } from 'lucide-react';
import AddLeadTaskDrawer from '../../../components/AddLeadTaskDrawer';
import AddLeadDrawer from '../../../shared/components/drawers/AddLeadDrawer';
import AddDealDrawer from '../../../shared/components/drawers/AddDealDrawer';
import { useLeadActivities } from '../hooks/useLeadActivities';
import Toast from '../../../shared/components/Toast';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { useLeadRemarks } from '../hooks/useLeadRemarks';
import { useLeadTasks } from '../hooks/useLeadTasks';
import { useLeadTaskDropdowns } from '../hooks/useLeadTaskDropdowns';
import { useLeadFormOptions } from '../hooks/useLeadFormOptions';
import { useLeadDeals } from '../hooks/useLeadDeals';
import { leadDataService } from '../services/leadDataService';
import { formatDateTime, formatRelativeDate, formatFollowUpDate } from '../../../shared/utils/dateUtils';
import { badgeClass } from '../../../shared/utils/badgeUtils';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
import EditableDetailField from '../../../shared/components/drawers/EditableDetailField';
/**
 * All lead-detail business content: profile header, Basic Info/Contact/More
 * Info sections (with inline-editable fields), and the Activity/Note/Task/Deal
 * tabs. Knows nothing about being inside a drawer or overlay - it mounts
 * fresh each time it's rendered (the drawer shell controls whether that
 * happens at all), so its data-fetching hooks always run as "just opened."
 *
 * Used by:
 * - LeadDetailDrawer (composed inside the shared Drawer shell)
 */
const LeadDetailContent = ({ lead, onClose, onLeadUpdated, onDeleteLead }) => {
    const [activeTab, setActiveTab] = useState('activity');
    const [showTaskDrawer, setShowTaskDrawer] = useState(false);
    const [showEditDrawer, setShowEditDrawer] = useState(false);
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
    const [showAddDealDrawer, setShowAddDealDrawer] = useState(false);
    const { activities: apiActivities, isLoading: activitiesLoading, error: activitiesError } = useLeadActivities(lead.id, true);
    const { remarks, isLoading: isLoadingRemarks, error: errorRemarks, isAdding: isAddingRemark, isUpdating: isUpdatingRemark, isDeleting: isDeletingRemark, addRemark, updateRemark, deleteRemark, } = useLeadRemarks(lead.id, true, activeTab);
    const { tasks, isLoading: isLoadingTasks, error: tasksError, addTask, updateTask, deleteTask, } = useLeadTasks(lead.id, true, activeTab);
    const { categoryOptions, staffOptions, isLoadingCategories, isLoadingStaff, categoriesError, staffError, } = useLeadTaskDropdowns(showTaskDrawer);
    const { staffOptions: agentOptions, purposeOptions, typeOptions, statusOptions, sourceOptions, additionalFieldDefs, } = useLeadFormOptions(true);
    const { deals: leadDeals, isLoading: dealsLoading, error: dealsError, isAdding: isAddingDeal, addDeal, } = useLeadDeals(lead.leadId, true);
    const toSelectOptions = (options) => options.map((o) => ({ value: o.value, label: o.label }));
    const findOptionValueByLabel = (options, label) => {
        if (!label)
            return '';
        return options.find((o) => o.label === label)?.value ?? '';
    };
    const showToastMessage = (title, type) => {
        setToastMessage(title);
        setToastType(type);
        setShowToast(true);
    };
    const saveLeadField = async (payload) => {
        if (!lead.leadId)
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
    const handleDealSave = async (formData) => {
        const success = await addDeal(formData);
        if (success) {
            showToastMessage(SUCCESS_MESSAGES.DEAL_CREATED, 'success');
            setShowAddDealDrawer(false);
        }
        else {
            showToastMessage(dealsError || ERROR_MESSAGES.CREATE_DEAL, 'error');
        }
        return success;
    };
    const handlePhoneClick = () => {
        if (lead.phone) {
            window.open(`tel:${lead.phone}`);
        }
    };
    const handleWhatsAppClick = () => {
        if (!lead.phone)
            return;
        const digits = lead.phone.replace(/[^0-9]/g, '');
        let number;
        if (digits.length === 10) {
            number = `91${digits}`;
        }
        else if (digits.length === 12 && digits.startsWith('91')) {
            number = digits;
        }
        else {
            number = digits;
        }
        window.open(`https://wa.me/${number}`, '_blank');
    };
    const handleAddTask = async (formData) => {
        const success = await addTask(formData);
        if (success) {
            showToastMessage(SUCCESS_MESSAGES.TASK_CREATED, 'success');
        }
        else {
            showToastMessage(ERROR_MESSAGES.ADD_TASK, 'error');
        }
        return success;
    };
    const handleEditTask = async (formData) => {
        if (!editTask)
            return false;
        const success = await updateTask(editTask.id, formData);
        if (success) {
            setEditTask(null);
            showToastMessage(SUCCESS_MESSAGES.TASK_UPDATED, 'success');
        }
        else {
            showToastMessage(ERROR_MESSAGES.UPDATE_TASK, 'error');
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
                showToastMessage(SUCCESS_MESSAGES.TASK_DELETED, 'success');
            }
            else {
                showToastMessage(ERROR_MESSAGES.DELETE_TASK, 'error');
            }
        }
        catch {
            showToastMessage(ERROR_MESSAGES.DELETE_TASK, 'error');
        }
        finally {
            setShowDeleteTaskModal(false);
            setDeleteTaskTarget(null);
            setIsDeletingTask(false);
        }
    };
    const handleEditLeadSaved = () => {
        setShowEditDrawer(false);
        showToastMessage(SUCCESS_MESSAGES.LEAD_UPDATED, 'success');
        onLeadUpdated?.();
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
            showToastMessage(SUCCESS_MESSAGES.REMARK_ADDED, 'success');
        }
        catch {
            showToastMessage(ERROR_MESSAGES.ADD_REMARK, 'error');
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
        if (editingRemarkId == null)
            return;
        try {
            await updateRemark(editingRemarkId, trimmed);
            setEditingRemarkId(null);
            setEditingRemarkText('');
            showToastMessage(SUCCESS_MESSAGES.REMARK_UPDATED, 'success');
        }
        catch {
            showToastMessage(ERROR_MESSAGES.UPDATE_REMARK, 'error');
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
            showToastMessage(SUCCESS_MESSAGES.REMARK_DELETED, 'success');
        }
        catch {
            showToastMessage(ERROR_MESSAGES.DELETE_REMARK, 'error');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "leaddrawer-two-col", children: [_jsxs("div", { className: "leaddrawer-left", children: [_jsxs("div", { className: "leaddrawer-left-header", children: [_jsx("div", { className: "leaddrawer-left-header-left", children: _jsxs("button", { className: "leaddrawer-back-btn", onClick: onClose, children: [_jsx(ArrowLeft, { size: 18 }), " Back"] }) }), _jsx("button", { className: "leaddrawer-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "leaddrawer-main", children: [_jsxs("div", { className: "leaddrawer-profile", children: [_jsx("div", { className: "leaddrawer-avatar", children: lead.name?.charAt(0) || 'L' }), _jsx("h2", { className: "leaddrawer-name", children: lead.name }), _jsxs("div", { className: "leaddrawer-badges", children: [_jsx("span", { className: `leaddrawer-badge ${lead.type ? badgeClass(lead.type) : ''}`, children: lead.type }), _jsx("span", { className: `leaddrawer-badge ${lead.status ? badgeClass(lead.status) : ''}`, children: lead.status })] })] }), _jsxs("div", { className: "leaddrawer-actions", children: [_jsx("button", { className: "leaddrawer-action-btn", title: "Edit", onClick: () => setShowEditDrawer(true), children: _jsx(Edit2, { size: 16 }) }), _jsx("button", { className: "leaddrawer-action-btn", title: "WhatsApp", onClick: handleWhatsAppClick, disabled: !lead.phone, style: !lead.phone ? { opacity: 0.5, cursor: 'not-allowed' } : {}, children: _jsx(MessageSquare, { size: 16 }) }), _jsx("button", { className: "leaddrawer-action-btn", title: "Phone", onClick: handlePhoneClick, disabled: !lead.phone, style: !lead.phone ? { opacity: 0.5, cursor: 'not-allowed' } : {}, children: _jsx(Phone, { size: 16 }) }), _jsx("button", { className: "leaddrawer-action-btn delete", title: "Delete", onClick: () => onDeleteLead?.(lead), children: _jsx(Trash2, { size: 16 }) })] }), _jsxs("div", { className: "leaddrawer-section", children: [_jsx("div", { className: "leaddrawer-section-title", children: "Basic Info" }), _jsxs("div", { className: "leaddrawer-info-grid", children: [_jsxs("div", { className: "leaddrawer-info-item", children: [_jsx("div", { className: "leaddrawer-info-icon", children: _jsx(User, { size: 14 }) }), _jsxs("div", { className: "leaddrawer-info-content", children: [_jsx("span", { className: "leaddrawer-info-label", children: "Created By" }), _jsx("span", { className: "leaddrawer-info-value", children: lead.assignedTo || '-' })] })] }), _jsxs("div", { className: "leaddrawer-info-item", children: [_jsx("div", { className: "leaddrawer-info-icon", children: _jsx(Calendar, { size: 14 }) }), _jsxs("div", { className: "leaddrawer-info-content", children: [_jsx("span", { className: "leaddrawer-info-label", children: "Created At" }), _jsx("span", { className: "leaddrawer-info-value", children: formatRelativeDate(lead.createdAt) })] })] }), _jsxs("div", { className: "leaddrawer-info-item", children: [_jsx("div", { className: "leaddrawer-info-icon", children: _jsx(Calendar, { size: 14 }) }), _jsxs("div", { className: "leaddrawer-info-content", children: [_jsx("span", { className: "leaddrawer-info-label", children: "Updated At" }), _jsx("span", { className: "leaddrawer-info-value", children: formatRelativeDate(lead.updatedAt) })] })] })] })] }), _jsxs("div", { className: "leaddrawer-section", children: [_jsx("div", { className: "leaddrawer-section-title", children: "Contact" }), _jsxs("div", { className: "leaddrawer-info-grid", children: [_jsxs("div", { className: "leaddrawer-info-item", children: [_jsx("div", { className: "leaddrawer-info-icon", children: _jsx(Phone, { size: 14 }) }), _jsxs("div", { className: "leaddrawer-info-content", children: [_jsx("span", { className: "leaddrawer-info-label", children: "Phone" }), _jsx("span", { className: "leaddrawer-info-value", children: lead.phone || '-' })] })] }), _jsxs("div", { className: "leaddrawer-info-item", children: [_jsx("div", { className: "leaddrawer-info-icon", children: _jsx(MailIcon, { size: 14 }) }), _jsxs("div", { className: "leaddrawer-info-content", children: [_jsx("span", { className: "leaddrawer-info-label", children: "Email" }), _jsx("span", { className: "leaddrawer-info-value", children: lead.email || '-' })] })] })] })] }), _jsxs("div", { className: "leaddrawer-section", children: [_jsx("div", { className: "leaddrawer-section-title", children: "More Info" }), _jsxs("div", { className: "leaddrawer-details-grid", children: [_jsx(EditableDetailField, { label: "Source", displayValue: lead.source || '', editValue: findOptionValueByLabel(sourceOptions, lead.source), type: "select", options: toSelectOptions(sourceOptions), onSave: (v) => saveLeadField({ sourceId: v }) }), _jsx(EditableDetailField, { label: "Purpose", displayValue: lead.purpose || '', editValue: findOptionValueByLabel(purposeOptions, lead.purpose), type: "select", options: toSelectOptions(purposeOptions), onSave: (v) => saveLeadField({ purposeId: v }) }), _jsx(EditableDetailField, { label: "Status", displayValue: lead.status || '', editValue: findOptionValueByLabel(statusOptions, lead.status), type: "select", options: toSelectOptions(statusOptions), onSave: (v) => saveLeadField({ statusId: v }) }), _jsx(EditableDetailField, { label: "Assigned To", displayValue: lead.assignedTo || '', editValue: findOptionValueByLabel(agentOptions, lead.assignedTo), type: "select", options: toSelectOptions(agentOptions), onSave: (v) => saveLeadField({ agentId: v }) }), _jsx(EditableDetailField, { label: "Type", displayValue: lead.type || '', editValue: findOptionValueByLabel(typeOptions, lead.type), type: "select", options: toSelectOptions(typeOptions), onSave: (v) => saveLeadField({ typeId: v }) }), _jsx(EditableDetailField, { label: "Follow Up", displayValue: formatFollowUpDate(lead.nextFollowUp), editValue: lead.nextFollowUp ? lead.nextFollowUp.slice(0, 10) : '', type: "date", onSave: (v) => saveLeadField({ nextFollowUp: v }) }), _jsx(EditableDetailField, { label: "Location", displayValue: lead.location || '', editValue: lead.location || '', type: "text", fullWidth: true, onSave: (v) => saveLeadField({ location: v }) }), (lead.additionalFields || []).map((af) => {
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
                                                    })] })] })] })] }), _jsxs("div", { className: "leaddrawer-right", children: [_jsxs("div", { className: "leaddrawer-tabs", children: [_jsxs("button", { className: `leaddrawer-tab ${activeTab === 'activity' ? 'active' : ''}`, onClick: () => setActiveTab('activity'), children: [_jsx(Clock, { size: 14 }), " Activity"] }), _jsxs("button", { className: `leaddrawer-tab ${activeTab === 'note' ? 'active' : ''}`, onClick: () => setActiveTab('note'), children: [_jsx(FileText, { size: 14 }), " Log Note"] }), _jsxs("button", { className: `leaddrawer-tab ${activeTab === 'task' ? 'active' : ''}`, onClick: () => setActiveTab('task'), children: [_jsx(Check, { size: 14 }), " Task"] }), _jsxs("button", { className: `leaddrawer-tab ${activeTab === 'deal' ? 'active' : ''}`, onClick: () => setActiveTab('deal'), children: [_jsx(Briefcase, { size: 14 }), " Deal"] })] }), _jsxs("div", { className: "leaddrawer-tab-content", children: [activeTab === 'activity' && (_jsxs("div", { children: [_jsx("div", { className: "leaddrawer-tab-header", children: _jsx("h3", { className: "leaddrawer-tab-heading", children: "Latest Activity" }) }), activitiesLoading ? (_jsx("div", { className: "leaddrawer-activity-list", children: _jsx("div", { className: "leaddrawer-loading", children: "Loading activities..." }) })) : activitiesError ? (_jsx("div", { className: "leaddrawer-activity-list", children: _jsx("div", { className: "leaddrawer-error", children: activitiesError }) })) : apiActivities.length === 0 ? (_jsx("div", { className: "leaddrawer-activity-list", children: _jsx("div", { className: "leaddrawer-empty", children: "No activities found." }) })) : (_jsx("div", { className: "leaddrawer-activity-list", children: apiActivities.map((item) => (_jsxs("div", { className: "leaddrawer-activity-card", children: [_jsx("div", { className: "leaddrawer-activity-avatar", children: (item.actorName || '?').charAt(0).toUpperCase() }), _jsxs("div", { className: "leaddrawer-activity-content", children: [_jsx("div", { className: "leaddrawer-activity-header", children: _jsx("span", { className: "leaddrawer-activity-user", children: item.actorName }) }), _jsx("span", { className: "leaddrawer-activity-time", children: formatDateTime(item.createdAt) }), _jsx("p", { className: "leaddrawer-activity-desc", children: item.description })] })] }, item.id))) }))] })), activeTab === 'note' && (_jsxs("div", { children: [_jsx("div", { className: "leaddrawer-tab-header", children: _jsx("h3", { className: "leaddrawer-tab-heading", children: "Notes Timeline" }) }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("textarea", { id: "note-input", placeholder: "Write a note...", value: newRemarkText, onChange: (e) => setNewRemarkText(e.target.value), style: {
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
                                                        }, disabled: isAddingRemark }), _jsx("button", { className: "btn btn-primary btn-sm", onClick: handleAddRemark, disabled: isAddingRemark || !newRemarkText.trim(), style: { marginTop: '0.5rem' }, children: isAddingRemark ? _jsxs(_Fragment, { children: [_jsx(Loader2, { size: 14, className: "spin" }), " Adding..."] }) : 'Save Note' })] }), isLoadingRemarks ? (_jsx("div", { className: "leaddrawer-loading", children: "Loading remarks..." })) : errorRemarks ? (_jsx("div", { className: "leaddrawer-error", children: errorRemarks })) : remarks.length === 0 ? (_jsxs("div", { className: "leaddrawer-empty-state", children: [_jsx("div", { className: "leaddrawer-empty-icon", children: _jsx(FileText, { size: 24 }) }), _jsx("h4", { className: "leaddrawer-empty-title", children: "No remarks yet" }), _jsx("p", { className: "leaddrawer-empty-text", children: "Add a note to start tracking updates." })] })) : (_jsx("div", { children: remarks.map((remark) => (_jsxs("div", { className: "leaddrawer-note-card", children: [_jsx("div", { className: "leaddrawer-note-avatar", children: (remark.agentName || '?').charAt(0).toUpperCase() }), _jsxs("div", { className: "leaddrawer-note-content", children: [_jsxs("div", { className: "leaddrawer-note-header", children: [_jsx("span", { className: "leaddrawer-note-user", children: remark.agentName }), _jsx("span", { className: "leaddrawer-note-time", children: formatDateTime(remark.createdAt) })] }), editingRemarkId === remark.id ? (_jsxs("div", { children: [_jsx("textarea", { className: "leaddrawer-remark-edit-textarea", value: editingRemarkText, onChange: (e) => setEditingRemarkText(e.target.value), disabled: isUpdatingRemark }), _jsxs("div", { className: "leaddrawer-note-edit-actions", children: [_jsx("button", { className: "btn btn-primary btn-sm", onClick: handleSaveEdit, disabled: isUpdatingRemark || !editingRemarkText.trim(), children: isUpdatingRemark ? _jsxs(_Fragment, { children: [_jsx(Loader2, { size: 14, className: "spin" }), " Saving..."] }) : 'Save' }), _jsx("button", { className: "btn btn-secondary btn-sm", onClick: cancelEditRemark, disabled: isUpdatingRemark, children: "Cancel" })] })] })) : (_jsx("p", { className: "leaddrawer-note-text", children: remark.remarkNote })), _jsxs("div", { className: "leaddrawer-note-actions", children: [_jsx("button", { className: "leaddrawer-note-action", onClick: () => startEditRemark(remark), children: _jsx(Edit2, { size: 14 }) }), _jsx("button", { className: "leaddrawer-note-action", onClick: () => handleDeleteClick(remark), children: _jsx(Trash2, { size: 14 }) })] })] })] }, remark.id))) })), _jsx(AdminDeleteModal, { isOpen: showDeleteRemarkModal, itemName: "this remark", onConfirm: handleDeleteConfirm, onClose: () => { setShowDeleteRemarkModal(false); setRemarkToDelete(null); }, isDeleting: isDeletingRemark }), _jsx(Toast, { message: toastMessage, type: toastType, isVisible: showToast, onClose: () => setShowToast(false) })] })), activeTab === 'task' && (_jsxs("div", { children: [_jsxs("div", { className: "leaddrawer-tab-header", children: [_jsx("h3", { className: "leaddrawer-tab-heading", children: "Tasks" }), _jsxs("button", { className: "btn btn-primary btn-sm", onClick: () => { setEditTask(null); setShowTaskDrawer(true); }, children: [_jsx(Plus, { size: 14 }), " Add Task"] })] }), isLoadingTasks ? (_jsx("div", { className: "leaddrawer-loading", children: "Loading tasks..." })) : tasksError ? (_jsx("div", { className: "leaddrawer-error", children: tasksError })) : tasks.length === 0 ? (_jsxs("div", { className: "leaddrawer-empty-state", children: [_jsx("div", { className: "leaddrawer-empty-icon", children: _jsx(Check, { size: 24 }) }), _jsx("h4", { className: "leaddrawer-empty-title", children: "No tasks yet" }), _jsx("p", { className: "leaddrawer-empty-text", children: "Add a task to keep track of work." })] })) : (_jsx("div", { children: tasks.map((task) => (_jsxs("div", { className: "leaddrawer-task-card", children: [_jsxs("div", { className: "leaddrawer-task-info", children: [_jsx("div", { className: "leaddrawer-task-title", children: task.title }), _jsxs("div", { className: "leaddrawer-task-meta", children: [task.scheduledDate && _jsx("span", { children: (task.scheduledTime ? `${task.scheduledDate} ${task.scheduledTime}` : task.scheduledDate) }), _jsx("span", { children: task.assignedTo || '-' })] }), task.description && _jsx("p", { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }, children: task.description })] }), _jsxs("div", { className: "leaddrawer-task-badges", children: [task.priority && _jsx("span", { className: `leaddrawer-task-badge ${getPriorityClass(task.priority)}`, children: task.priority }), task.status && _jsx("span", { className: `leaddrawer-task-badge ${getStatusClass(task.status)}`, children: task.status })] }), _jsxs("div", { className: "leaddrawer-task-actions", children: [_jsx("button", { className: "leaddrawer-note-action", onClick: () => { setEditTask(task); setShowTaskDrawer(true); }, children: _jsx(Edit2, { size: 14 }) }), _jsx("button", { className: "leaddrawer-note-action", onClick: () => handleDeleteTaskClick(task), children: _jsx(Trash2, { size: 14 }) })] })] }, task.id))) }))] })), activeTab === 'deal' && (_jsxs("div", { children: [_jsxs("div", { className: "leaddrawer-tab-header", children: [_jsx("h3", { className: "leaddrawer-tab-heading", children: "Deals" }), _jsxs("button", { className: "btn btn-primary btn-sm", onClick: () => setShowAddDealDrawer(true), children: [_jsx(Plus, { size: 14 }), " Add Deal"] })] }), dealsLoading ? (_jsx("div", { className: "leaddrawer-loading", children: "Loading deals..." })) : dealsError ? (_jsx("div", { className: "leaddrawer-error", children: dealsError })) : leadDeals.length === 0 ? (_jsxs("div", { className: "leaddrawer-empty-state", children: [_jsx("div", { className: "leaddrawer-empty-icon", children: _jsx(Briefcase, { size: 24 }) }), _jsx("h4", { className: "leaddrawer-empty-title", children: "No deals yet" }), _jsx("p", { className: "leaddrawer-empty-text", children: "No deals linked to this lead." })] })) : (_jsx("div", { children: leadDeals.map((deal) => (_jsxs("div", { className: "leaddrawer-deal-card", children: [_jsxs("div", { className: "leaddrawer-deal-header", children: [_jsxs("div", { children: [_jsx("div", { className: "leaddrawer-deal-title", children: deal.dealName || deal.title || `Deal #${deal.id}` }), _jsxs("div", { className: "leaddrawer-task-meta", children: [deal.endDate && _jsxs("span", { children: ["Expected: ", deal.endDate] }), _jsxs("span", { children: ["Owner: ", deal.agent || deal.assignedTo || '-'] })] })] }), deal.amount != null && _jsxs("span", { className: "leaddrawer-deal-amount", children: ["\u20B9", Number(deal.amount).toLocaleString()] })] }), _jsx("span", { className: `leaddrawer-deal-stage ${badgeClass(deal.stage || deal.status || '')}`, children: deal.stage || deal.status || '-' })] }, deal.id))) }))] }))] })] })] }), _jsx(AddLeadTaskDrawer, { isOpen: showTaskDrawer, onClose: () => { setShowTaskDrawer(false); setEditTask(null); }, onSubmit: editTask ? handleEditTask : handleAddTask, task: editTask, isLoading: isLoadingTasks, error: tasksError, categoryOptions: categoryOptions, staffOptions: staffOptions, isLoadingCategories: isLoadingCategories, isLoadingStaff: isLoadingStaff, categoriesError: categoriesError, staffError: staffError }), _jsx(AddLeadDrawer, { isOpen: showEditDrawer, onClose: () => setShowEditDrawer(false), onSaved: handleEditLeadSaved, lead: lead }), _jsx(AdminDeleteModal, { isOpen: showDeleteTaskModal, itemName: deleteTaskTarget?.title || 'this task', onConfirm: handleDeleteTaskConfirm, onClose: () => { setShowDeleteTaskModal(false); setDeleteTaskTarget(null); }, isDeleting: isDeletingTask }), _jsx(AddDealDrawer, { isOpen: showAddDealDrawer, onClose: () => setShowAddDealDrawer(false), deal: { lead: lead?.name, leadId: lead?.leadId ?? '' }, onSave: handleDealSave })] }));
};
export default LeadDetailContent;
//# sourceMappingURL=LeadDetailContent.js.map