import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import type { SampleDeal, SampleAgent, TaskFormData, AddDealTaskDrawerProps } from '../../types/drawers';
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

const AddDealTaskDrawer = ({ isOpen, onClose, task = null, onSave }: AddDealTaskDrawerProps) => {
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
    setShowDealDropdown(false);
    setDealSearch('');
  };

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
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>{task ? 'Edit Deal Task' : 'Create Deal Task'}</h2>
          <button className="drawer-close" onClick={onClose}>
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
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Save Task</button>
        </div>
      </div>
    </div>
  );
};

export default AddDealTaskDrawer;