import React from 'react';
import { Search, Filter, ChevronDown, Plus } from 'lucide-react';
import type { CompaniesToolbarProps } from '../types';

const CompaniesToolbar: React.FC<CompaniesToolbarProps> = ({ searchQuery, onSearchChange, showFilters, onToggleFilters, onAddCompany }) => (
  <div className="enquiries-toolbar">
    <div className="toolbar-left">
      <div className="search-box">
        <Search size={16} className="search-icon" />
        <input type="text" placeholder="Search companies..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="search-input" />
      </div>
      <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={onToggleFilters}>
        <Filter size={16} /> Filter <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
      </button>
    </div>
    <div className="toolbar-right">
      <button className="btn btn-primary" onClick={onAddCompany}>
        <Plus size={16} /> Add Company
      </button>
    </div>
  </div>
);

export default CompaniesToolbar;
