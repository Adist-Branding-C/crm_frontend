import React from 'react';
import { Eye, Edit2, Trash2, Building, User, Mail, Phone, Users } from 'lucide-react';
import type { CompaniesTableProps } from '../types';
import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';

const getStatusBadge = (status: string) => (
  <span className={`status-badge ${status}`}>{status === CompanyStatus.ACTIVE ? 'Active' : 'Inactive'}</span>
);

const CompaniesTable: React.FC<CompaniesTableProps> = ({ data, selectedRows, onSelectAll, onSelectRow, onView, onEdit, onDelete }) => (
  <div className="table-container">
    <table className="enquiries-table">
      <thead>
        <tr>
          <th><input type="checkbox" checked={selectedRows.length === data.length && data.length > 0} onChange={onSelectAll} /></th>
          <th>Company</th>
          <th>Contact</th>
          <th>Staff</th>
          <th>Leads</th>
          <th>Deals</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(company => (
          <tr key={company.companyId} className={selectedRows.includes(company.companyId) ? 'selected' : ''}>
            <td><input type="checkbox" checked={selectedRows.includes(company.companyId)} onChange={() => onSelectRow(company.companyId)} /></td>
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
                <div><User size={12} /> {company.contactPersonName}</div>
                <div><Mail size={12} /> {company.email}</div>
                <div><Phone size={12} /> {company.phone}</div>
              </div>
            </td>
            <td><div className="stat-cell"><Users size={14} /> {company.staffCount}</div></td>
            <td>{company.leads.toLocaleString()}</td>
            <td>{company.deals}</td>
            <td>{getStatusBadge(company.status)}</td>
            <td>
              <div className="action-buttons">
                <button className="action-btn" title="View" onClick={() => onView(company)}><Eye size={14} /></button>
                <button className="action-btn" title="Edit" onClick={() => onEdit(company)}><Edit2 size={14} /></button>
                <button className="action-btn delete" title="Delete" onClick={() => onDelete(company.companyId)}><Trash2 size={14} /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CompaniesTable;
