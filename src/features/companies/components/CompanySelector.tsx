import React from 'react';
import { Building, Search, Loader2 } from 'lucide-react';
import { useCompanySelector } from '../hooks/useCompanySelector';
import CompanyCard from './CompanyCard';
import type { Company } from '../types';
import './CompanySelector.css';

interface CompanySelectorProps {
  isSwitching: boolean;
  error?: string;
  onSelectCompany: (company: Company) => void;
}

const SCROLL_THRESHOLD = 160;

const CompanySelector: React.FC<CompanySelectorProps> = ({ isSwitching, error, onSelectCompany }) => {
  const {
    companies,
    isLoading,
    isLoadingMore,
    searchValue,
    handleSearchChange,
    loadMore,
  } = useCompanySelector();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD) {
      loadMore();
    }
  };

  return (
    <div className="company-selector">
      <div className="company-selector-heading">
        <h2>Select company</h2>
        <p>Choose the workspace you want to work in</p>
      </div>

      <div className="company-selector-search">
        <Search size={16} />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search companies"
          aria-label="Search companies"
        />
      </div>

      {error && <p className="company-selector-error">{error}</p>}

      <div className="company-selector-list" onScroll={handleScroll}>
        {companies.map(company => (
          <CompanyCard
            key={company.companyId}
            company={company}
            disabled={isSwitching}
            onClick={() => onSelectCompany(company)}
          />
        ))}

        {isLoading && (
          <div className="company-selector-state">
            <Loader2 size={20} className="spin" />
            <span>Loading companies…</span>
          </div>
        )}

        {isLoadingMore && (
          <div className="company-selector-state">
            <Loader2 size={20} className="spin" />
            <span>Loading more…</span>
          </div>
        )}

        {!isLoading && companies.length === 0 && (
          <div className="company-selector-state">
            <Building size={20} />
            <span>No companies found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanySelector;