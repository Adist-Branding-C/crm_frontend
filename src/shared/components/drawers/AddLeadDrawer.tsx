import React, { useState } from 'react';
import { X } from 'lucide-react';
import { leadsService } from '../../../features/enquiries/services/LeadsService';
import type { AddLeadDrawerProps } from '../../types/drawers';
import './AddLeadDrawer.css';

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  address: string;
  agentId: string;
  purpose: string;
  type: string;
  statusId: string;
  source: string;
  nextFollowUp: string;
  notes: string;
}

const INITIAL_FORM: LeadFormData = {
  name: '',
  phone: '',
  email: '',
  location: '',
  address: '',
  agentId: '',
  purpose: '',
  type: '',
  statusId: '',
  source: '',
  nextFollowUp: '',
  notes: '',
};

const AddLeadDrawer = ({ isOpen, onClose, onSuccess }: AddLeadDrawerProps) => {
  const [form, setForm] = useState<LeadFormData>(INITIAL_FORM);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof LeadFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Name and Phone are required');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const response = await leadsService.addLead(form as unknown as Record<string, unknown>);
      if (response.status) {
        setForm(INITIAL_FORM);
        onSuccess?.();
        onClose();
      } else {
        setError(response.message);
      }
    } catch {
      setError('Failed to create lead. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setError('');
    onClose();
  };

  return (
    <div className="drawer-overlay" onClick={handleClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Add New Lead</h2>
          <button className="drawer-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
          {error && <div className="form-error" style={{ color: '#dc2626', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
          <form className="lead-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input type="text" placeholder="Enter name" value={form.name} onChange={handleChange('name')} />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input type="tel" placeholder="Enter phone number" value={form.phone} onChange={handleChange('phone')} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email" value={form.email} onChange={handleChange('email')} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" placeholder="Enter location" value={form.location} onChange={handleChange('location')} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" placeholder="Enter address" value={form.address} onChange={handleChange('address')} />
            </div>
            <div className="form-group">
              <label>Assigned To</label>
              <select value={form.agentId} onChange={handleChange('agentId')}>
                <option value="">Select</option>
                <option value="john">John Doe</option>
                <option value="jane">Jane Smith</option>
                <option value="mike">Mike Johnson</option>
              </select>
            </div>
            <div className="form-group">
              <label>Purpose</label>
              <select value={form.purpose} onChange={handleChange('purpose')}>
                <option value="">Select</option>
                <option value="sales">Sales</option>
                <option value="support">Support</option>
                <option value="demo">Demo</option>
              </select>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={form.type} onChange={handleChange('type')}>
                <option value="">Select</option>
                <option value="hot">Hot Lead</option>
                <option value="warm">Warm Lead</option>
                <option value="cold">Cold Lead</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.statusId} onChange={handleChange('statusId')}>
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="form-group">
              <label>Source</label>
              <select value={form.source} onChange={handleChange('source')}>
                <option value="">Select</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
                <option value="email">Email Campaign</option>
              </select>
            </div>
            <div className="form-group">
              <label>Next Follow Up</label>
              <input type="date" value={form.nextFollowUp} onChange={handleChange('nextFollowUp')} />
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea placeholder="Enter notes" rows={4} value={form.notes} onChange={handleChange('notes')} />
            </div>
            <div className="drawer-footer">
              <button className="btn btn-secondary" type="button" onClick={handleClose}>Cancel</button>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Lead'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLeadDrawer;
