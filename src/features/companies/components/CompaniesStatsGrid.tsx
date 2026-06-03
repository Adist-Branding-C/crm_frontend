import React from 'react';
import { Building, AlertCircle, Clock, Users, DollarSign } from 'lucide-react';
import type { CompaniesStatsGridProps } from '../types';

const CompaniesStatsGrid: React.FC<CompaniesStatsGridProps> = React.memo(({ stats }) => (
  <div className="company-stats-grid">
    <div className="company-stat-card">
      <div className="company-stat-icon" style={{ background: '#3b82f620' }}><Building size={20} color="#3b82f6" /></div>
      <div className="company-stat-info">
        <span className="company-stat-value">{stats.totalCompanies}</span>
        <span className="company-stat-label">Total Companies</span>
      </div>
    </div>
    <div className="company-stat-card">
      <div className="company-stat-icon" style={{ background: '#ef444420' }}><AlertCircle size={20} color="#ef4444" /></div>
      <div className="company-stat-info">
        <span className="company-stat-value">{stats.expiredCustomers}</span>
        <span className="company-stat-label">Expired</span>
      </div>
    </div>
    <div className="company-stat-card">
      <div className="company-stat-icon" style={{ background: '#f59e0b20' }}><Clock size={20} color="#f59e0b" /></div>
      <div className="company-stat-info">
        <span className="company-stat-value">{stats.soonExpire}</span>
        <span className="company-stat-label">Soon Expire</span>
      </div>
    </div>
    <div className="company-stat-card">
      <div className="company-stat-icon" style={{ background: '#8b5cf620' }}><Users size={20} color="#8b5cf6" /></div>
      <div className="company-stat-info">
        <span className="company-stat-value">{stats.totalStaff}</span>
        <span className="company-stat-label">Total Staff</span>
      </div>
    </div>
    <div className="company-stat-card">
      <div className="company-stat-icon" style={{ background: '#10b98120' }}><DollarSign size={20} color="#10b981" /></div>
      <div className="company-stat-info">
        <span className="company-stat-value">${stats.totalRevenue.toLocaleString()}</span>
        <span className="company-stat-label">Total Revenue</span>
      </div>
    </div>
  </div>
));

CompaniesStatsGrid.displayName = 'CompaniesStatsGrid';
export default CompaniesStatsGrid;
