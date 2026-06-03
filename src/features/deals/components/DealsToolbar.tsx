import React from 'react';
import { Search, Filter, ChevronDown, ArrowUp, ArrowDown, Plus, Download, SortAsc, SortDesc, Check } from 'lucide-react';
import type { DealsToolbarProps } from '../types';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';

const DealsToolbar: React.FC<DealsToolbarProps> = ({
  searchQuery, onSearchChange, showFilters, onToggleFilters,
  sortConfig, onSort, onSortDirection, showSortDropdown, onSetShowSortDropdown,
  onExport, onAddDeal,
}) => {
  const closeSortDropdown = () => onSetShowSortDropdown(false);

  return (
    <div className="enquiries-toolbar">
      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="btn btn-secondary" onClick={onToggleFilters}>
          <Filter size={16} />
          Filter
          <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
        <div className="dropdown-container">
          <button className="btn btn-secondary" onClick={() => onSetShowSortDropdown(!showSortDropdown)}>
            <ArrowUp size={16} />
            Sort By
            <ChevronDown size={14} className={showSortDropdown ? 'rotate' : ''} />
          </button>
          {showSortDropdown && (
            <div className="premium-dropdown sort-dropdown dropup">
              <div className="dropdown-header">Sort By</div>
              <button
                className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === SortDirection.DESC ? 'selected' : ''}`}
                onClick={() => { onSort('createdAt'); onSortDirection('createdAt', SortDirection.DESC); closeSortDropdown(); }}
              >
                <ArrowUp size={16} />
                <span>Newest First</span>
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === SortDirection.ASC ? 'selected' : ''}`}
                onClick={() => { onSort('createdAt'); onSortDirection('createdAt', SortDirection.ASC); closeSortDropdown(); }}
              >
                <ArrowDown size={16} />
                <span>Oldest First</span>
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'amount' && sortConfig.direction === SortDirection.DESC ? 'selected' : ''}`}
                onClick={() => { onSort('amount'); onSortDirection('amount', SortDirection.DESC); closeSortDropdown(); }}
              >
                <ArrowUp size={16} />
                <span>Highest Amount</span>
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'amount' && sortConfig.direction === SortDirection.ASC ? 'selected' : ''}`}
                onClick={() => { onSort('amount'); onSortDirection('amount', SortDirection.ASC); closeSortDropdown(); }}
              >
                <ArrowDown size={16} />
                <span>Lowest Amount</span>
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'startDate' && sortConfig.direction === SortDirection.DESC ? 'selected' : ''}`}
                onClick={() => { onSort('startDate'); onSortDirection('startDate', SortDirection.DESC); closeSortDropdown(); }}
              >
                <ArrowUp size={16} />
                <span>Start Date (Newest)</span>
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'startDate' && sortConfig.direction === SortDirection.ASC ? 'selected' : ''}`}
                onClick={() => { onSort('startDate'); onSortDirection('startDate', SortDirection.ASC); closeSortDropdown(); }}
              >
                <ArrowDown size={16} />
                <span>Start Date (Oldest)</span>
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'dealName' && sortConfig.direction === SortDirection.ASC ? 'selected' : ''}`}
                onClick={() => { onSort('dealName'); onSortDirection('dealName', SortDirection.ASC); closeSortDropdown(); }}
              >
                <ArrowDown size={16} />
                <span>Name (A-Z)</span>
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'dealName' && sortConfig.direction === SortDirection.DESC ? 'selected' : ''}`}
                onClick={() => { onSort('dealName'); onSortDirection('dealName', SortDirection.DESC); closeSortDropdown(); }}
              >
                <ArrowUp size={16} />
                <span>Name (Z-A)</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="toolbar-right">
        <button className="btn btn-secondary" onClick={onExport}>
          <Download size={16} />
          Export
        </button>
        <button className="btn btn-primary" onClick={onAddDeal}>
          <Plus size={16} />
          Deals
        </button>
      </div>
    </div>
  );
};

DealsToolbar.displayName = 'DealsToolbar';
export default DealsToolbar;
