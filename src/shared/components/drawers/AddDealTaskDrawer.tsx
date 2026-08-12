import React, { useState, useMemo, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import type { SampleDeal, SampleAgent, TaskFormData, AddDealTaskDrawerProps } from '../../types/drawers';
import PreviewCanvas, { PreviewSection } from '../preview/PreviewCanvas';
import { draftService } from '../../services/draftService';
import './AddLeadDrawer.css';

const sampleDeals: SampleDeal[] = [
  { id: 1, name: 'Website Development', dealId: 'DL001', amount: 150000 },
  { id: 2, name: 'CRM Implementation', dealId: 'DL002', amount: 200000 },
  { id: 3, name: 'Annual Maintenance', dealId: 'DL003', amount: 50000 },
];

const sampleAgents: SampleAgent[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
];

const sampleCategories: SampleAgent[] = [
  { id: 1, name: 'Follow Up' },
  { id: 2, name: 'Payment Reminder' },
  { id: 3, name: 'Demo' },
  { id: 4, name: 'Documentation' },
  { id: 5, name: 'Closing' },
];

const AddDealTaskDrawer = ({ isOpen, onClose, task = null, draftId: initialDraftId, onSave }: AddDealTaskDrawerProps) => {
  const isEditing = !!task;
  const [view, setView] = useState<'form' | 'preview'>('form');
  const [draftId, setDraftId] = useState<string | null>(initialDraftId || null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const [formData, setFormData] = useState<TaskFormData>({
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

  useEffect(() => {
    if (initialDraftId && isOpen) {
      const draft = draftService.getDrafts('deal-task').find(d => d.id === initialDraftId);
      if (draft) {
        setFormData(draft.payload);
        setDraftId(draft.id);
      }
    } else if (!isOpen) {
      if (!isEditing) {
        setFormData({
          title: '', category: '', deal: '', dealId: '', amount: '',
          description: '', scheduledDate: '', scheduledTime: '',
          assignedBy: 'Admin', assignedTo: '', priority: 'medium', status: 'pending'
        });
      }
      setDraftId(null);
    }
  }, [initialDraftId, isOpen, isEditing]);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDealDropdown, setShowDealDropdown] = useState(false);
  const [dealSearch, setDealSearch] = useState('');

  const filteredDeals = useMemo(() => {
    if (!dealSearch) return sampleDeals;
    return sampleDeals.filter(deal => 
      deal.name.toLowerCase().includes(dealSearch.toLowerCase())
    );
  }, [dealSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDealSelect = (deal: SampleDeal) => {
    setFormData(prev => ({ 
      ...prev, 
      deal: deal.name,
      dealId: deal.dealId,
      amount: String(deal.amount)
    }));
    setIsDirty(true);
    setShowDealDropdown(false);
    setDealSearch('');
  };

  // Auto-save draft
  useEffect(() => {
    if (isDirty) {
      const timeout = setTimeout(() => {
        const title = formData.title ? formData.title : 'Untitled Task';
        const subtitle = formData.deal ? `For ${formData.deal}` : 'No deal attached';
        const id = draftService.saveDraft('deal-task', formData, title, subtitle, draftId || undefined);
        if (id !== draftId) {
          setDraftId(id);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [formData, isDirty, draftId]);

  // Load draft if initialDraftId is provided and we haven't dirtied the form yet
  useEffect(() => {
    if (initialDraftId && !isDirty && isOpen) {
      const draft = draftService.getDrafts('deal-task').find(d => d.id === initialDraftId);
      if (draft) {
        setFormData(draft.payload);
        setDraftId(draft.id);
      }
    }
  }, [initialDraftId, isDirty, isOpen]);



  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.deal) newErrors.deal = 'Deal is required';
    if (!formData.scheduledDate) newErrors.scheduledDate = 'Scheduled date is required';
    if (!formData.scheduledTime) newErrors.scheduledTime = 'Scheduled time is required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Assigned to is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setView('preview');
    }
  };

  const handleFinalSave = () => {
    setIsSaving(true);
    try {
      onSave(formData);
      if (draftId) {
        draftService.deleteDraft(draftId);
      }
      handleClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setView('form');
    setDraftId(null);
    setIsDirty(false);
    onClose();
  };

  if (!isOpen) return null;

  if (view === 'preview') {
    const sections: PreviewSection[] = [
      {
        title: 'Task Details',
        fields: [
          { label: 'Title', value: formData.title },
          { label: 'Category', value: formData.category },
          { label: 'Deal', value: formData.deal },
          { label: 'Amount', value: formData.amount ? `₹${formData.amount}` : '' },
          { label: 'Description', value: formData.description },
        ]
      },
      {
        title: 'Schedule & Assignment',
        fields: [
          { label: 'Date', value: formData.scheduledDate },
          { label: 'Time', value: formData.scheduledTime },
          { label: 'Assigned By', value: formData.assignedBy },
          { label: 'Assigned To', value: formData.assignedTo },
          { label: 'Priority', value: formData.priority },
          { label: 'Status', value: formData.status },
        ]
      }
    ];

    return (
      <PreviewCanvas
        isOpen={isOpen}
        title={isEditing ? 'Preview Task Edit' : 'Preview Task'}
        subtitle="Review the details before saving"
        sections={sections}
        isSaving={isSaving}
        onClose={handleClose}
        onEdit={() => setView('form')}
        onSave={handleFinalSave}
      />
    );
  }

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>{isEditing ? 'Edit Deal Task' : 'Create Deal Task'}</h2>
          <button className="drawer-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          <div className="form-section-title">Task Details</div>
          <form className="lead-form">
            <div className="form-group">
              <label>Title *</label>
              <input 
                type="text" 
                name="title"
                placeholder="Enter task title" 
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {sampleCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              {errors.category && <span className="error-text">{errors.category}</span>}
            </div>
            <div className="form-group">
              <label>Deal *</label>
              <div className="dropdown-search-container">
                <div className="search-input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Search deal..."
                    value={formData.deal || dealSearch}
                    onChange={(e) => {
                      setDealSearch(e.target.value);
                      setShowDealDropdown(true);
                      if (!e.target.value) setFormData(prev => ({ ...prev, deal: '', dealId: '', amount: '' }));
                    }}
                    onFocus={() => setShowDealDropdown(true)}
                  />
                  <Search size={16} className="search-icon-inner" />
                </div>
                {showDealDropdown && filteredDeals.length > 0 && (
                  <div className="dropdown-list">
                    {filteredDeals.map(deal => (
                      <button 
                        key={deal.id} 
                        type="button"
                        onClick={() => handleDealSelect(deal)}
                      >
                        {deal.name} - ₹{deal.amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.deal && <span className="error-text">{errors.deal}</span>}
            </div>
            <div className="form-group">
              <label>Amount (₹)</label>
              <input 
                type="number" 
                name="amount"
                placeholder="Enter amount" 
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                name="description"
                placeholder="Enter description" 
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>Scheduled Date *</label>
              <input 
                type="date" 
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
              />
              {errors.scheduledDate && <span className="error-text">{errors.scheduledDate}</span>}
            </div>
            <div className="form-group">
              <label>Scheduled Time *</label>
              <input 
                type="time" 
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleChange}
              />
              {errors.scheduledTime && <span className="error-text">{errors.scheduledTime}</span>}
            </div>
            <div className="form-group">
              <label>Assigned By</label>
              <input 
                type="text" 
                name="assignedBy"
                value={formData.assignedBy}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Assigned To *</label>
              <select 
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {sampleAgents.map(agent => (
                  <option key={agent.id} value={agent.name}>{agent.name}</option>
                ))}
              </select>
              {errors.assignedTo && <span className="error-text">{errors.assignedTo}</span>}
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select 
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="overdue">OverDue</option>
              </select>
            </div>
          </form>
        </div>
        <div className="drawer-footer">
          <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Preview Task</button>
        </div>
      </div>
    </div>
  );
};

export default AddDealTaskDrawer;