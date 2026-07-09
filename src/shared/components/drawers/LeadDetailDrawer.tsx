import React, { useState, useEffect, useCallback } from 'react';
import { X, Phone, MessageSquare, Trash2, Plus, Briefcase, User, Mail as MailIcon, Check, Clock, ArrowLeft, Edit2, Calendar, FileText, Loader2 } from 'lucide-react';
import './LeadDetailDrawer.css';
import AddLeadTaskDrawer from '../../../components/AddLeadTaskDrawer';
import AddLeadDrawer from './AddLeadDrawer';
import AddDealDrawer from './AddDealDrawer';
import { useLeadActivities } from '../../../features/enquiries/hooks/useLeadActivities';
import Toast from '../Toast';
import AdminDeleteModal from '../crud/AdminDeleteModal';
import { useLeadRemarks } from '../../../features/enquiries/hooks/useLeadRemarks';
import { useLeadTasks } from '../../../features/enquiries/hooks/useLeadTasks';
import { useLeadTaskDropdowns } from '../../../features/enquiries/hooks/useLeadTaskDropdowns';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { dealService } from '../../../features/deal/services/deal.service';
import { formatDateTime, formatRelativeDate, formatFollowUpDate } from '../../utils/dateUtils';
import type { LeadDetailDrawerProps, DealFormData, ActivityLogItem } from '../../types/drawers';
import type { Remark } from '../../../features/enquiries/types/remark.types';
import type { LeadTaskItem } from '../../../features/enquiries/types/task.types';
import type { DealItem } from '../../../features/deal/types';
import type { Lead } from '../../../features/enquiries/types';

const LeadDetailDrawer = ({ lead, isOpen, onClose, onLeadUpdated = () => {}, onDeleteLead }: LeadDetailDrawerProps) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'activity' | 'note' | 'task' | 'deal'>('activity');
  const [showTaskDrawer, setShowTaskDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [newRemarkText, setNewRemarkText] = useState('');
  const [editingRemarkId, setEditingRemarkId] = useState<string | null>(null);
  const [editingRemarkText, setEditingRemarkText] = useState('');
  const [showDeleteRemarkModal, setShowDeleteRemarkModal] = useState(false);
  const [remarkToDelete, setRemarkToDelete] = useState<Remark | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);
  const [editTask, setEditTask] = useState<LeadTaskItem | null>(null);
  const [deleteTaskTarget, setDeleteTaskTarget] = useState<LeadTaskItem | null>(null);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [leadDeals, setLeadDeals] = useState<DealItem[]>([]);
  const [dealsLoading, setDealsLoading] = useState(false);
  const [dealsError, setDealsError] = useState('');
  const [showAddDealDrawer, setShowAddDealDrawer] = useState(false);
  const [isAddingDeal, setIsAddingDeal] = useState(false);

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
    const handleEsc = (e: KeyboardEvent) => {
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
    isUpdating: isUpdatingRemark,
    isDeleting: isDeletingRemark,
    addRemark,
    updateRemark,
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

  useEffect(() => {
    if (!isOpen || !lead?.id) return;
    const fetchDeals = async () => {
      setDealsLoading(true);
      setDealsError('');
      try {
        const res = await dealService.getAllDeals({ pageNumber: 1, limit: 100 });
        if (res.status) {
          const data = res.data as { items?: DealItem[] };
          const items = data?.items ?? [];
          const filtered = items.filter(
            (d) => String(d.leadId) === String(lead.id)
          );
          setLeadDeals(filtered);
        } else {
          setDealsError(res.message || 'Failed to fetch deals');
        }
      } catch {
        setDealsError('Failed to load deals');
        setLeadDeals([]);
      } finally {
        setDealsLoading(false);
      }
    };
    fetchDeals();
  }, [isOpen, lead?.id]);

  const refreshDeals = async () => {
    if (!lead?.id) return;
    setDealsLoading(true);
    try {
      const res = await dealService.getAllDeals({ pageNumber: 1, limit: 100 });
      if (res.status) {
        const data = res.data as { items?: DealItem[] };
        const items = data?.items ?? [];
        const filtered = items.filter(
          (d) => String(d.leadId) === String(lead.id)
        );
        setLeadDeals(filtered);
      }
    } catch {
      setLeadDeals([]);
    } finally {
      setDealsLoading(false);
    }
  };

  const handleDealSave = async (formData: any) => {
    setIsAddingDeal(true);
    try {
      const res = await dealService.createDeal(formData);
      if (res.status) {
        showToastMessage('Deal created successfully', 'success');
        setShowAddDealDrawer(false);
        await refreshDeals();
      } else {
        showToastMessage(res.message || 'Failed to create deal', 'error');
      }
    } catch {
      showToastMessage('Failed to create deal', 'error');
    } finally {
      setIsAddingDeal(false);
    }
  };

  if (!isVisible || !lead) return null;

  const showToastMessage = (title: string, type: 'success' | 'error') => {
    setToastMessage(title);
    setToastType(type);
    setShowToast(true);
  };

  const handlePhoneClick = () => {
    if (lead.phone) {
      window.open(`tel:${lead.phone}`);
    }
  };

  const handleWhatsAppClick = () => {
    if (!lead.phone) return;
    const digits = lead.phone.replace(/[^0-9]/g, '');
    let number: string;
    if (digits.length === 10) {
      number = `91${digits}`;
    } else if (digits.length === 12 && digits.startsWith('91')) {
      number = digits;
    } else {
      number = digits;
    }
    window.open(`https://wa.me/${number}`, '_blank');
  };

  const handleAddTask = async (formData: any) => {
    const success = await addTask(formData);
    if (success) {
      showToastMessage('Task created successfully', 'success');
    } else {
      showToastMessage('Failed to create task', 'error');
    }
    return success;
  };

  const handleEditTask = async (formData: any) => {
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

  const handleEditLeadSaved = () => {
    setShowEditDrawer(false);
    showToastMessage('Lead updated successfully', 'success');
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
      showToastMessage('Remark added successfully.', 'success');
    } catch {
      showToastMessage('Failed to add remark.', 'error');
    }
  };

  const startEditRemark = (remark: Remark) => {
    setEditingRemarkId(remark.remarkId);
    setEditingRemarkText(remark.remarkNote);
  };

  const cancelEditRemark = () => {
    setEditingRemarkId(null);
    setEditingRemarkText('');
  };

  const handleSaveEdit = async () => {
    const trimmed = editingRemarkText.trim();
    const original = remarks.find((r: Remark) => r.remarkId === editingRemarkId);
    if (!trimmed) {
      cancelEditRemark();
      return;
    }
    if (trimmed === original?.remarkNote) {
      cancelEditRemark();
      return;
    }
    if (editingRemarkId == null) return;
    try {
      await updateRemark(editingRemarkId, trimmed);
      setEditingRemarkId(null);
      setEditingRemarkText('');
      showToastMessage('Remark updated successfully.', 'success');
    } catch {
      showToastMessage('Failed to update remark.', 'error');
    }
  };

  const handleDeleteClick = (remark: Remark) => {
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

  const getTypeBadgeClass = (type: string) => {
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
                  <span className={`leaddrawer-badge ${getTypeBadgeClass(lead.type)}`}>{lead.type}</span>
                  <span className={`leaddrawer-badge ${lead.status?.toLowerCase()}`}>{lead.status}</span>
                </div>
              </div>

              <div className="leaddrawer-actions">
                <button className="leaddrawer-action-btn" title="Edit" onClick={() => setShowEditDrawer(true)}><Edit2 size={16} /></button>
                <button className="leaddrawer-action-btn" title="WhatsApp" onClick={handleWhatsAppClick} disabled={!lead.phone} style={!lead.phone ? { opacity: 0.5, cursor: 'not-allowed' } : {}}><MessageSquare size={16} /></button>
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
                  <div className="leaddrawer-detail-card">
                    <div className="leaddrawer-detail-label">Source</div>
                    <div className="leaddrawer-detail-value">{lead.source || '-'}</div>
                  </div>
                  <div className="leaddrawer-detail-card">
                    <div className="leaddrawer-detail-label">Purpose</div>
                    <div className="leaddrawer-detail-value">{lead.purpose || '-'}</div>
                  </div>
                  <div className="leaddrawer-detail-card">
                    <div className="leaddrawer-detail-label">Status</div>
                    <div className="leaddrawer-detail-value">{lead.status || '-'}</div>
                  </div>
                  <div className="leaddrawer-detail-card">
                    <div className="leaddrawer-detail-label">Assigned To</div>
                    <div className="leaddrawer-detail-value">{lead.assignedTo || '-'}</div>
                  </div>
                  <div className="leaddrawer-detail-card">
                    <div className="leaddrawer-detail-label">Type</div>
                    <div className="leaddrawer-detail-value">{lead.type || '-'}</div>
                  </div>
                  <div className="leaddrawer-detail-card">
                    <div className="leaddrawer-detail-label">Follow Up</div>
                    <div className="leaddrawer-detail-value">{formatFollowUpDate(lead.nextFollowUp)}</div>
                  </div>
                  <div className="leaddrawer-detail-card leaddrawer-detail-full">
                    <div className="leaddrawer-detail-label">Location</div>
                    <div className="leaddrawer-detail-value">{lead.location || '-'}</div>
                  </div>

                  {(lead.additionalFields || []).map((af: { fieldId: string; name: string; value: string }) => (
                    <div key={af.fieldId} className="leaddrawer-detail-card">
                      <div className="leaddrawer-detail-label">{af.name}</div>
                      <div className="leaddrawer-detail-value">{af.value != null ? af.value : '-'}</div>
                    </div>
                  ))}
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
                      {apiActivities.map((item: any) => (
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
                        <div key={remark.remarkId} className="leaddrawer-note-card">
                          <div className="leaddrawer-note-avatar">
                            {(remark.agentName || '?').charAt(0).toUpperCase()}
                          </div>
                          <div className="leaddrawer-note-content">
                            <div className="leaddrawer-note-header">
                              <span className="leaddrawer-note-user">{remark.agentName}</span>
                              <span className="leaddrawer-note-time">{formatDateTime(remark.createdAt)}</span>
                            </div>
                            {editingRemarkId === remark.remarkId ? (
                              <div>
                                <textarea
                                  className="leaddrawer-remark-edit-textarea"
                                  value={editingRemarkText}
                                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditingRemarkText(e.target.value)}
                                  disabled={isUpdatingRemark}
                                />
                                <div className="leaddrawer-note-edit-actions">
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={handleSaveEdit}
                                    disabled={isUpdatingRemark || !editingRemarkText.trim()}
                                  >
                                    {isUpdatingRemark ? <><Loader2 size={14} className="spin" /> Saving...</> : 'Save'}
                                  </button>
                                  <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={cancelEditRemark}
                                    disabled={isUpdatingRemark}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="leaddrawer-note-text">{remark.remarkNote}</p>
                            )}
                            {((!!remark.agentId && !!user?.staffId && String(remark.agentId) === String(user.staffId)) || user?.isAdmin) && (
                              <div className="leaddrawer-note-actions">
                                <button className="leaddrawer-note-action" onClick={() => startEditRemark(remark)}>
                                  <Edit2 size={14} />
                                </button>
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
                          <span className={`leaddrawer-deal-stage ${(deal.stage || deal.status || '').toLowerCase().replace(' ', '-')}`}>{deal.stage || deal.status || '-'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
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
        deal={{ lead: lead?.name, leadId: String(lead?.id) } as DealFormData}
        onSave={handleDealSave}
      />
    </div>
  );
};

export default LeadDetailDrawer;
