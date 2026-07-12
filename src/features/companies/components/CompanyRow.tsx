import { Eye, Edit2, Trash2, Building, User, Mail, Phone, Users } from 'lucide-react';
import { TRow, TCell } from '../../../shared/components/table';
import CompanyStatusBadge from './CompanyStatusBadge';
import type { CompanyRowProps } from '../types';

const CompanyRow = ({ company, isSelected, onSelectRow, onView, onEdit, onDelete }: CompanyRowProps) => (
  <TRow className={isSelected ? 'selected' : ''}>
    <TCell><input type="checkbox" checked={isSelected} onChange={() => onSelectRow(company.companyId)} /></TCell>
    <TCell>
      <div className="company-name-cell">
        <Building size={16} className="company-icon" />
        <div>
          <div className="company-name">{company.name}</div>
          <div className="company-date">Since {company.createdAt}</div>
        </div>
      </div>
    </TCell>
    <TCell>
      <div className="contact-cell">
        <div><User size={12} /> {company.contactPersonName}</div>
        <div><Mail size={12} /> {company.email}</div>
        <div><Phone size={12} /> {company.phone}</div>
      </div>
    </TCell>
    <TCell><div className="stat-cell"><Users size={14} /> {company.staffCount}</div></TCell>
    <TCell>{company.leads.toLocaleString()}</TCell>
    <TCell>{company.deals}</TCell>
    <TCell><CompanyStatusBadge status={company.status} /></TCell>
    <TCell>
      <div className="action-buttons">
        <button className="action-btn" title="View" onClick={() => onView(company)}><Eye size={14} /></button>
        <button className="action-btn" title="Edit" onClick={() => onEdit(company)}><Edit2 size={14} /></button>
        <button className="action-btn delete" title="Delete" onClick={() => onDelete(company.companyId)}><Trash2 size={14} /></button>
      </div>
    </TCell>
  </TRow>
);

export default CompanyRow;
