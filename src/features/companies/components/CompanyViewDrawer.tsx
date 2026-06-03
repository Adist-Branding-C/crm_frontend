import React from 'react';
import { X, Building, Users, DollarSign, Calendar } from 'lucide-react';
import type { Company, RenewalData } from '../types';
import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';
import { COMPANY_PLAN_OPTIONS } from '../constants';

interface Props {
  isOpen: boolean;
  viewingCompany: Company | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
  showRenewalModal: boolean;
  renewalData: RenewalData;
  onRenewalDataChange: (data: RenewalData) => void;
  onOpenRenewal: () => void;
  onCloseRenewal: () => void;
  onClose: () => void;
}

const getStatusBadge = (status: string) => (
  <span className={`status-badge ${status}`}>{status === CompanyStatus.ACTIVE ? 'Active' : 'Expired'}</span>
);

const getPlanBadge = (plan: string) => {
  const colors: Record<string, string> = { 'Enterprise': '#8b5cf6', 'Professional': '#3b82f6', 'Basic': '#10b981' };
  const color = colors[plan] || '#6b7280';
  return <span className="plan-badge" style={{ background: `${color}20`, color }}>{plan}</span>;
};

const CompanyViewDrawer: React.FC<Props> = ({
  isOpen, viewingCompany, activeTab, onTabChange,
  showRenewalModal, renewalData, onRenewalDataChange,
  onOpenRenewal, onCloseRenewal, onClose,
}) => {
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
        <div className="drawer-tabs">
          <button className={activeTab === 'overview' ? 'tab active' : 'tab'} onClick={() => onTabChange('overview')}>Overview</button>
          <button className={activeTab === 'plans' ? 'tab active' : 'tab'} onClick={() => onTabChange('plans')}>Plans</button>
        </div>
        <div className="drawer-content">
          {activeTab === 'overview' && (
            <div className="tab-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#8b5cf620' }}><Users size={20} color="#8b5cf6" /></div>
                  <div className="stat-info">
                    <span className="stat-label">Staff Count</span>
                    <span className="stat-value">{viewingCompany.staffCount}</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#3b82f620' }}><Building size={20} color="#3b82f6" /></div>
                  <div className="stat-info">
                    <span className="stat-label">Total Leads</span>
                    <span className="stat-value">{viewingCompany.leads?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#10b98120' }}><DollarSign size={20} color="#10b981" /></div>
                  <div className="stat-info">
                    <span className="stat-label">Total Deals</span>
                    <span className="stat-value">{viewingCompany.deals}</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#f59e0b20' }}><DollarSign size={20} color="#f59e0b" /></div>
                  <div className="stat-info">
                    <span className="stat-label">Total Revenue</span>
                    <span className="stat-value">${viewingCompany.revenue?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="detail-section">
                <h3>Company Information</h3>
                <div className="detail-grid">
                  <div className="detail-item"><label>Email</label><span>{viewingCompany.email}</span></div>
                  <div className="detail-item"><label>Phone</label><span>{viewingCompany.phone}</span></div>
                  <div className="detail-item"><label>Current Plan</label><span>{getPlanBadge(viewingCompany.plan || '')}</span></div>
                  <div className="detail-item"><label>Status</label><span>{getStatusBadge(viewingCompany.status || '')}</span></div>
                  <div className="detail-item"><label>Created Date</label><span>{viewingCompany.createdAt}</span></div>
                  <div className="detail-item"><label>Expiry Date</label><span className={viewingCompany.status === CompanyStatus.EXPIRED ? 'text-danger' : ''}>{viewingCompany.expiryDate}</span></div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'plans' && (
            <div className="tab-content">
              <div className="plans-list">
                {viewingCompany.plansHistory?.map((planItem, index) => (
                  <div key={index} className="plan-card">
                    <div className="plan-header">
                      <span className="plan-name">{planItem.plan}</span>
                      {index === 0 && <span className="current-badge">Current</span>}
                    </div>
                    <div className="plan-details">
                      <div className="plan-date"><Calendar size={14} /><span>{planItem.startDate} - {planItem.endDate}</span></div>
                      <div className="plan-price"><DollarSign size={14} /><span>{planItem.price?.toLocaleString()}/year</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary renewal-btn" onClick={onOpenRenewal}>Renew Plan</button>
            </div>
          )}
        </div>
      </div>

      {showRenewalModal && (
        <div className="modal-overlay" onClick={onCloseRenewal}>
          <div className="modal-content renewal-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Renew Plan</h2>
              <button className="modal-close" onClick={onCloseRenewal}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Number of Staff</label>
                <input type="number" value={renewalData.staffCount} onChange={(e) => onRenewalDataChange({ ...renewalData, staffCount: e.target.value })} placeholder="Enter number of staff" />
              </div>
              <div className="form-group">
                <label>Per Staff Price ($)</label>
                <input type="number" value={renewalData.perStaffPrice} onChange={(e) => onRenewalDataChange({ ...renewalData, perStaffPrice: e.target.value })} placeholder="Enter price per staff" />
              </div>
              <div className="form-group">
                <label>Plan</label>
                <select value={renewalData.plan} onChange={(e) => onRenewalDataChange({ ...renewalData, plan: e.target.value })}>
                  {COMPANY_PLAN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onCloseRenewal}>Cancel</button>
                <button className="btn btn-primary" onClick={() => console.log('Renew:', renewalData)}>Renew</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyViewDrawer;
