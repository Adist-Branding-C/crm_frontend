import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Phone, Mail, MapPin, MessageSquare, Trash2, ArrowLeft, Edit2, Calendar, User, Briefcase, Clock, FileText, Layers, Loader2 } from 'lucide-react';
import Toast from '../../../shared/components/Toast';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import EditableDetailField from '../../../shared/components/drawers/EditableDetailField';
import type { EditableDetailFieldOption } from '../../../shared/components/drawers/EditableDetailField';
import ActivityTimelineCard from '../../daily-activity/components/ActivityTimelineCard';
import { ActivityMapper } from '../../daily-activity/mappers/activity.mapper';
import { buildWhatsappUrl } from '../../../shared/utils/whatsappMessage.util';
import { formatDateTime } from '../../../shared/utils/dateUtils';
import { badgeClass } from '../../../shared/utils/badgeUtils';
import { splitMobileValue } from '../utils/mobileFormat';
import { currencySymbol } from '../../../shared/constants/currencies';
import { useDealActivities } from '../hooks/useDealActivities';
import { useDealRemarks } from '../hooks/useDealRemarks';
import { useDealLead } from '../hooks/useDealLead';
import { useDealLeadDeals } from '../hooks/useDealLeadDeals';
import { useDealFormOptions } from '../hooks/useDealFormOptions';
import { dealService } from '../services/deal.service';
import { DEAL_LOST_REASON_OPTIONS } from '../constants/dealLostReasons';
import type { DealItem } from '../types/interface';
import type { DealDetailDrawerProps } from '../../../shared/types/drawers';

const PRIORITY_OPTIONS: EditableDetailFieldOption[] = [
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
];

const TYPE_OPTIONS: EditableDetailFieldOption[] = [
  { value: 'New', label: 'New' },
  { value: 'Existing', label: 'Existing' },
];

const LOST_REASON_OPTIONS: EditableDetailFieldOption[] = DEAL_LOST_REASON_OPTIONS.map((r) => ({ value: r, label: r }));

export interface DealDetailContentProps {
  deal: NonNullable<DealDetailDrawerProps['deal']>;
  onClose: () => void;
  onDealUpdated: () => void;
  onEditDeal: (deal: DealItem) => void;
  onDeleteDeal?: ((deal: DealItem) => void) | undefined;
}

/**
 * All deal-detail business content: profile header, Basic Info/Contact/More
 * Info sections (with inline-editable fields), and the Activity / Notes /
 * Other Deals / Lead tabs. Mirrors LeadDetailContent's layout and
 * conventions exactly, reusing the same generic `/activities` and `/remarks`
 * endpoints (entityType 'deal'/'DEAL' instead of 'lead'/'LEAD') and the same
 * `leaddrawer-*` styling.
 *
 * "Other Deals" lists the parent lead's other deals (server-filtered by
 * leadId); clicking one re-points the drawer at that deal. "Lead" shows the
 * parent lead's full profile.
 *
 * Used by:
 * - DealDetailDrawer (composed inside the shared Drawer shell)
 */
const DealDetailContent = ({ deal: dealProp, onClose, onDealUpdated, onEditDeal, onDeleteDeal }: DealDetailContentProps) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'note' | 'deals' | 'lead'>('activity');
  const [newRemarkText, setNewRemarkText] = useState('');
  const [showDeleteRemarkModal, setShowDeleteRemarkModal] = useState(false);
  const [remarkToDelete, setRemarkToDelete] = useState<{ id: number } | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  // The parent's list refresh (via onDealUpdated) doesn't reliably flow a
  // fresher object back down as this same `deal` prop (DealItem carries no
  // updatedAt to key a resync off), so inline edits apply an optimistic
  // merge here directly rather than waiting on that round-trip - reset only
  // when a genuinely different deal is opened.
  const [deal, setDeal] = useState(dealProp);
  useEffect(() => {
    setDeal(dealProp);
  }, [dealProp.id]);

  const { activities: apiActivities, isLoading: activitiesLoading, error: activitiesError, refresh: refreshActivities } = useDealActivities(deal.id, true, activeTab);
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
  } = useDealRemarks(deal.id, true, activeTab);

  const {
    deals: leadDeals,
    isLoading: isLoadingLeadDeals,
    error: leadDealsError,
  } = useDealLeadDeals(deal.leadId, deal.id, true, activeTab);

  const {
    lead: leadProfile,
    isLoading: isLoadingLeadProfile,
    error: leadProfileError,
  } = useDealLead(deal.leadId, true, activeTab);

  const { statuses, pipelines, staff } = useDealFormOptions();

  const stagesForPipeline = statuses.filter((s) => String(s.pipelineId) === String(deal.pipelineId));
  const pipelineName = pipelines.find((p) => String(p.id) === String(deal.pipelineId))?.name ?? deal.pipelineId ?? '';
  const isLostStage = stagesForPipeline.find(
    (s) => String(s.value) === String(deal.stageId ?? deal.statusId),
  )?.outcome === 'LOST';

  const showToastMessage = (title: string, type: 'success' | 'error') => {
    setToastMessage(title);
    setToastType(type);
    setShowToast(true);
  };

  const saveDealField = async (payload: Record<string, unknown>, optimisticMerge: Partial<DealItem>): Promise<boolean> => {
    try {
      const res = await dealService.updateDeal(String(deal.id), payload);
      if (res.status) {
        setDeal((prev) => ({ ...prev, ...optimisticMerge }));
        showToastMessage('Deal updated successfully', 'success');
        onDealUpdated?.();
        return true;
      }
      showToastMessage(res.message || 'Failed to update deal', 'error');
      return false;
    } catch {
      showToastMessage('Failed to update deal', 'error');
      return false;
    }
  };

  const handlePhoneClick = () => {
    if (deal.mobile) {
      window.open(`tel:${deal.mobile}`);
    }
  };

  const handleWhatsAppClick = () => {
    if (!deal.mobile) return;
    window.open(buildWhatsappUrl(deal.mobile), '_blank');
  };

  const handleAddRemark = async () => {
    const trimmed = newRemarkText.trim();
    if (!trimmed) return;
    try {
      await addRemark(trimmed);
      setNewRemarkText('');
      showToastMessage('Note added successfully', 'success');
      refreshActivities();
    } catch {
      showToastMessage('Failed to add note', 'error');
    }
  };

  const handleDeleteRemarkClick = (remark: { id: number }) => {
    setRemarkToDelete(remark);
    setShowDeleteRemarkModal(true);
  };

  const handleDeleteRemarkConfirm = async () => {
    if (!remarkToDelete) return;
    try {
      await deleteRemark(String(remarkToDelete.id));
      setShowDeleteRemarkModal(false);
      setRemarkToDelete(null);
      showToastMessage('Note deleted successfully', 'success');
      refreshActivities();
    } catch {
      showToastMessage('Failed to delete note', 'error');
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
                {deal.dealName?.charAt(0) || 'D'}
              </div>
              <h2 className="leaddrawer-name">{deal.dealName}</h2>
              <div className="leaddrawer-badges">
                {deal.priority && <span className={`leaddrawer-badge ${badgeClass(deal.priority)}`}>{deal.priority}</span>}
                {(deal.stage || deal.status) && <span className={`leaddrawer-badge ${badgeClass(deal.stage || deal.status || '')}`}>{deal.stage || deal.status}</span>}
              </div>
            </div>

            <div className="leaddrawer-actions">
              <button className="leaddrawer-action-btn" title="Edit" onClick={() => onEditDeal(deal)}><Edit2 size={16} /></button>
              <button className="leaddrawer-action-btn" title="WhatsApp" onClick={handleWhatsAppClick} disabled={!deal.mobile} style={!deal.mobile ? { opacity: 0.5, cursor: 'not-allowed' } : {}}><MessageSquare size={16} /></button>
              <button className="leaddrawer-action-btn" title="Phone" onClick={handlePhoneClick} disabled={!deal.mobile} style={!deal.mobile ? { opacity: 0.5, cursor: 'not-allowed' } : {}}><Phone size={16} /></button>
              <button className="leaddrawer-action-btn delete" title="Delete" onClick={() => onDeleteDeal?.(deal)}><Trash2 size={16} /></button>
            </div>

            <div className="leaddrawer-section">
              <div className="leaddrawer-section-title">Basic Info</div>
              <div className="leaddrawer-info-grid">
                <div className="leaddrawer-info-item">
                  <div className="leaddrawer-info-icon"><User size={14} /></div>
                  <div className="leaddrawer-info-content">
                    <span className="leaddrawer-info-label">Created By</span>
                    <span className="leaddrawer-info-value">{deal.createdBy || '-'}</span>
                  </div>
                </div>
                <div className="leaddrawer-info-item">
                  <div className="leaddrawer-info-icon"><Calendar size={14} /></div>
                  <div className="leaddrawer-info-content">
                    <span className="leaddrawer-info-label">Created At</span>
                    {/* deal.createdAt already arrives pre-formatted (DD/MM/YYYY)
                        from the list/detail API, unlike Lead's raw ISO string -
                        formatRelativeDate can't parse that format, so it's
                        shown as-is instead (same as the Deals table column). */}
                    <span className="leaddrawer-info-value">{deal.createdAt || '-'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="leaddrawer-section">
              <div className="leaddrawer-section-title">Contact</div>
              <div className="leaddrawer-info-grid">
                <div className="leaddrawer-info-item">
                  <div className="leaddrawer-info-icon"><User size={14} /></div>
                  <div className="leaddrawer-info-content">
                    <span className="leaddrawer-info-label">Lead</span>
                    <span className="leaddrawer-info-value">{deal.lead || '-'}</span>
                  </div>
                </div>
                <div className="leaddrawer-info-item">
                  <div className="leaddrawer-info-icon"><Phone size={14} /></div>
                  <div className="leaddrawer-info-content">
                    <span className="leaddrawer-info-label">Mobile</span>
                    <span className="leaddrawer-info-value">
                      {deal.mobile ? splitMobileValue(deal.mobile).number : '-'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="leaddrawer-section">
              <div className="leaddrawer-section-title">More Info</div>
              <div className="leaddrawer-details-grid">
                <div className="leaddrawer-detail-card">
                  <div className="leaddrawer-detail-label">Pipeline</div>
                  <div className="leaddrawer-detail-value"><span>{pipelineName || '-'}</span></div>
                </div>
                <EditableDetailField
                  label="Stage"
                  displayValue={deal.stage || deal.status || ''}
                  editValue={String(deal.stageId ?? deal.statusId ?? '')}
                  type="select"
                  options={stagesForPipeline}
                  onSave={(v) => {
                    const label = stagesForPipeline.find((s) => s.value === v)?.label ?? '';
                    return saveDealField({ stageId: v as string }, { stageId: v as string, stage: label });
                  }}
                />
                <EditableDetailField
                  label="Priority"
                  displayValue={deal.priority || ''}
                  editValue={deal.priority || ''}
                  type="select"
                  options={PRIORITY_OPTIONS}
                  onSave={(v) => saveDealField({ priority: v as string }, { priority: v as string })}
                />
                <EditableDetailField
                  label="Type"
                  displayValue={deal.type || ''}
                  editValue={deal.type || ''}
                  type="select"
                  options={TYPE_OPTIONS}
                  onSave={(v) => saveDealField({ type: v as string }, { type: v as string })}
                />
                <EditableDetailField
                  label="Deal Owner"
                  displayValue={deal.agent || ''}
                  editValue={String(deal.agentId ?? '')}
                  type="select"
                  options={staff}
                  onSave={(v) => {
                    const label = staff.find((s) => s.value === v)?.label ?? '';
                    return saveDealField({ agentId: v as string }, { agentId: v as string, agent: label });
                  }}
                />
                <EditableDetailField
                  label="Amount"
                  displayValue={deal.amount != null ? `${currencySymbol(deal.currency)}${Number(deal.amount).toLocaleString()}` : ''}
                  editValue={deal.amount != null ? String(deal.amount) : ''}
                  type="text"
                  onSave={(v) => saveDealField({ amount: v as string }, { amount: Number(v) })}
                />
                <EditableDetailField
                  label="Close Date"
                  displayValue={deal.closeDate || ''}
                  editValue={deal.closeDate ? deal.closeDate.slice(0, 10) : ''}
                  type="date"
                  onSave={(v) => saveDealField({ closeDate: v as string }, { closeDate: v as string })}
                />
                {isLostStage && (
                  <EditableDetailField
                    label="Lost Reason"
                    displayValue={deal.lostReason || ''}
                    editValue={deal.lostReason || ''}
                    type="select"
                    options={LOST_REASON_OPTIONS}
                    onSave={(v) => saveDealField({ lostReason: v as string }, { lostReason: v as string })}
                  />
                )}
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
              <FileText size={14} /> Notes
            </button>
            <button className={`leaddrawer-tab ${activeTab === 'deals' ? 'active' : ''}`} onClick={() => setActiveTab('deals')}>
              <Layers size={14} /> Other Deals
            </button>
            <button className={`leaddrawer-tab ${activeTab === 'lead' ? 'active' : ''}`} onClick={() => setActiveTab('lead')}>
              <Briefcase size={14} /> Lead
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
                    id="deal-note-input"
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
                  <div className="leaddrawer-loading">Loading notes...</div>
                ) : errorRemarks ? (
                  <div className="leaddrawer-error">{errorRemarks}</div>
                ) : remarks.length === 0 ? (
                  <div className="leaddrawer-empty-state">
                    <div className="leaddrawer-empty-icon"><FileText size={24} /></div>
                    <h4 className="leaddrawer-empty-title">No notes yet</h4>
                    <p className="leaddrawer-empty-text">Add a note to start tracking updates.</p>
                  </div>
                ) : (
                  <div>
                    {remarks.map((remark) => (
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
                            <button className="leaddrawer-note-action" onClick={() => handleDeleteRemarkClick(remark)}>
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
                  itemName="this note"
                  onConfirm={handleDeleteRemarkConfirm}
                  onClose={() => { setShowDeleteRemarkModal(false); setRemarkToDelete(null); }}
                  isDeleting={isDeletingRemark}
                />
              </div>
            )}

            {activeTab === 'deals' && (
              <div>
                <div className="leaddrawer-tab-header">
                  <h3 className="leaddrawer-tab-heading">Other Deals for {deal.lead || 'this lead'}</h3>
                </div>
                {isLoadingLeadDeals ? (
                  <div className="leaddrawer-loading">Loading deals...</div>
                ) : leadDealsError ? (
                  <div className="leaddrawer-error">{leadDealsError}</div>
                ) : leadDeals.length === 0 ? (
                  <div className="leaddrawer-empty-state">
                    <div className="leaddrawer-empty-icon"><Layers size={24} /></div>
                    <h4 className="leaddrawer-empty-title">No other deals</h4>
                    <p className="leaddrawer-empty-text">This lead has no other deals yet.</p>
                  </div>
                ) : (
                  <div>
                    {leadDeals.map((other) => (
                      <button
                        key={other.id}
                        type="button"
                        className="leaddrawer-note-card leaddrawer-note-card--button"
                        onClick={() => { setDeal(other); setActiveTab('activity'); }}
                      >
                        <div className="leaddrawer-note-avatar">
                          {(other.dealName || 'D').charAt(0).toUpperCase()}
                        </div>
                        <div className="leaddrawer-note-content">
                          <div className="leaddrawer-note-header">
                            <span className="leaddrawer-note-user">{other.dealName || 'Untitled deal'}</span>
                            {(other.stage || other.status) && (
                              <span className={`leaddrawer-badge ${badgeClass(other.stage || other.status || '')}`}>
                                {other.stage || other.status}
                              </span>
                            )}
                          </div>
                          <p className="leaddrawer-note-text">
                            {other.amount != null ? `${currencySymbol(other.currency)}${Number(other.amount).toLocaleString()}` : '-'}
                            {other.agent ? ` · ${other.agent}` : ''}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'lead' && (
              <div>
                <div className="leaddrawer-tab-header">
                  <h3 className="leaddrawer-tab-heading">Parent Lead</h3>
                </div>
                {isLoadingLeadProfile ? (
                  <div className="leaddrawer-loading">Loading lead profile...</div>
                ) : leadProfileError ? (
                  <div className="leaddrawer-error">{leadProfileError}</div>
                ) : !leadProfile ? (
                  <div className="leaddrawer-empty-state">
                    <div className="leaddrawer-empty-icon"><User size={24} /></div>
                    <h4 className="leaddrawer-empty-title">Lead unavailable</h4>
                    <p className="leaddrawer-empty-text">This deal isn't linked to a lead.</p>
                  </div>
                ) : (
                  <div className="leaddrawer-lead-profile">
                    <div className="leaddrawer-profile">
                      <div className="leaddrawer-avatar">
                        {(leadProfile.name || '?').charAt(0).toUpperCase()}
                      </div>
                      <h2 className="leaddrawer-name">{leadProfile.name || 'Unknown lead'}</h2>
                      <div className="leaddrawer-badges">
                        {leadProfile.status?.status && (
                          <span className={`leaddrawer-badge ${badgeClass(leadProfile.status.status)}`}>{leadProfile.status.status}</span>
                        )}
                        {leadProfile.source?.source && (
                          <span className="leaddrawer-badge">{leadProfile.source.source}</span>
                        )}
                      </div>
                    </div>

                    <div className="leaddrawer-section">
                      <div className="leaddrawer-section-title">Contact</div>
                      <div className="leaddrawer-info-grid">
                        <div className="leaddrawer-info-item">
                          <div className="leaddrawer-info-icon"><Phone size={14} /></div>
                          <div className="leaddrawer-info-content">
                            <span className="leaddrawer-info-label">Phone</span>
                            <span className="leaddrawer-info-value">
                              {leadProfile.phone ? `${leadProfile.countryCode ? `${leadProfile.countryCode} ` : ''}${leadProfile.phone}` : '-'}
                            </span>
                          </div>
                        </div>
                        <div className="leaddrawer-info-item">
                          <div className="leaddrawer-info-icon"><Mail size={14} /></div>
                          <div className="leaddrawer-info-content">
                            <span className="leaddrawer-info-label">Email</span>
                            <span className="leaddrawer-info-value">{leadProfile.email || '-'}</span>
                          </div>
                        </div>
                        <div className="leaddrawer-info-item">
                          <div className="leaddrawer-info-icon"><MapPin size={14} /></div>
                          <div className="leaddrawer-info-content">
                            <span className="leaddrawer-info-label">Address</span>
                            <span className="leaddrawer-info-value">
                              {[leadProfile.address, leadProfile.location].filter(Boolean).join(', ') || '-'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="leaddrawer-section">
                      <div className="leaddrawer-section-title">More Info</div>
                      <div className="leaddrawer-details-grid">
                        <div className="leaddrawer-detail-card">
                          <div className="leaddrawer-detail-label">Owner</div>
                          <div className="leaddrawer-detail-value"><span>{leadProfile.assignedStaff?.name || '-'}</span></div>
                        </div>
                        <div className="leaddrawer-detail-card">
                          <div className="leaddrawer-detail-label">Type</div>
                          <div className="leaddrawer-detail-value"><span>{leadProfile.type?.type || '-'}</span></div>
                        </div>
                        <div className="leaddrawer-detail-card">
                          <div className="leaddrawer-detail-label">Purpose</div>
                          <div className="leaddrawer-detail-value"><span>{leadProfile.purpose?.purpose || '-'}</span></div>
                        </div>
                        <div className="leaddrawer-detail-card">
                          <div className="leaddrawer-detail-label">Next Follow-up</div>
                          <div className="leaddrawer-detail-value"><span>{leadProfile.nextFollowUpDate ? formatDateTime(leadProfile.nextFollowUpDate) : '-'}</span></div>
                        </div>
                        <div className="leaddrawer-detail-card">
                          <div className="leaddrawer-detail-label">Created By</div>
                          <div className="leaddrawer-detail-value"><span>{leadProfile.createdByName || '-'}</span></div>
                        </div>
                      </div>
                    </div>

                    {(leadProfile.additionalFields?.length ?? 0) > 0 && (
                      <div className="leaddrawer-section">
                        <div className="leaddrawer-section-title">Additional Fields</div>
                        <div className="leaddrawer-details-grid">
                          {leadProfile.additionalFields!.map((f) => (
                            <div key={f.fieldId} className="leaddrawer-detail-card">
                              <div className="leaddrawer-detail-label">{f.name}</div>
                              <div className="leaddrawer-detail-value"><span>{f.value || '-'}</span></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {leadProfile.notes && (
                      <div className="leaddrawer-section">
                        <div className="leaddrawer-section-title">Notes</div>
                        <p className="leaddrawer-note-text">{leadProfile.notes}</p>
                      </div>
                    )}

                    <Link to="/leads" className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%', textAlign: 'center' }}>
                      View in Leads
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Toast message={toastMessage} type={toastType} isVisible={showToast} onClose={() => setShowToast(false)} />
    </>
  );
};

export default DealDetailContent;
