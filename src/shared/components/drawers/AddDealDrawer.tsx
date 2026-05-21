import React, { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import './AddLeadDrawer.css';

interface SampleLead {
  id: number;
  name: string;
  phone: string;
}

interface SampleAgent {
  id: number;
  name: string;
}

interface DealFormData {
  dealName: string;
  lead: string;
  mobile: string;
  amount: string;
  status: string;
  type: string;
  startDate: string;
  endDate: string;
  assignAgent: string;
}

interface AddDealDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: DealFormData) => void;
  deal?: DealFormData | null;
}

const sampleLeads: SampleLead[] = [
  { id: 1, name: 'Rahul Sharma', phone: '9876543210' },
  { id: 2, name: 'Priya Patel', phone: '9876543211' },
  { id: 3, name: 'Amit Kumar', phone: '9876543212' },
  { id: 4, name: 'Sneha Reddy', phone: '9876543213' },
  { id: 5, name: 'Vikram Singh', phone: '9876543214' },
];

const sampleAgents: SampleAgent[] = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
];

const AddDealDrawer = ({ isOpen, onClose, deal = null, onSave }: AddDealDrawerProps) => {
  const [formData, setFormData] = useState<DealFormData>({
    dealName: deal?.dealName || '',
    lead: deal?.lead || '',
    mobile: deal?.mobile || '',
    amount: deal?.amount || '',
    status: deal?.status || '',
    type: deal?.type || '',
    startDate: deal?.startDate || '',
    endDate: deal?.endDate || '',
    assignAgent: deal?.assignAgent || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showLeadDropdown, setShowLeadDropdown] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');

  const filteredLeads = useMemo(() => {
    if (!leadSearch) return sampleLeads;
    return sampleLeads.filter(lead => 
      lead.name.toLowerCase().includes(leadSearch.toLowerCase())
    );
  }, [leadSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLeadSelect = (lead: SampleLead) => {
    setFormData(prev => ({ 
      ...prev, 
      lead: lead.name,
      mobile: lead.phone 
    }));
    setShowLeadDropdown(false);
    setLeadSearch('');
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.dealName.trim()) newErrors.dealName = 'Deal name is required';
    if (!formData.lead) newErrors.lead = 'Lead is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.assignAgent) newErrors.assignAgent = 'Assign agent is required';
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
          <h2>{deal ? 'Edit Deal' : 'Add Deal'}</h2>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          <div className="form-section-title">Deal Information</div>
          <form className="lead-form">
            <div className="form-group">
              <label>Deal Name *</label>
              <input 
                type="text" 
                name="dealName"
                placeholder="Enter deal name" 
                value={formData.dealName}
                onChange={handleChange}
              />
              {errors.dealName && <span className="error-text">{errors.dealName}</span>}
            </div>
            <div className="form-group">
              <label>Lead *</label>
              <div className="dropdown-search-container">
                <div className="search-input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Search lead..."
                    value={formData.lead || leadSearch}
                    onChange={(e) => {
                      setLeadSearch(e.target.value);
                      setShowLeadDropdown(true);
                      if (!e.target.value) setFormData(prev => ({ ...prev, lead: '' }));
                    }}
                    onFocus={() => setShowLeadDropdown(true)}
                  />
                  <Search size={16} className="search-icon-inner" />
                </div>
                {showLeadDropdown && filteredLeads.length > 0 && (
                  <div className="dropdown-list">
                    {filteredLeads.map(lead => (
                      <button 
                        key={lead.id} 
                        type="button"
                        onClick={() => handleLeadSelect(lead)}
                      >
                        {lead.name} - {lead.phone}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.lead && <span className="error-text">{errors.lead}</span>}
            </div>
            <div className="form-group">
              <label>Mobile *</label>
              <input 
                type="tel" 
                name="mobile"
                placeholder="Enter mobile number" 
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && <span className="error-text">{errors.mobile}</span>}
            </div>
            <div className="form-group">
              <label>Amount (₹) *</label>
              <input 
                type="number" 
                name="amount"
                placeholder="Enter amount" 
                value={formData.amount}
                onChange={handleChange}
              />
              {errors.amount && <span className="error-text">{errors.amount}</span>}
            </div>
            <div className="form-group">
              <label>Status *</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="win">Deal Win</option>
                <option value="lost">Deal Lost</option>
                <option value="invoice">Invoice</option>
                <option value="pending">Pending</option>
              </select>
              {errors.status && <span className="error-text">{errors.status}</span>}
            </div>
            <div className="form-group">
              <label>Type *</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="sales">Sales</option>
                <option value="registration">Registration</option>
                <option value="renewal">Renewal</option>
                <option value="upsell">Upsell</option>
              </select>
              {errors.type && <span className="error-text">{errors.type}</span>}
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input 
                type="date" 
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input 
                type="date" 
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Assign Agent *</label>
              <select 
                name="assignAgent"
                value={formData.assignAgent}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {sampleAgents.map(agent => (
                  <option key={agent.id} value={agent.name}>{agent.name}</option>
                ))}
              </select>
              {errors.assignAgent && <span className="error-text">{errors.assignAgent}</span>}
            </div>
          </form>
        </div>
        <div className="drawer-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Save Deal</button>
        </div>
      </div>
    </div>
  );
};

export default AddDealDrawer;