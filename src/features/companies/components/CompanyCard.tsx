import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CompanyStatus } from '../../../shared/constants/enums/companyStatus';
import type { Company } from '../types';

interface CompanyCardProps {
  company: Company;
  disabled?: boolean;
  onClick: () => void;
}

const AVATAR_PALETTE_SIZE = 6;

const avatarToneFor = (companyId: string) => {
  let hash = 0;
  for (let i = 0; i < companyId.length; i += 1) {
    hash = (hash + companyId.charCodeAt(i)) % AVATAR_PALETTE_SIZE;
  }
  return hash;
};

const CompanyCard: React.FC<CompanyCardProps> = ({ company, disabled, onClick }) => {
  const isActive = company.status === CompanyStatus.ACTIVE;
  return (
    <button
      type="button"
      className="company-card"
      disabled={disabled}
      onClick={onClick}
      aria-label={`Enter ${company.name}`}
    >
      <span className={`company-card-logo company-card-logo--${avatarToneFor(company.companyId)}`}>
        {company.name.charAt(0).toUpperCase()}
      </span>
      <span className="company-card-body">
        <span className="company-card-name">{company.name}</span>
        <span className={`company-card-status ${isActive ? 'is-active' : 'is-inactive'}`}>
          {isActive && <span className="company-card-status-dot" aria-hidden="true" />}
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </span>
      <ChevronRight size={16} className="company-card-icon" />
    </button>
  );
};

export default CompanyCard;