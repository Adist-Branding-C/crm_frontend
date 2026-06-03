import React from 'react';
import { ChevronDown, Eye, Edit2, Trash2, Building, Mail, Phone, Users } from 'lucide-react';
import type { Company, CompaniesTableProps } from '../types';
import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';

const getStatusBadge = (status: string) => (
  <span className={`status-badge ${status}`}>{status === CompanyStatus.ACTIVE ? 'Active' : 'Expired'}</span>
);

const getPlanBadge = (plan: string) => {
  const colors: Record<string, string> = { 'Enterprise': '#8b5cf6', 'Professional': '#3b82f6', 'Basic': '#10b981' };
  const color = colors[plan] || '#6b7280';
  return <span className="plan-badge" style={{ background: `${color}20`, color }}>{plan}</span>;
};

const CompaniesTable: React.FC<CompaniesTableProps> = ({ data, sortConfig, onSort, selectedRows, onSelectAll, onSelectRow, onView, onEdit, onDelete }) => (
  <div className="table-container">
    <table className="enquiries-table">
      <thead>
        <tr>
          <th><input type="checkbox" checked={selectedRows.length === data.length && data.length > 0} onChange={onSelectAll} /></th>
          <th onClick={() => onSort('name')} className="sortable">Company {sortConfig.key === 'name' && <ChevronDown size={14} />}</th>
          <th>Contact</th>
          <th>Plan</th>
          <th onClick={() => onSort('staffCount')} className="sortable">Staff</th>
          <th onClick={() => onSort('leads')} className="sortable">Leads</th>
          <th onClick={() => onSort('deals')} className="sortable">Deals</th>
          <th onClick={() => onSort('revenue')} className="sortable">Revenue</th>
          <th>Status</th>
          <th onClick={() => onSort('expiryDate')} className="sortable">Expiry</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(company => (
          <tr key={company.id} className={selectedRows.includes(company.id) ? 'selected' : ''}>
            <td><input type="checkbox" checked={selectedRows.includes(company.id)} onChange={() => onSelectRow(company.id)} /></td>
            <td>
              <div className="company-name-cell">
                <Building size={16} className="company-icon" />
                <div>
                  <div className="company-name">{company.name}</div>
                  <div className="company-date">Since {company.createdAt}</div>
                </div>
              </div>
            </td>
            <td>
              <div className="contact-cell">
                <div><Mail size={12} /> {company.email}</div>
                <div><Phone size={12} /> {company.phone}</div>
              </div>
            </td>
            <td>{getPlanBadge(company.plan)}</td>
            <td><div className="stat-cell"><Users size={14} /> {company.staffCount}</div></td>
            <td>{company.leads.toLocaleString()}</td>
            <td>{company.deals}</td>
            <td>${company.revenue.toLocaleString()}</td>
            <td>{getStatusBadge(company.status)}</td>
            <td>{company.expiryDate}</td>
            <td>
              <div className="action-buttons">
                <button className="action-btn" title="View" onClick={() => onView(company)}><Eye size={14} /></button>
                <button className="action-btn" title="Edit" onClick={() => onEdit(company)}><Edit2 size={14} /></button>
                <button className="action-btn delete" title="Delete" onClick={() => onDelete(company.id)}><Trash2 size={14} /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CompaniesTable;
