import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { useLeadSearch } from '../../../features/deal/hooks/useLeadSearch';
import { useStaffList } from '../../../features/deal/hooks/useStaffList';
import type { DealFormData, AddDealDrawerProps } from '../../types/drawers';
import './AddLeadDrawer.css';

const AddDealDrawer = ({ isOpen, onClose, deal = null, onSave }: AddDealDrawerProps) => {
  const { leads, isLoading: leadsLoading, search: leadSearch, setSearch: setLeadSearch } = useLeadSearch();
  const { staff, isLoading: staffLoading } = useStaffList();

  const [formData, setFormData] = useState<DealFormData>({
    dealName: deal?.dealName || '',
    lead: deal?.lead || '',
    leadId: deal?.leadId,
    mobile: deal?.mobile || '',
    amount: deal?.amount || '',
    status: deal?.status || '',
    type: deal?.type || '',
    startDate: deal?.startDate || '',
    endDate: deal?.endDate || '',
    assignAgent: deal?.assignAgent || '',
    agentId: deal?.agentId,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showLeadDropdown, setShowLeadDropdown] = useState(false);

  const filteredLeads = useMemo(() => {
    if (!leadSearch) return leads;
    return leads.filter(l =>
      l.label.toLowerCase().includes(leadSearch.toLowerCase())
    );
  }, [leadSearch, leads]);

  useEffect(() => {
    if (deal?.leadId && leads.length > 0) {
      const match = leads.find(l => String(l.value) === String(deal.leadId));
      if (match) {
        setFormData(prev => ({ ...prev, lead: match.label, leadId: match.value }));
      }
    }
  }, [deal?.leadId, leads]);

  useEffect(() => {
    if (deal?.agentId && staff.length > 0) {
      const match = staff.find(s => String(s.value) === String(deal.agentId));
      if (match) {
        setFormData(prev => ({ ...prev, assignAgent: match.label, agentId: match.value }));
      }
    }
  }, [deal?.agentId, staff]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'assignAgent') {
      const match = staff.find(s => s.label === value);
      setFormData(prev => ({ ...prev, assignAgent: value, agentId: match?.value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLeadSelect = (lead: { label: string; value: string | number }) => {
    setFormData(prev => ({
      ...prev,
      lead: lead.label,
      leadId: lead.value,
    }));
    setShowLeadDropdown(false);
    setLeadSearch('');
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.dealName.trim()) newErrors.dealName = 'Deal name is required';
    if (!formData.lead) newErrors.lead = 'Lead is required';
    if (formData.mobile && !formData.mobile.trim()) newErrors.mobile = 'Mobile is required';
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
                    value={showLeadDropdown ? leadSearch : formData.lead}
                    onChange={(e) => {
                      const val = e.target.value;
                      setLeadSearch(val);
                      setShowLeadDropdown(true);
                      if (!val) setFormData(prev => ({ ...prev, lead: '', leadId: undefined }));
                    }}
                    onFocus={() => {
                      setLeadSearch(formData.lead);
                      setShowLeadDropdown(true);
                    }}
                  />
                  <Search size={16} className="search-icon-inner" />
                </div>
                {showLeadDropdown && (
                  <div className="dropdown-list">
                    {leadsLoading ? (
                      <div className="dropdown-loading">
                        <Loader2 size={16} className="spinner" />
                        Loading leads...
                      </div>
                    ) : filteredLeads.length > 0 ? (
                      filteredLeads.map(l => (
                        <button
                          key={l.value}
                          type="button"
                          onClick={() => handleLeadSelect(l)}
                        >
                          {l.label}
                        </button>
                      ))
                    ) : (
                      <div className="dropdown-no-results">No leads found</div>
                    )}
                  </div>
                )}
              </div>
              {errors.lead && <span className="error-text">{errors.lead}</span>}
            </div>
            <div className="form-group">
              <label>Mobile</label>
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
                {staffLoading ? (
                  <option value="" disabled>Loading staff...</option>
                ) : (
                  staff.map(s => (
                    <option key={s.value} value={s.label}>{s.label}</option>
                  ))
                )}
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
