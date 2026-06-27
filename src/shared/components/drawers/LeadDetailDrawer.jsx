import React, { useState, useEffect } from 'react';
import { X, Phone, MessageSquare, Trash2, Plus, Mail, Briefcase, ShoppingCart, User, Building, Mail as MailIcon, Send, Check, Clock, Star, ArrowLeft, ChevronDown, Edit2, MapPin, Calendar, UserPlus, FileText, MoreVertical, Pencil, AlertTriangle } from 'lucide-react';
import './LeadDetailDrawer.css';

const deleteConfirmModalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalStyle = {
  background: 'white',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '420px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.25rem 1.5rem',
  borderBottom: '1px solid #e5e7eb',
};

const modalBodyStyle = {
  padding: '1.5rem',
  textAlign: 'center',
};

const iconContainerStyle = {
  width: '60px',
  height: '60px',
  background: '#fef2f2',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 1.25rem',
  color: '#dc2626',
};

const modalFooterStyle = {
  display: 'flex',
  gap: '1rem',
  padding: '1rem 1.5rem',
  borderTop: '1px solid #e5e7eb',
  justifyContent: 'center',
};
import './LeadDetailDrawer.css';
import AddDealTaskDrawer from './AddDealTaskDrawer';
import { useLeadActivities } from '../../../features/enquiries/hooks/useLeadActivities';

function formatActivityDate(isoString) {
  const d = new Date(isoString);
  const datePart = d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const timePart = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return datePart + ' at ' + timePart;
}

const LeadDetailDrawer = ({ lead, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('activity');
  const [showTaskDrawer, setShowTaskDrawer] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notes, setNotes] = useState([
    { id: 1, user: 'Sarah Khan', content: 'Customer showed interest in premium package. Follow up needed next week.', date: 'Apr 25, 2024 at 4:32 PM' },
    { id: 2, user: 'Mike Johnson', content: 'Called but no response. Left voicemail.', date: 'Apr 24, 2024 at 2:15 PM' },
  ]);
  const [newNote, setNewNote] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Follow up call', category: 'call', date: '2024-04-28', priority: 'high', status: 'pending', assignedTo: 'John Doe' },
    { id: 2, title: 'Send proposal', category: 'email', date: '2024-04-26', priority: 'medium', status: 'in-progress', assignedTo: 'Jane Smith' },
    { id: 3, title: 'Schedule demo', category: 'meeting', date: '2024-04-25', priority: 'low', status: 'completed', assignedTo: 'John Doe' },
  ]);
  const [deals, setDeals] = useState([
    { id: 1, title: 'Enterprise Package', amount: 250000, stage: 'proposal', expectedClose: '2024-05-15', progress: 65, owner: 'John Doe' },
    { id: 2, title: 'Basic Plan', amount: 50000, stage: 'won', expectedClose: '2024-04-20', progress: 100, owner: 'Jane Smith' },
  ]);
  const [taskFilter, setTaskFilter] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [leadInfo, setLeadInfo] = useState({
    source: '',
    purpose: '',
    status: '',
    assignedTo: '',
    type: '',
    nextFollowUp: '',
    address: '',
    location: '',
    remarks: '',
    date: '',
    assignedDate: ''
  });

  const fieldOptions = {
    source: ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Direct', 'Ads'],
    purpose: ['Sales', 'Support', 'Demo', 'Partnership', 'Other'],
    status: ['Active', 'Inactive', 'Pending', 'Converted', 'Lost'],
    type: ['Hot Lead', 'Warm Lead', 'Cold Lead'],
    assignedTo: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Admin']
  };

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
  
  console.log('Lead Object', lead);

  useEffect(() => {
    if (lead && isOpen) {
      setLeadInfo({
        source: lead.source || 'Website',
        purpose: lead.purpose || 'Sales',
        status: lead.status || 'Active',
        assignedTo: lead.assignedTo || 'John Doe',
        type: lead.type || 'Hot Lead',
        nextFollowUp: lead.nextFollowUp || '2024-04-30',
        address: '123 Main Street, City',
        location: 'New York, USA',
        remarks: '',
        date: lead.createdAt || '2024-01-15',
        assignedDate: '2024-01-15'
      });
    }
  }, [lead, isOpen]);

  console.log('Lead Drawer Render', {
  lead,
  isOpen,
  leadId: lead?.id,
});
  const { activities: apiActivities, isLoading: activitiesLoading, error: activitiesError } = useLeadActivities(lead?.id, isOpen);

  console.log({
  activities,
  isLoading,
  error,
});

  if (!isVisible || !lead) return null;

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([{ id: Date.now(), user: 'Current User', content: newNote, date: new Date().toLocaleString() }, ...notes]);
      setNewNote('');
    }
  };

  const getTypeBadgeClass = (type) => {
    if (!type) return '';
    return type.toLowerCase().replace(' ', '-');
  };

  const startEdit = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const saveEdit = () => {
    setLeadInfo(prev => ({ ...prev, [editingField]: editValue }));
    setEditingField(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const filteredTasks = taskFilter === 'all' ? tasks : tasks.filter(t => t.status === taskFilter);

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
                <button className="leaddrawer-action-btn" title="Edit"><Edit2 size={16} /></button>
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
                      <span className="leaddrawer-info-value">{lead.assignedTo}</span>
                    </div>
                  </div>
                  <div className="leaddrawer-info-item">
                    <div className="leaddrawer-info-icon"><Calendar size={14} /></div>
                    <div className="leaddrawer-info-content">
                      <span className="leaddrawer-info-label">Created At</span>
                      <span className="leaddrawer-info-value">{lead.createdAt}</span>
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
                      <span className="leaddrawer-info-value">{lead.phone}</span>
                    </div>
                  </div>
                  <div className="leaddrawer-info-item">
                    <div className="leaddrawer-info-icon"><MailIcon size={14} /></div>
                    <div className="leaddrawer-info-content">
                      <span className="leaddrawer-info-label">Email</span>
                      <span className="leaddrawer-info-value">{lead.name?.toLowerCase().replace(' ', '.')}@email.com</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="leaddrawer-section">
                <div className="leaddrawer-section-title">More Info</div>
                <div className="leaddrawer-details-grid">
                  <div className="leaddrawer-detail-card" onClick={() => startEdit('source', leadInfo.source)}>
                    <div className="leaddrawer-detail-label">Source</div>
                    {editingField === 'source' ? (
                      <select 
                        className="leaddrawer-edit-select"
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                      >
                        {fieldOptions.source.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <div className="leaddrawer-detail-value">{leadInfo.source} <Pencil size={12} /></div>
                    )}
                  </div>
                  <div className="leaddrawer-detail-card" onClick={() => startEdit('purpose', leadInfo.purpose)}>
                    <div className="leaddrawer-detail-label">Purpose</div>
                    {editingField === 'purpose' ? (
                      <select 
                        className="leaddrawer-edit-select"
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                      >
                        {fieldOptions.purpose.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <div className="leaddrawer-detail-value">{leadInfo.purpose} <Pencil size={12} /></div>
                    )}
                  </div>
                  <div className="leaddrawer-detail-card" onClick={() => startEdit('status', leadInfo.status)}>
                    <div className="leaddrawer-detail-label">Status</div>
                    {editingField === 'status' ? (
                      <select 
                        className="leaddrawer-edit-select"
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                      >
                        {fieldOptions.status.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <div className="leaddrawer-detail-value">{leadInfo.status} <Pencil size={12} /></div>
                    )}
                  </div>
                  <div className="leaddrawer-detail-card" onClick={() => startEdit('assignedTo', leadInfo.assignedTo)}>
                    <div className="leaddrawer-detail-label">Assigned To</div>
                    {editingField === 'assignedTo' ? (
                      <select 
                        className="leaddrawer-edit-select"
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                      >
                        {fieldOptions.assignedTo.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <div className="leaddrawer-detail-value">{leadInfo.assignedTo} <Pencil size={12} /></div>
                    )}
                  </div>
                  <div className="leaddrawer-detail-card" onClick={() => startEdit('type', leadInfo.type)}>
                    <div className="leaddrawer-detail-label">Type</div>
                    {editingField === 'type' ? (
                      <select 
                        className="leaddrawer-edit-select"
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                      >
                        {fieldOptions.type.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <div className="leaddrawer-detail-value">{leadInfo.type} <Pencil size={12} /></div>
                    )}
                  </div>
                  <div className="leaddrawer-detail-card" onClick={() => startEdit('nextFollowUp', leadInfo.nextFollowUp)}>
                    <div className="leaddrawer-detail-label">Follow Up</div>
                    {editingField === 'nextFollowUp' ? (
                      <input 
                        type="date"
                        className="leaddrawer-edit-input"
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                      />
                    ) : (
                      <div className="leaddrawer-detail-value">{leadInfo.nextFollowUp} <Pencil size={12} /></div>
                    )}
                  </div>
                  <div className="leaddrawer-detail-card leaddrawer-detail-full" onClick={() => startEdit('address', leadInfo.address)}>
                    <div className="leaddrawer-detail-label">Address</div>
                    {editingField === 'address' ? (
                      <input 
                        type="text"
                        className="leaddrawer-edit-input"
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                      />
                    ) : (
                      <div className="leaddrawer-detail-value">{leadInfo.address} <Pencil size={12} /></div>
                    )}
                  </div>
                  <div className="leaddrawer-detail-card leaddrawer-detail-full" onClick={() => startEdit('location', leadInfo.location)}>
                    <div className="leaddrawer-detail-label">Location</div>
                    {editingField === 'location' ? (
                      <input 
                        type="text"
                        className="leaddrawer-edit-input"
                        value={editValue} 
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        autoFocus
                      />
                    ) : (
                      <div className="leaddrawer-detail-value">{leadInfo.location} <Pencil size={12} /></div>
                    )}
                  </div>
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
                      {apiActivities.map((item) => (
                        <div className="leaddrawer-activity-card" key={item.id}>
                          <div className="leaddrawer-activity-avatar">
                            {(item.actorName || '?').charAt(0).toUpperCase()}
                          </div>
                          <div className="leaddrawer-activity-content">
                            <div className="leaddrawer-activity-header">
                              <span className="leaddrawer-activity-user">{item.actorName}</span>
                            </div>
                            <span className="leaddrawer-activity-time">{formatActivityDate(item.createdAt)}</span>
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
                    <button className="btn btn-primary btn-sm" onClick={document.getElementById('note-input')?.focus()}>
                      <Plus size={14} /> Add Note
                    </button>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <textarea
                      id="note-input"
                      placeholder="Write a note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
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
                    />
                    {newNote.trim() && (
                      <button className="btn btn-primary btn-sm" onClick={handleAddNote} style={{ marginTop: '0.5rem' }}>Save Note</button>
                    )}
                  </div>
                  <div>
                    {notes.map(note => (
                      <div key={note.id} className="leaddrawer-note-card">
                        <div className="leaddrawer-note-avatar">{note.user.charAt(0)}</div>
                        <div className="leaddrawer-note-content">
                          <div className="leaddrawer-note-header">
                            <span className="leaddrawer-note-user">{note.user}</span>
                            <span className="leaddrawer-note-time">{note.date}</span>
                          </div>
                          <p className="leaddrawer-note-text">{note.content}</p>
                          <div className="leaddrawer-note-actions">
                            <button className="leaddrawer-note-action"><Edit2 size={14} /></button>
                            <button className="leaddrawer-note-action"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'task' && (
                <div>
                  <div className="leaddrawer-tab-header">
                    <h3 className="leaddrawer-tab-heading">Tasks</h3>
                    <button className="btn btn-primary btn-sm" onClick={() => setShowTaskDrawer(true)}>
                      <Plus size={14} /> Add Task
                    </button>
                  </div>
                  <div className="leaddrawer-task-filters">
                    <button className={`leaddrawer-filter-btn ${taskFilter === 'all' ? 'active' : ''}`} onClick={() => setTaskFilter('all')}>All</button>
                    <button className={`leaddrawer-filter-btn ${taskFilter === 'pending' ? 'active' : ''}`} onClick={() => setTaskFilter('pending')}>Pending</button>
                    <button className={`leaddrawer-filter-btn ${taskFilter === 'in-progress' ? 'active' : ''}`} onClick={() => setTaskFilter('in-progress')}>In Progress</button>
                    <button className={`leaddrawer-filter-btn ${taskFilter === 'completed' ? 'active' : ''}`} onClick={() => setTaskFilter('completed')}>Completed</button>
                  </div>
                  <div>
                    {filteredTasks.map(task => (
                      <div key={task.id} className="leaddrawer-task-card">
                        <div className="leaddrawer-task-info">
                          <div className="leaddrawer-task-title">{task.title}</div>
                          <div className="leaddrawer-task-meta">
                            <span>{task.date}</span>
                            <span>{task.assignedTo}</span>
                          </div>
                        </div>
                        <div className="leaddrawer-task-badges">
                          <span className={`leaddrawer-task-badge ${task.priority}`}>{task.priority}</span>
                          <span className={`leaddrawer-task-badge ${task.status === 'in-progress' ? 'in-progress' : task.status}`}>{task.status === 'in-progress' ? 'In Progress' : task.status}</span>
                        </div>
                        <div className="leaddrawer-task-actions">
                          <button className="leaddrawer-note-action"><Edit2 size={14} /> </button>
                          <button className="leaddrawer-note-action"><Check size={14} /></button>
                          <button className="leaddrawer-note-action"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
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
                      <input type="email" placeholder="To" defaultValue={`${lead.name?.toLowerCase().replace(' ', '.')}@email.com`} />
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

              {activeTab === 'deal' && (
                <div>
                  <div className="leaddrawer-tab-header">
                    <h3 className="leaddrawer-tab-heading">Deals</h3>
                    <button className="btn btn-primary btn-sm">
                      <Plus size={14} /> Add Deal
                    </button>
                  </div>
                  <div>
                    {deals.map(deal => (
                      <div key={deal.id} className="leaddrawer-deal-card">
                        <div className="leaddrawer-deal-header">
                          <div>
                            <div className="leaddrawer-deal-title">{deal.title}</div>
                            <div className="leaddrawer-task-meta">
                              <span>Expected: {deal.expectedClose}</span>
                              <span>Owner: {deal.owner}</span>
                            </div>
                          </div>
                          <span className="leaddrawer-deal-amount">₹{deal.amount.toLocaleString()}</span>
                        </div>
                        <span className={`leaddrawer-deal-stage ${deal.stage}`}>{deal.stage}</span>
                        <div className="leaddrawer-deal-progress">
                          <div className="leaddrawer-deal-progress-bar" style={{ width: `${deal.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDeleteConfirm && (
        <div style={deleteConfirmModalStyle} onClick={() => setShowDeleteConfirm(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h5 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Confirm Delete</h5>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }} onClick={() => setShowDeleteConfirm(false)}>
                <X size={20} />
              </button>
            </div>
            <div style={modalBodyStyle}>
              <div style={iconContainerStyle}>
                <AlertTriangle size={40} />
              </div>
              <p style={{ fontSize: '14px', color: '#1a1b1d', marginBottom: '0.5rem' }}>
                Are you sure you want to delete <strong style={{ color: '#dc2626' }}>{lead?.name}</strong>?<br />
                This action cannot be undone.
              </p>
            </div>
            <div style={modalFooterStyle}>
              <button style={{ padding: '0.625rem 1.25rem', borderRadius: '6px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', background: '#dc2626', color: 'white', border: 'none' }} onClick={() => { setShowDeleteConfirm(false); onClose(); }}>
                Delete Lead
              </button>
              <button style={{ padding: '0.625rem 1.25rem', borderRadius: '6px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', background: '#f3f4f6', color: '#374151', border: 'none' }} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <AddDealTaskDrawer 
        isOpen={showTaskDrawer} 
        onClose={() => setShowTaskDrawer(false)}
        onSave={(taskData) => {
          setTasks([...tasks, { ...taskData, id: Date.now() }]);
          setShowTaskDrawer(false);
        }}
      />
    </div>
  );
};

export default LeadDetailDrawer;