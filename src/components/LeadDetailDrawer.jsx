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
import { useAuth } from '../features/auth/hooks/useAuth';
import { formatDateTime, formatRelativeDate, formatFollowUpDate } from '../shared/utils/dateUtils';

const LeadDetailDrawer = ({ lead, isOpen, onClose, onLeadUpdated, onFieldSaved }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('activity');
  const [showTaskDrawer, setShowTaskDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newRemarkText, setNewRemarkText] = useState('');
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
    } else if (isVisible) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 350);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  const { activities: apiActivities, isLoading: activitiesLoading, error: activitiesError } = useLeadActivities(lead?.id, isOpen);
  const {
    remarks,
    isLoading: isLoadingRemarks,
    error: errorRemarks,
    isAdding: isAddingRemark,
    isDeleting: isDeletingRemark,
    addRemark,
    deleteRemark,
  } = useLeadRemarks(lead?.id, isOpen, activeTab);

  const {
    tasks,
    isLoading: isLoadingTasks,
    error: tasksError,
    addTask,
    updateTask,
    deleteTask,
  } = useLeadTasks(lead?.id, isOpen, activeTab);

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
  } = useLeadFormOptions(isOpen);

  if (!isVisible || !lead) return null;

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const toSelectOptions = (options) => options.map((o) => ({ value: o.value, label: o.label }));

  const findOptionValueByLabel = (options, label) => {
    if (!label) return '';
    return options.find((o) => o.label === label)?.value ?? '';
  };

  const saveLeadField = async (payload) => {
    if (!lead?.leadId) return false;
    try {
      const res = await leadDataService.updateLead(lead.leadId, payload);
      if (res.status) {
        showToastMessage(SUCCESS_MESSAGES.LEAD_UPDATED, 'success');
        onFieldSaved?.(payload);
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

  const handleAddTask = async (formData) => {
    const success = await addTask(formData);
    if (success) {
      showToastMessage('Task created successfully', 'success');
    } else {
      showToastMessage('Failed to create task', 'error');
    }
    return success;
  };

  const handleEditTask = async (formData) => {
    if (!editTask) return false;
    const success = await updateTask(editTask.id, formData);
    if (success) {
      setEditTask(null);
      showToastMessage('Task updated successfully', 'success');
    } else {
      showToastMessage('Failed to update task', 'error');
    }
    return success;
  };

  const handleDeleteTaskClick = (task) => {
    setDeleteTaskTarget(task);
    setShowDeleteTaskModal(true);
  };

  const handleDeleteTaskConfirm = async () => {
    if (!deleteTaskTarget || isDeletingTask) return;
    setIsDeletingTask(true);
    try {
      const success = await deleteTask(deleteTaskTarget.id);
      if (success) {
        showToastMessage('Task deleted successfully', 'success');
      } else {
        showToastMessage('Failed to delete task', 'error');
      }
    } catch {
      showToastMessage('Failed to delete task', 'error');
    } finally {
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
    if (!trimmed) return;
    try {
      await addRemark(trimmed);
      setNewRemarkText('');
      showToastMessage('Remark added successfully.', 'success');
    } catch {
      showToastMessage('Failed to add remark.', 'error');
    }
  };

  const handleDeleteClick = (remark) => {
    setRemarkToDelete(remark);
    setShowDeleteRemarkModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!remarkToDelete) return;
    try {
      await deleteRemark(remarkToDelete.remarkId);
      setShowDeleteRemarkModal(false);
      setRemarkToDelete(null);
      showToastMessage('Remark deleted successfully.', 'success');
    } catch {
      showToastMessage('Failed to delete remark.', 'error');
    }
  };

  const getTypeBadgeClass = (type) => {
    if (!type) return '';
    return type.toLowerCase().replace(' ', '-');
  };

  return (
    <div className={`leaddrawer-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}>
      <div className={`leaddrawer-panel ${isAnimating ? 'animating' : ''}`} onClick={(e) => e.stopPropagation()}>
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
                  <span className={`leaddrawer-badge ${getTypeBadgeClass(lead.type?.type)}`}>{lead.type?.type}</span>
                  <span className={`leaddrawer-badge ${lead.status?.status?.toLowerCase()}`}>{lead.status?.status}</span>
                </div>
              </div>

              <div className="leaddrawer-actions">
                <button className="leaddrawer-action-btn" title="Edit" onClick={() => setShowEditDrawer(true)}><Edit2 size={16} /></button>
                <button className="leaddrawer-action-btn" title="WhatsApp"><MessageSquare size={16} /></button>
                <button className="leaddrawer-action-btn" title="SMS"><Phone size={16} /></button>
                <button className="leaddrawer-action-btn delete" title="Delete" onClick={() => setShowDeleteConfirm(true)}><Trash2 size={16} /></button>
              </div>

              <div className="leaddrawer-section">
                <div className="leaddrawer-section-title">Basic Info</div>
                <div className="leaddrawer-info-grid">
                  <div className="leaddrawer-info-item">
                    <div className="leaddrawer-info-icon"><User size={14} /></div>
                    <div className="leaddrawer-info-content">
                      <span className="leaddrawer-info-label">Created By</span>
                      <span className="leaddrawer-info-value">{lead.assignedTo || '-'}</span>
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
                    onSave={(v) => saveLeadField({ sourceId: v })}
                  />
                  <EditableDetailField
                    label="Purpose"
                    displayValue={lead.purpose || ''}
                    editValue={findOptionValueByLabel(purposeOptions, lead.purpose)}
                    type="select"
                    options={toSelectOptions(purposeOptions)}
                    onSave={(v) => saveLeadField({ purposeId: v })}
                  />
                  <EditableDetailField
                    label="Status"
                    displayValue={lead.status || ''}
                    editValue={findOptionValueByLabel(statusOptions, lead.status)}
                    type="select"
                    options={toSelectOptions(statusOptions)}
                    onSave={(v) => saveLeadField({ statusId: v })}
                  />
                  <EditableDetailField
                    label="Assigned To"
                    displayValue={lead.assignedTo || ''}
                    editValue={findOptionValueByLabel(agentOptions, lead.assignedTo)}
                    type="select"
                    options={toSelectOptions(agentOptions)}
                    onSave={(v) => saveLeadField({ agentId: v })}
                  />
                  <EditableDetailField
                    label="Type"
                    displayValue={lead.type || ''}
                    editValue={findOptionValueByLabel(typeOptions, lead.type)}
                    type="select"
                    options={toSelectOptions(typeOptions)}
                    onSave={(v) => saveLeadField({ typeId: v })}
                  />
                  <EditableDetailField
                    label="Follow Up"
                    displayValue={formatFollowUpDate(lead.nextFollowUp)}
                    editValue={lead.nextFollowUp ? lead.nextFollowUp.slice(0, 10) : ''}
                    type="date"
                    onSave={(v) => saveLeadField({ nextFollowUp: v })}
                  />
                  <EditableDetailField
                    label="Location"
                    displayValue={lead.location || ''}
                    editValue={lead.location || ''}
                    type="text"
                    fullWidth
                    onSave={(v) => saveLeadField({ location: v })}
                  />

                  {(lead.additionalFields || []).map((af) => {
                    const def = additionalFieldDefs.find((d) => d.name === af.name);
                    const fieldType = (def?.fieldType || 'text').toLowerCase();
                    const isCheckbox = fieldType === 'checkbox';
                    const options = (def?.values || []).map((v) => ({ value: v, label: v }));
                    const editValue = isCheckbox
                      ? (af.value ? af.value.split(',').map((v) => v.trim()) : [])
                      : (af.value || '');
                    const inputType =
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
              <button className={`leaddrawer-tab ${activeTab === 'email' ? 'active' : ''}`} onClick={() => setActiveTab('email')}>
                <Mail size={14} /> Email
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
                      {apiActivities.map((item) => (
                        <div className="leaddrawer-activity-card" key={item.id}>
                          <div className="leaddrawer-activity-avatar">
                            {(item.actorName || '?').charAt(0).toUpperCase()}
                          </div>
                          <div className="leaddrawer-activity-content">
                            <div className="leaddrawer-activity-header">
                              <span className="leaddrawer-activity-user">{item.actorName}</span>
                            </div>
                            <span className="leaddrawer-activity-time">{formatDateTime(item.createdAt)}</span>
                            <p className="leaddrawer-activity-desc">{item.description}</p>
                          </div>
                        </div>
                      ))}
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
                      onChange={(e) => setNewRemarkText(e.target.value)}
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
                      {remarks.map((remark) => (
                        <div key={remark.remarkId} className="leaddrawer-note-card">
                          <div className="leaddrawer-note-avatar">
                            {(remark.agentName || '?').charAt(0).toUpperCase()}
                          </div>
                          <div className="leaddrawer-note-content">
                            <div className="leaddrawer-note-header">
                              <span className="leaddrawer-note-user">{remark.agentName}</span>
                              <span className="leaddrawer-note-time">{formatDateTime(remark.createdAt)}</span>
                            </div>
                            <p className="leaddrawer-note-text">{remark.remarkNote}</p>
                            {((!!remark.agentId && !!user?.staffId && String(remark.agentId) === String(user.staffId)) || user?.isAdmin) && (
                              <div className="leaddrawer-note-actions">
                                <button className="leaddrawer-note-action" onClick={() => handleDeleteClick(remark)}>
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
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
                      {tasks.map(task => (
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

              {activeTab === 'email' && (
                <div>
                  <div className="leaddrawer-tab-header">
                    <h3 className="leaddrawer-tab-heading">Compose Email</h3>
                    <button className="btn btn-primary btn-sm">
                      <Send size={14} /> Send
                    </button>
                  </div>
                  <div className="leaddrawer-email-compose">
                    <div className="leaddrawer-form-group">
                      <input type="email" placeholder="To" defaultValue={lead.email || ''} />
                    </div>
                    <div className="leaddrawer-form-group">
                      <input type="text" placeholder="Subject" />
                    </div>
                    <div className="leaddrawer-form-group">
                      <textarea placeholder="Write your message..." />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 9999,
        }} onClick={() => setShowDeleteConfirm(false)}>
          <div style={{
            background: 'white', borderRadius: '12px', width: '100%',
            maxWidth: '420px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #e5e7eb',
            }}>
              <h5 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Confirm Delete</h5>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }} onClick={() => setShowDeleteConfirm(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{
                width: '60px', height: '60px', background: '#fef2f2',
                borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 1.25rem', color: '#dc2626',
              }}>
                <AlertTriangle size={40} />
              </div>
              <p style={{ fontSize: '14px', color: '#1a1b1d', marginBottom: '0.5rem' }}>
                Are you sure you want to delete <strong style={{ color: '#dc2626' }}>{lead?.name}</strong>?<br />
                This action cannot be undone.
              </p>
            </div>
            <div style={{
              display: 'flex', gap: '1rem', padding: '1rem 1.5rem',
              borderTop: '1px solid #e5e7eb', justifyContent: 'center',
            }}>
              <button style={{
                padding: '0.625rem 1.25rem', borderRadius: '6px', fontSize: '14px',
                fontWeight: 500, cursor: 'pointer', background: '#dc2626',
                color: 'white', border: 'none',
              }} onClick={() => { setShowDeleteConfirm(false); onClose(); }}>
                Delete Lead
              </button>
              <button style={{
                padding: '0.625rem 1.25rem', borderRadius: '6px', fontSize: '14px',
                fontWeight: 500, cursor: 'pointer', background: '#f3f4f6',
                color: '#374151', border: 'none',
              }} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
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
        lead={lead}
      />
      <AdminDeleteModal
        isOpen={showDeleteTaskModal}
        itemName={deleteTaskTarget?.title || 'this task'}
        onConfirm={handleDeleteTaskConfirm}
        onClose={() => { setShowDeleteTaskModal(false); setDeleteTaskTarget(null); }}
        isDeleting={isDeletingTask}
      />
    </div>
  );
};

export default LeadDetailDrawer;
