import React from 'react';
import { Users, Building, DollarSign } from 'lucide-react';
import StatCard from '../../../shared/components/StatCard';
import type { CompanyDetailsProps } from '../types/component.types';
import { getCompanyStatusBadge } from '../utils/companyStatusBadge';

/**
 * Read-only company detail view (stats + info grid) - pure presentational content, no shell
 * awareness. Renders the same whether it's inside a drawer, a modal, or a page.
 *
 * Used by:
 * - CompaniesPage (composed inside the shared Drawer shell)
 */
const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company }) => (
  <div className="tab-content">
    <div className="stats-grid">
      <StatCard icon={Users} iconColor="#8b5cf6" iconBackground="#8b5cf620" value={company.licensedSeats} label="Licensed Seats" />
      <StatCard icon={Building} iconColor="#3b82f6" iconBackground="#3b82f620" value={company.leads.toLocaleString()} label="Total Leads" />
      <StatCard icon={DollarSign} iconColor="#10b981" iconBackground="#10b98120" value={company.deals} label="Total Deals" />
    </div>
    <div className="detail-section">
      <h3>Company Information</h3>
      <div className="detail-grid">
        <div className="detail-item"><label>Contact Person</label><span>{company.contactPersonName}</span></div>
        <div className="detail-item"><label>Email</label><span>{company.email}</span></div>
        <div className="detail-item"><label>Phone</label><span>{company.phone}</span></div>
        <div className="detail-item"><label>Address</label><span>{company.address || '—'}</span></div>
        <div className="detail-item"><label>GST Number</label><span>{company.gstNumber || '—'}</span></div>
        <div className="detail-item"><label>Status</label><span>{getCompanyStatusBadge(company.status)}</span></div>
        <div className="detail-item"><label>Registered On</label><span>{company.dateOfRegistration || '—'}</span></div>
        <div className="detail-item"><label>Created Date</label><span>{company.createdAt}</span></div>
      </div>
    </div>
  </div>
);

export default CompanyDetails;
