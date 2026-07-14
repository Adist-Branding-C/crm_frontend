import { useState, useMemo, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useLeadSearch } from '../hooks/useLeadSearch';
import { useStaffList } from '../hooks/useStaffList';
import type { DealFormData } from '../../../shared/types/drawers';
import '../../../shared/components/drawers/AddLeadDrawer.css';

interface DealFormProps {
  initialValues: DealFormData | null;
  onSave: (data: DealFormData) => void;
  onCancel: () => void;
}

const EMPTY_FORM_DATA: DealFormData = {
  dealName: '',
  lead: '',
  mobile: '',
  amount: '',
  status: '',
  type: '',
  startDate: '',
  endDate: '',
  assignAgent: '',
};

/**
 * Deal add/edit form content - no knowledge of being inside a drawer (no isOpen/onClose).
 * Composed inside a Drawer shell by the caller (see AddDealDrawer and DealPage).
 */
const DealForm = ({ initialValues, onSave, onCancel }: DealFormProps) => {
  const { leads, isLoading: leadsLoading, search: leadSearch, setSearch: setLeadSearch } = useLeadSearch();
  const { staff, isLoading: staffLoading } = useStaffList();

  const [formData, setFormData] = useState<DealFormData>(initialValues ?? EMPTY_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showLeadDropdown, setShowLeadDropdown] = useState(false);

  const filteredLeads = useMemo(() => {
    if (!leadSearch) return leads;
    return leads.filter(l =>
      l.label.toLowerCase().includes(leadSearch.toLowerCase())
    );
  }, [leadSearch, leads]);

  useEffect(() => {
    if (initialValues?.leadId && leads.length > 0) {
      const match = leads.find(l => String(l.value) === String(initialValues.leadId));
      if (match) {
        setFormData(prev => ({ ...prev, lead: match.label, leadId: match.value }));
      }
    }
  }, [initialValues?.leadId, leads]);

  useEffect(() => {
    if (initialValues?.agentId && staff.length > 0) {
      const match = staff.find(s => String(s.value) === String(initialValues.agentId));
      if (match) {
        setFormData(prev => ({ ...prev, assignAgent: match.label, agentId: match.value }));
      }
    }
  }, [initialValues?.agentId, staff]);

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
    }
  };

  return (
    <>
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
      <div className="drawer-footer">
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>Save Deal</button>
      </div>
    </>
  );
};

export default DealForm;
