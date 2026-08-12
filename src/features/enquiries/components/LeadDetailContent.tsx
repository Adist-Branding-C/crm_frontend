import React, { useState } from 'react';
import { X, Phone, MessageSquare, Trash2, Plus, Briefcase, User, Mail as MailIcon, Check, Clock, ArrowLeft, Edit2, Calendar, FileText, Loader2 } from 'lucide-react';
import AddLeadTaskDrawer from '../../../components/AddLeadTaskDrawer';
import AddLeadDrawer from '../../../shared/components/drawers/AddLeadDrawer';
import AddDealDrawer from '../../../shared/components/drawers/AddDealDrawer';
import WhatsappTemplatePickerOverlay from '../../../shared/components/WhatsappTemplatePickerOverlay';
import { useActiveWhatsappTemplates } from '../../../shared/hooks/useActiveWhatsappTemplates';
import { buildWhatsappUrl, substituteTemplateVariables } from '../../../shared/utils/whatsappMessage.util';
import type { WhatsappTemplateItem } from '../../account-settings/whatsapp-template/types/whatsapp-template.types';
import { useLeadActivities } from '../hooks/useLeadActivities';
import Toast from '../../../shared/components/Toast';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { useLeadRemarks } from '../hooks/useLeadRemarks';
import { useLeadTasks } from '../hooks/useLeadTasks';
import ActivityTimelineCard from '../../daily-activity/components/ActivityTimelineCard';
import { ActivityMapper } from '../../daily-activity/mappers/activity.mapper';
import { useLeadTaskDropdowns } from '../hooks/useLeadTaskDropdowns';
import { useLeadFormOptions } from '../hooks/useLeadFormOptions';
import { useLeadDeals } from '../hooks/useLeadDeals';
import { leadDataService } from '../services/leadDataService';
import { formatDateTime, formatRelativeDate, formatFollowUpDate } from '../../../shared/utils/dateUtils';
import { badgeClass } from '../../../shared/utils/badgeUtils';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
import EditableDetailField from '../../../shared/components/drawers/EditableDetailField';
import type { EditableDetailFieldOption } from '../../../shared/components/drawers/EditableDetailField';
import type { DealFormData } from '../../../shared/types/drawers';
import type { LeadDetailDrawerProps } from '../../../shared/types/drawers';
import type { DealItem } from '../../deal/types';
import type { Lead, Remark, LeadTaskItem, UpdateLeadPayload } from '../types';
import type { LabelValuePair } from '../../../shared/types/common';

export interface LeadDetailContentProps {
  lead: NonNullable<LeadDetailDrawerProps['lead']>;
  onClose: () => void;
  onLeadUpdated: () => void;
  onDeleteLead?: ((lead: Lead) => void) | undefined;
}

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
const LeadDetailContent = ({ lead, onClose, onLeadUpdated, onDeleteLead }: LeadDetailContentProps) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'note' | 'task' | 'deal'>('activity');
  const [showTaskDrawer, setShowTaskDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [newRemarkText, setNewRemarkText] = useState('');
  const [showDeleteRemarkModal, setShowDeleteRemarkModal] = useState(false);
  const [remarkToDelete, setRemarkToDelete] = useState<Remark | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);
  const [editTask, setEditTask] = useState<LeadTaskItem | null>(null);
  const [deleteTaskTarget, setDeleteTaskTarget] = useState<LeadTaskItem | null>(null);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);
  const [showAddDealDrawer, setShowAddDealDrawer] = useState(false);
  const [showWhatsappTemplatePicker, setShowWhatsappTemplatePicker] = useState(false);
  const { hasTemplates: hasWhatsappTemplates, isLoading: whatsappTemplatesLoading, hasError: whatsappTemplatesError } = useActiveWhatsappTemplates();

  const { activities: apiActivities, isLoading: activitiesLoading, error: activitiesError } = useLeadActivities(lead.id, true);
  const {
    remarks,
    isLoading: isLoadingRemarks,
    error: errorRemarks,
    isAdding: isAddingRemark,
    isDeleting: isDeletingRemark,
    addRemark,
    deleteRemark,
    hasMore,
    loadMore,
  } = useLeadRemarks(lead.id, true, activeTab);

  const {
    tasks,
    isLoading: isLoadingTasks,
    error: tasksError,
    addTask,
    updateTask,
    deleteTask,
  } = useLeadTasks(lead.id, true, activeTab);

  const {
    categoryOptions,
    staffOptions,
    isLoadingCategories,
    isLoadingStaff,
    categoriesError,
    staffError,
  } = useLeadTaskDropdowns(showTaskDrawer);

  const {
    staffOptions: agentOptions,
    purposeOptions,
    typeOptions,
    statusOptions,
    sourceOptions,
    additionalFieldDefs,
  } = useLeadFormOptions(true);

  const {
    deals: leadDeals,
    isLoading: dealsLoading,
    error: dealsError,
    isAdding: isAddingDeal,
    addDeal,
  } = useLeadDeals(lead.leadId, true);

  const toSelectOptions = (options: LabelValuePair[]): EditableDetailFieldOption[] =>
    options.map((o) => ({ value: o.value, label: o.label }));

  const findOptionValueByLabel = (options: LabelValuePair[], label: string | undefined): string => {
    if (!label) return '';
    return options.find((o) => o.label === label)?.value ?? '';
  };

  const showToastMessage = (title: string, type: 'success' | 'error') => {
    setToastMessage(title);
    setToastType(type);
    setShowToast(true);
  };

  const saveLeadField = async (payload: UpdateLeadPayload): Promise<boolean> => {
    if (!lead.leadId) return false;
    try {
      const res = await leadDataService.updateLead(lead.leadId, payload);
      if (res.status) {
        showToastMessage(SUCCESS_MESSAGES.LEAD_UPDATED, 'success');
        onLeadUpdated?.();
        return true;
      }
      showToastMessage(res.message || ERROR_MESSAGES.UPDATE_LEAD, 'error');
      return false;
    } catch {
      showToastMessage(ERROR_MESSAGES.UPDATE_LEAD, 'error');
      return false;
    }
  };

  const handleDealSave = async (formData: DealFormData) => {
    const success = await addDeal(formData);
    if (success) {
      showToastMessage(SUCCESS_MESSAGES.DEAL_CREATED, 'success');
      setShowAddDealDrawer(false);
    } else {
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
    if (!lead.phone) return;
    // Fail-open: if templates haven't loaded, failed to load, or the company
    // has none active, fall back to today's plain "open WhatsApp" behavior
    // instead of showing an empty/broken picker.
    if (whatsappTemplatesError || (!whatsappTemplatesLoading && !hasWhatsappTemplates)) {
      window.open(buildWhatsappUrl(lead.phone), '_blank');
      return;
    }
    setShowWhatsappTemplatePicker(true);
  };

  const handleSelectWhatsappTemplate = (template: WhatsappTemplateItem) => {
    if (!lead.phone) return;
    const message = substituteTemplateVariables(template.message || template.content || '', {
      name: lead.name,
    });
    window.open(buildWhatsappUrl(lead.phone, message), '_blank');
  };

  const handleSendWhatsappWithoutTemplate = () => {
    if (!lead.phone) return;
    window.open(buildWhatsappUrl(lead.phone), '_blank');
  };

  const handleAddTask = async (formData: any) => {
    const success = await addTask(formData);
    if (success) {
      showToastMessage(SUCCESS_MESSAGES.TASK_CREATED, 'success');
    } else {
      showToastMessage(ERROR_MESSAGES.ADD_TASK, 'error');
    }
    return success;
  };

  const handleEditTask = async (formData: any) => {
    if (!editTask) return false;
    const success = await updateTask(editTask.id, formData);
    if (success) {
      setEditTask(null);
      showToastMessage(SUCCESS_MESSAGES.TASK_UPDATED, 'success');
    } else {
      showToastMessage(ERROR_MESSAGES.UPDATE_TASK, 'error');
    }
    return success;
  };

  const handleDeleteTaskClick = (task: LeadTaskItem) => {
    setDeleteTaskTarget(task);
    setShowDeleteTaskModal(true);
  };

  const handleDeleteTaskConfirm = async () => {
    if (!deleteTaskTarget || isDeletingTask) return;
    setIsDeletingTask(true);
    try {
      const success = await deleteTask(deleteTaskTarget.id);
      if (success) {
        showToastMessage(SUCCESS_MESSAGES.TASK_DELETED, 'success');
      } else {
        showToastMessage(ERROR_MESSAGES.DELETE_TASK, 'error');
      }
    } catch {
      showToastMessage(ERROR_MESSAGES.DELETE_TASK, 'error');
    } finally {
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

  const getPriorityClass = (priority: string) => (priority || '').toLowerCase();
  const getStatusClass = (status: string) => {
    const s = (status || '').toLowerCase();
    return s === 'in progress' ? 'in-progress' : s;
  };

  const handleAddRemark = async () => {
    const trimmed = newRemarkText.trim();
    if (!trimmed) return;
    try {
      await addRemark(trimmed);
      setNewRemarkText('');
      showToastMessage(SUCCESS_MESSAGES.REMARK_ADDED, 'success');
      onLeadUpdated?.();
    } catch {
      showToastMessage(ERROR_MESSAGES.ADD_REMARK, 'error');
    }
  };

  const handleDeleteClick = (remark: Remark) => {
    setRemarkToDelete(remark);
    setShowDeleteRemarkModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!remarkToDelete) return;
    try {
      await deleteRemark(remarkToDelete.id);
      setShowDeleteRemarkModal(false);
      setRemarkToDelete(null);
      showToastMessage(SUCCESS_MESSAGES.REMARK_DELETED, 'success');
    } catch {
      showToastMessage(ERROR_MESSAGES.DELETE_REMARK, 'error');
    }
  };

  return (
    <>
      <div className="leaddrawer-two-col">
        <div className="leaddrawer-left">
          <div className="leaddrawer-left-header">
            <div className="leaddrawer-left-header-left">
              <button className="leaddrawer-back-btn" onClick={onClose}>
                <ArrowLeft size={18} /> Back
              </button>
            </div>
            <button className="leaddrawer-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div className="leaddrawer-main">
            <div className="leaddrawer-profile">
              <div className="leaddrawer-avatar">
                {lead.name?.charAt(0) || 'L'}
              </div>
              <h2 className="leaddrawer-name">{lead.name}</h2>
              <div className="leaddrawer-badges">
                <span className={`leaddrawer-badge ${lead.type ? badgeClass(lead.type) : ''}`}>{lead.type}</span>
                <span className={`leaddrawer-badge ${lead.status ? badgeClass(lead.status) : ''}`}>{lead.status}</span>
              </div>
            </div>

            <div className="leaddrawer-actions">
              <button className="leaddrawer-action-btn" title="Edit" onClick={() => setShowEditDrawer(true)}><Edit2 size={16} /></button>
              <button className="leaddrawer-action-btn" title="WhatsApp" onClick={handleWhatsAppClick} disabled={!lead.phone} style={!lead.phone ? { opacity: 0.5, cursor: 'not-allowed' } : {}}><MessageSquare size={16} /></button>
              {showWhatsappTemplatePicker && (
                <WhatsappTemplatePickerOverlay
                  onClose={() => setShowWhatsappTemplatePicker(false)}
                  onSelectTemplate={handleSelectWhatsappTemplate}
                  onSendWithoutTemplate={handleSendWhatsappWithoutTemplate}
                />
              )}
              <button className="leaddrawer-action-btn" title="Phone" onClick={handlePhoneClick} disabled={!lead.phone} style={!lead.phone ? { opacity: 0.5, cursor: 'not-allowed' } : {}}><Phone size={16} /></button>
              <button className="leaddrawer-action-btn delete" title="Delete" onClick={() => onDeleteLead?.(lead as Lead)}><Trash2 size={16} /></button>
            </div>

            <div className="leaddrawer-section">
              <div className="leaddrawer-section-title">Basic Info</div>
              <div className="leaddrawer-info-grid">
                <div className="leaddrawer-info-item">
                  <div className="leaddrawer-info-icon"><User size={14} /></div>
                  <div className="leaddrawer-info-content">
                    <span className="leaddrawer-info-label">Created By</span>
                    <span className="leaddrawer-info-value">{lead.createdByName || '-'}</span>
                  </div>
                </div>
                <div className="leaddrawer-info-item">
                  <div className="leaddrawer-info-icon"><Calendar size={14} /></div>
                  <div className="leaddrawer-info-content">
                    <span className="leaddrawer-info-label">Created At</span>
                    <span className="leaddrawer-info-value">{formatRelativeDate(lead.createdAt)}</span>
                  </div>
                </div>
                <div className="leaddrawer-info-item">
                  <div className="leaddrawer-info-icon"><Calendar size={14} /></div>
                  <div className="leaddrawer-info-content">
                    <span className="leaddrawer-info-label">Updated At</span>
                    <span className="leaddrawer-info-value">{formatRelativeDate(lead.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="leaddrawer-section">
              <div className="leaddrawer-section-title">Contact</div>
              <div className="leaddrawer-info-grid">
                <div className="leaddrawer-info-item">
                  <div className="leaddrawer-info-icon"><Phone size={14} /></div>
                  <div className="leaddrawer-info-content">
                    <span className="leaddrawer-info-label">Phone</span>
                    <span className="leaddrawer-info-value">{lead.phone || '-'}</span>
                  </div>
                </div>
                <div className="leaddrawer-info-item">
                  <div className="leaddrawer-info-icon"><MailIcon size={14} /></div>
                  <div className="leaddrawer-info-content">
                    <span className="leaddrawer-info-label">Email</span>
                    <span className="leaddrawer-info-value">{lead.email || '-'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="leaddrawer-section">
              <div className="leaddrawer-section-title">More Info</div>
              <div className="leaddrawer-details-grid">
                <EditableDetailField
                  label="Source"
                  displayValue={lead.source || ''}
                  editValue={findOptionValueByLabel(sourceOptions, lead.source)}
                  type="select"
                  options={toSelectOptions(sourceOptions)}
                  onSave={(v) => saveLeadField({ sourceId: v as string })}
                />
                <EditableDetailField
                  label="Purpose"
                  displayValue={lead.purpose || ''}
                  editValue={findOptionValueByLabel(purposeOptions, lead.purpose)}
                  type="select"
                  options={toSelectOptions(purposeOptions)}
                  onSave={(v) => saveLeadField({ purposeId: v as string })}
                />
                <EditableDetailField
                  label="Status"
                  displayValue={lead.status || ''}
                  editValue={findOptionValueByLabel(statusOptions, lead.status)}
                  type="select"
                  options={toSelectOptions(statusOptions)}
                  onSave={(v) => saveLeadField({ statusId: v as string })}
                />
                <EditableDetailField
                  label="Assigned To"
                  displayValue={lead.assignedTo || ''}
                  editValue={findOptionValueByLabel(agentOptions, lead.assignedTo)}
                  type="select"
                  options={toSelectOptions(agentOptions)}
                  onSave={(v) => saveLeadField({ agentId: v as string })}
                />
                <EditableDetailField
                  label="Type"
                  displayValue={lead.type || ''}
                  editValue={findOptionValueByLabel(typeOptions, lead.type)}
                  type="select"
                  options={toSelectOptions(typeOptions)}
                  onSave={(v) => saveLeadField({ typeId: v as string })}
                />
                <EditableDetailField
                  label="Follow Up"
                  displayValue={formatFollowUpDate(lead.nextFollowUp)}
                  editValue={lead.nextFollowUp ? lead.nextFollowUp.slice(0, 10) : ''}
                  type="date"
                  onSave={(v) => saveLeadField({ nextFollowUp: v as string })}
                />
                <EditableDetailField
                  label="Location"
                  displayValue={lead.location || ''}
                  editValue={lead.location || ''}
                  type="text"
                  fullWidth
                  onSave={(v) => saveLeadField({ location: v as string })}
                />

                {(lead.additionalFields || []).map((af: { fieldId: string; name: string; value: string }) => {
                  const def = additionalFieldDefs.find((d) => d.name === af.name);
                  const fieldType = (def?.fieldType || 'text').toLowerCase();
                  const isCheckbox = fieldType === 'checkbox';
                  const options: EditableDetailFieldOption[] = (def?.values || []).map((v) => ({ value: v, label: v }));
                  const editValue: string | string[] = isCheckbox
                    ? (af.value ? af.value.split(',').map((v) => v.trim()) : [])
                    : (af.value || '');
                  const inputType: 'text' | 'date' | 'select' | 'checkbox' =
                    fieldType === 'dropdown' ? 'select' : (fieldType === 'date' || fieldType === 'datetime') ? 'date' : isCheckbox ? 'checkbox' : 'text';

                  return (
                    <EditableDetailField
                      key={af.fieldId}
                      label={af.name}
                      displayValue={af.value != null ? af.value : ''}
                      editValue={editValue}
                      type={inputType}
                      options={options}
                      onSave={(v) => {
                        const nextValue = Array.isArray(v) ? v.join(',') : v;
                        const nextFields = (lead.additionalFields || []).map((f) =>
                          f.fieldId === af.fieldId ? { fieldId: f.fieldId, value: nextValue } : { fieldId: f.fieldId, value: f.value }
                        );
                        return saveLeadField({ additionalFields: nextFields });
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="leaddrawer-right">
          <div className="leaddrawer-tabs">
            <button className={`leaddrawer-tab ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>
              <Clock size={14} /> Activity
            </button>
            <button className={`leaddrawer-tab ${activeTab === 'note' ? 'active' : ''}`} onClick={() => setActiveTab('note')}>
              <FileText size={14} /> Log Note
            </button>
            <button className={`leaddrawer-tab ${activeTab === 'task' ? 'active' : ''}`} onClick={() => setActiveTab('task')}>
              <Check size={14} /> Task
            </button>
            <button className={`leaddrawer-tab ${activeTab === 'deal' ? 'active' : ''}`} onClick={() => setActiveTab('deal')}>
              <Briefcase size={14} /> Deal
            </button>
          </div>

          <div className="leaddrawer-tab-content">
            {activeTab === 'activity' && (
              <div>
                <div className="leaddrawer-tab-header">
                  <h3 className="leaddrawer-tab-heading">Latest Activity</h3>
                </div>
                {activitiesLoading ? (
                  <div className="leaddrawer-activity-list">
                    <div className="leaddrawer-loading">Loading activities...</div>
                  </div>
                ) : activitiesError ? (
                  <div className="leaddrawer-activity-list">
                    <div className="leaddrawer-error">{activitiesError}</div>
                  </div>
                ) : apiActivities.length === 0 ? (
                  <div className="leaddrawer-activity-list">
                    <div className="leaddrawer-empty">No activities found.</div>
                  </div>
                ) : (
                  <div className="leaddrawer-activity-list">
                    {apiActivities.map((item: any) => {
                      const activity = ActivityMapper.toEntity(item);
                      return <ActivityTimelineCard key={item.id} activity={activity} />;
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'note' && (
              <div>
                <div className="leaddrawer-tab-header">
                  <h3 className="leaddrawer-tab-heading">Notes Timeline</h3>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <textarea
                    id="note-input"
                    placeholder="Write a note..."
                    value={newRemarkText}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewRemarkText(e.target.value)}
                    style={{
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
                    }}
                    disabled={isAddingRemark}
                  />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleAddRemark}
                    disabled={isAddingRemark || !newRemarkText.trim()}
                    style={{ marginTop: '0.5rem' }}
                  >
                    {isAddingRemark ? <><Loader2 size={14} className="spin" /> Adding...</> : 'Save Note'}
                  </button>
                </div>
                {isLoadingRemarks ? (
                  <div className="leaddrawer-loading">Loading remarks...</div>
                ) : errorRemarks ? (
                  <div className="leaddrawer-error">{errorRemarks}</div>
                ) : remarks.length === 0 ? (
                  <div className="leaddrawer-empty-state">
                    <div className="leaddrawer-empty-icon"><FileText size={24} /></div>
                    <h4 className="leaddrawer-empty-title">No remarks yet</h4>
                    <p className="leaddrawer-empty-text">Add a note to start tracking updates.</p>
                  </div>
                ) : (
                  <div>
                    {remarks.map((remark: Remark) => (
                      <div key={remark.id} className="leaddrawer-note-card">
                        <div className="leaddrawer-note-avatar">
                          {(remark.agentName || '?').charAt(0).toUpperCase()}
                        </div>
                        <div className="leaddrawer-note-content">
                          <div className="leaddrawer-note-header">
                            <span className="leaddrawer-note-user">{remark.agentName}</span>
                            <span className="leaddrawer-note-time">{formatDateTime(remark.createdAt)}</span>
                          </div>
                          <p className="leaddrawer-note-text">{remark.remarkNote}</p>
                          <div className="leaddrawer-note-actions">
                            <button className="leaddrawer-note-action" onClick={() => handleDeleteClick(remark)}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {hasMore && (
                      <div className="leaddrawer-load-more" style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <button className="btn btn-secondary btn-sm" onClick={loadMore} disabled={isLoadingRemarks}>
                          {isLoadingRemarks ? <><Loader2 size={14} className="spin" /> Loading...</> : 'Load More'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <AdminDeleteModal
                  isOpen={showDeleteRemarkModal}
                  itemName="this remark"
                  onConfirm={handleDeleteConfirm}
                  onClose={() => { setShowDeleteRemarkModal(false); setRemarkToDelete(null); }}
                  isDeleting={isDeletingRemark}
                />
                <Toast message={toastMessage} type={toastType} isVisible={showToast} onClose={() => setShowToast(false)} />
              </div>
            )}

            {activeTab === 'task' && (
              <div>
                <div className="leaddrawer-tab-header">
                  <h3 className="leaddrawer-tab-heading">Tasks</h3>
                  <button className="btn btn-primary btn-sm" onClick={() => { setEditTask(null); setShowTaskDrawer(true); }}>
                    <Plus size={14} /> Add Task
                  </button>
                </div>
                {isLoadingTasks ? (
                  <div className="leaddrawer-loading">Loading tasks...</div>
                ) : tasksError ? (
                  <div className="leaddrawer-error">{tasksError}</div>
                ) : tasks.length === 0 ? (
                  <div className="leaddrawer-empty-state">
                    <div className="leaddrawer-empty-icon"><Check size={24} /></div>
                    <h4 className="leaddrawer-empty-title">No tasks yet</h4>
                    <p className="leaddrawer-empty-text">Add a task to keep track of work.</p>
                  </div>
                ) : (
                  <div>
                    {tasks.map((task: LeadTaskItem) => (
                      <div key={task.id} className="leaddrawer-task-card">
                        <div className="leaddrawer-task-info">
                          <div className="leaddrawer-task-title">{task.title}</div>
                          <div className="leaddrawer-task-meta">
                            {task.scheduledDate && <span>{(task.scheduledTime ? `${task.scheduledDate} ${task.scheduledTime}` : task.scheduledDate)}</span>}
                            <span>{task.assignedTo || '-'}</span>
                          </div>
                          {task.description && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{task.description}</p>}
                        </div>
                        <div className="leaddrawer-task-badges">
                          {task.priority && <span className={`leaddrawer-task-badge ${getPriorityClass(task.priority)}`}>{task.priority}</span>}
                          {task.status && <span className={`leaddrawer-task-badge ${getStatusClass(task.status)}`}>{task.status}</span>}
                        </div>
                        <div className="leaddrawer-task-actions">
                          <button className="leaddrawer-note-action" onClick={() => { setEditTask(task); setShowTaskDrawer(true); }}>
                            <Edit2 size={14} />
                          </button>
                          <button className="leaddrawer-note-action" onClick={() => handleDeleteTaskClick(task)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'deal' && (
              <div>
                <div className="leaddrawer-tab-header">
                  <h3 className="leaddrawer-tab-heading">Deals</h3>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowAddDealDrawer(true)}>
                    <Plus size={14} /> Add Deal
                  </button>
                </div>
                {dealsLoading ? (
                  <div className="leaddrawer-loading">Loading deals...</div>
                ) : dealsError ? (
                  <div className="leaddrawer-error">{dealsError}</div>
                ) : leadDeals.length === 0 ? (
                  <div className="leaddrawer-empty-state">
                    <div className="leaddrawer-empty-icon"><Briefcase size={24} /></div>
                    <h4 className="leaddrawer-empty-title">No deals yet</h4>
                    <p className="leaddrawer-empty-text">No deals linked to this lead.</p>
                  </div>
                ) : (
                  <div>
                    {leadDeals.map((deal: DealItem) => (
                      <div key={deal.id} className="leaddrawer-deal-card">
                        <div className="leaddrawer-deal-header">
                          <div>
                            <div className="leaddrawer-deal-title">{deal.dealName || deal.title || `Deal #${deal.id}`}</div>
                            <div className="leaddrawer-task-meta">
                              {deal.endDate && <span>Expected: {deal.endDate}</span>}
                              <span>Owner: {deal.agent || deal.assignedTo || '-'}</span>
                            </div>
                          </div>
                          {deal.amount != null && <span className="leaddrawer-deal-amount">₹{Number(deal.amount).toLocaleString()}</span>}
                        </div>
                        <span className={`leaddrawer-deal-stage ${badgeClass(deal.stage || deal.status || '')}`}>{deal.stage || deal.status || '-'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <AddLeadTaskDrawer
        isOpen={showTaskDrawer}
        onClose={() => { setShowTaskDrawer(false); setEditTask(null); }}
        onSubmit={editTask ? handleEditTask : handleAddTask}
        task={editTask}
        isLoading={isLoadingTasks}
        error={tasksError}
        categoryOptions={categoryOptions}
        staffOptions={staffOptions}
        isLoadingCategories={isLoadingCategories}
        isLoadingStaff={isLoadingStaff}
        categoriesError={categoriesError}
        staffError={staffError}
      />
      <AddLeadDrawer
        isOpen={showEditDrawer}
        onClose={() => setShowEditDrawer(false)}
        onSaved={handleEditLeadSaved}
        lead={lead as Lead}
      />
      <AdminDeleteModal
        isOpen={showDeleteTaskModal}
        itemName={deleteTaskTarget?.title || 'this task'}
        onConfirm={handleDeleteTaskConfirm}
        onClose={() => { setShowDeleteTaskModal(false); setDeleteTaskTarget(null); }}
        isDeleting={isDeletingTask}
      />
      <AddDealDrawer
        isOpen={showAddDealDrawer}
        onClose={() => setShowAddDealDrawer(false)}
        deal={{ lead: lead?.name, leadId: lead?.leadId ?? '' } as DealFormData}
        onSave={handleDealSave}
      />
    </>
  );
};

export default LeadDetailContent;
