import React, { useState, useMemo } from 'react';
import { X, Search, User } from 'lucide-react';
import './AddLeadDrawer.css';

interface SampleLead {
  id: number;
  name: string;
  phone: string;
  status: string;
}

interface CampaignFormData {
  name: string;
  type: string;
  selectedLeads: SampleLead[];
  description: string;
  startDate: string;
  endDate: string;
  createdBy: string;
}

interface AddCampaignDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
  campaign?: CampaignFormData | null;
}

const sampleLeads: SampleLead[] = [
  { id: 1, name: 'Rahul Sharma', phone: '9876543210', status: 'Active' },
  { id: 2, name: 'Priya Patel', phone: '9876543211', status: 'Active' },
  { id: 3, name: 'Amit Kumar', phone: '9876543212', status: 'Pending' },
  { id: 4, name: 'Sneha Reddy', phone: '9876543213', status: 'Active' },
  { id: 5, name: 'Vikram Singh', phone: '9876543214', status: 'Inactive' },
  { id: 6, name: 'Ananya Gupta', phone: '9876543215', status: 'Active' },
  { id: 7, name: 'Rajesh Verma', phone: '9876543216', status: 'Pending' },
  { id: 8, name: 'Kavitha Nair', phone: '9876543217', status: 'Active' },
];

const sampleTypes: string[] = ['Email', 'SMS', 'WhatsApp', 'Social'];

const AddCampaignDrawer = ({ isOpen, onClose, onSave, campaign = null }: AddCampaignDrawerProps) => {
  const [formData, setFormData] = useState<CampaignFormData>({
    name: campaign?.name || '',
    type: campaign?.type || '',
    selectedLeads: campaign?.selectedLeads || [],
    description: campaign?.description || '',
    startDate: campaign?.startDate || '',
    endDate: campaign?.endDate || '',
    createdBy: campaign?.createdBy || 'Admin',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showLeadDropdown, setShowLeadDropdown] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');

  const filteredLeads = useMemo(() => {
    if (!leadSearch) return sampleLeads;
    return sampleLeads.filter(lead => 
      lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.phone.includes(leadSearch)
    );
  }, [leadSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleLeadSelect = (lead: SampleLead) => {
    if (!formData.selectedLeads.find(l => l.id === lead.id)) {
      setFormData(prev => ({ ...prev, selectedLeads: [...prev.selectedLeads, lead] }));
    }
    setShowLeadDropdown(false);
    setLeadSearch('');
  };

  const handleLeadRemove = (leadId: number) => {
    setFormData(prev => ({ ...prev, selectedLeads: prev.selectedLeads.filter(l => l.id !== leadId) }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Campaign name is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (formData.selectedLeads.length === 0) newErrors.selectedLeads = 'Select at least one lead';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const totalTasks = formData.selectedLeads.length;
      onSave({
        name: formData.name,
        type: formData.type,
        totalTasks,
        completedTasks: 0,
        completedPercent: 0,
        createdBy: formData.createdBy,
        createdAt: new Date().toISOString().split('T')[0]
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>{campaign ? 'Edit Campaign' : 'Add Campaign'}</h2>
          <button className="drawer-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="drawer-body">
          <div className="form-section-title">Campaign Information</div>
          <form className="lead-form">
            <div className="form-group">
              <label>Campaign Name *</label>
              <input type="text" name="name" placeholder="Enter campaign name" value={formData.name} onChange={handleChange} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label>Type *</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select</option>
                {sampleTypes.map(type => (<option key={type} value={type}>{type}</option>))}
              </select>
              {errors.type && <span className="error-text">{errors.type}</span>}
            </div>
            <div className="form-group">
              <label>Select Leads *</label>
              <div className="dropdown-search-container">
                <div className="search-input-wrapper">
                  <input type="text" placeholder="Search leads..." value={leadSearch} onChange={(e) => { setLeadSearch(e.target.value); setShowLeadDropdown(true); }} onFocus={() => setShowLeadDropdown(true)} />
                  <Search size={16} className="search-icon-inner" />
                </div>
                {showLeadDropdown && filteredLeads.length > 0 && (
                  <div className="dropdown-list">
                    {filteredLeads.map(lead => (
                      <button key={lead.id} type="button" onClick={() => handleLeadSelect(lead)}>
                        <User size={14} /> {lead.name} - {lead.phone}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.selectedLeads && <span className="error-text">{errors.selectedLeads}</span>}
            </div>
            {formData.selectedLeads.length > 0 && (
              <div className="selected-leads-list">
                <label>Selected Leads ({formData.selectedLeads.length})</label>
                <div className="leads-tags">
                  {formData.selectedLeads.map(lead => (
                    <span key={lead.id} className="lead-tag">
                      {lead.name}
                      <button type="button" onClick={() => handleLeadRemove(lead.id)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} rows={3} />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
            </div>
          </form>
        </div>
        <div className="drawer-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Save Campaign</button>
        </div>
      </div>
    </div>
  );
};

export default AddCampaignDrawer;