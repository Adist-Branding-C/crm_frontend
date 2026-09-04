import React from 'react';
import { X, Building, Users, DollarSign } from 'lucide-react';
import type { Company } from '../types';
import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';

interface Props {
  isOpen: boolean;
  viewingCompany: Company | null;
  onClose: () => void;
}

const getStatusBadge = (status: string) => (
  <span className={`status-badge ${status}`}>{status === CompanyStatus.ACTIVE ? 'Active' : 'Inactive'}</span>
);

const CompanyViewDrawer: React.FC<Props> = ({ isOpen, viewingCompany, onClose }) => {
  if (!isOpen || !viewingCompany) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-section">
            <Building size={24} />
            <div>
              <h2>{viewingCompany.name}</h2>
              <span className="drawer-subtitle">Company Details</span>
            </div>
          </div>
          <button className="drawer-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="drawer-content">
          <div className="tab-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#8b5cf620' }}><Users size={20} color="var(--category-purple-text)" /></div>
                <div className="stat-info">
                  <span className="stat-label">Staff Count</span>
                  <span className="stat-value">{viewingCompany.staffCount}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#3b82f620' }}><Building size={20} color="var(--info)" /></div>
                <div className="stat-info">
                  <span className="stat-label">Total Leads</span>
                  <span className="stat-value">{viewingCompany.leads.toLocaleString()}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#10b98120' }}><DollarSign size={20} color="var(--success)" /></div>
                <div className="stat-info">
                  <span className="stat-label">Total Deals</span>
                  <span className="stat-value">{viewingCompany.deals}</span>
                </div>
              </div>
            </div>
            <div className="detail-section">
              <h3>Company Information</h3>
              <div className="detail-grid">
                <div className="detail-item"><label>Contact Person</label><span>{viewingCompany.contactPersonName}</span></div>
                <div className="detail-item"><label>Email</label><span>{viewingCompany.email}</span></div>
                <div className="detail-item"><label>Phone</label><span>{viewingCompany.phone}</span></div>
                <div className="detail-item"><label>Address</label><span>{viewingCompany.address || '—'}</span></div>
                <div className="detail-item"><label>GST Number</label><span>{viewingCompany.gstNumber || '—'}</span></div>
                <div className="detail-item"><label>Status</label><span>{getStatusBadge(viewingCompany.status)}</span></div>
                <div className="detail-item"><label>Registered On</label><span>{viewingCompany.dateOfRegistration || '—'}</span></div>
                <div className="detail-item"><label>Created Date</label><span>{viewingCompany.createdAt}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyViewDrawer;
