import React from 'react';
import { X } from 'lucide-react';
import { COMPANY_PLAN_OPTIONS, COMPANY_STATUS_OPTIONS } from '../constants';
import type { NewCompany } from '../types';

interface Props {
  isOpen: boolean;
  editingCompany: { id: number } | null;
  newCompany: NewCompany;
  onNewCompanyChange: (company: NewCompany) => void;
  onSave: () => void;
  onClose: () => void;
}

const AddCompanyModal: React.FC<Props> = ({ isOpen, editingCompany, newCompany, onNewCompanyChange, onSave, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingCompany ? 'Edit Company' : 'Add New Company'}</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Company Name</label>
            <input type="text" value={newCompany.name} onChange={(e) => onNewCompanyChange({ ...newCompany, name: e.target.value })} placeholder="Enter company name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={newCompany.email} onChange={(e) => onNewCompanyChange({ ...newCompany, email: e.target.value })} placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" value={newCompany.phone} onChange={(e) => onNewCompanyChange({ ...newCompany, phone: e.target.value })} placeholder="Enter phone number" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Plan</label>
              <select value={newCompany.plan} onChange={(e) => onNewCompanyChange({ ...newCompany, plan: e.target.value })}>
                {COMPANY_PLAN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={newCompany.status} onChange={(e) => onNewCompanyChange({ ...newCompany, status: e.target.value })}>
                {COMPANY_STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave}>{editingCompany ? 'Save Changes' : 'Add Company'}</button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;
