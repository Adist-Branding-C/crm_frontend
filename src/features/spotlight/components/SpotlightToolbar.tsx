import React from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  SortAsc,
  SortDesc,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Check,
  Download,
} from 'lucide-react';
import type { SpotlightToolbarProps } from '../types';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';

const SpotlightToolbar: React.FC<SpotlightToolbarProps> = ({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  sortConfig,
  onSelectSort,
  showSortDropdown,
  onToggleSortDropdown,
  onExport,
  isExporting,
}) => {
  return (
    <div className="table-header-controls">
      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search spotlight..."
            aria-label="Search spotlight leads"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
        <button
          className="btn btn-secondary"
          onClick={onToggleFilters}
          aria-label="Toggle filters"
        >
          <Filter size={16} /> Filter{' '}
          <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
        <div className="dropdown-container">
          <button
            className={`btn btn-secondary ${showSortDropdown ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSortDropdown();
            }}
            aria-label="Sort by"
          >
            <SortDesc size={16} /> Sort By{' '}
            <ChevronDown
              size={14}
              className={showSortDropdown ? 'rotate' : ''}
            />
          </button>
          {showSortDropdown && (
            <div className="premium-dropdown sort-dropdown">
              <div className="dropdown-header">Sort By</div>
              <button
                className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === SortDirection.DESC ? 'selected' : ''}`}
                onClick={() => onSelectSort('createdAt', SortDirection.DESC)}
              >
                <SortDesc size={16} /> <span>Newest First</span>
                {sortConfig.key === 'createdAt' &&
                  sortConfig.direction === SortDirection.DESC && (
                    <Check size={14} className="check-icon" />
                  )}
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === SortDirection.ASC ? 'selected' : ''}`}
                onClick={() => onSelectSort('createdAt', SortDirection.ASC)}
              >
                <SortAsc size={16} /> <span>Oldest First</span>
                {sortConfig.key === 'createdAt' &&
                  sortConfig.direction === SortDirection.ASC && (
                    <Check size={14} className="check-icon" />
                  )}
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === SortDirection.DESC ? 'selected' : ''}`}
                onClick={() => onSelectSort('updatedAt', SortDirection.DESC)}
              >
                <SortDesc size={16} /> <span>Updated Date</span>
                {sortConfig.key === 'updatedAt' &&
                  sortConfig.direction === SortDirection.DESC && (
                    <Check size={14} className="check-icon" />
                  )}
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === SortDirection.ASC ? 'selected' : ''}`}
                onClick={() => onSelectSort('updatedAt', SortDirection.ASC)}
              >
                <SortAsc size={16} /> <span>Updated (Oldest)</span>
                {sortConfig.key === 'updatedAt' &&
                  sortConfig.direction === SortDirection.ASC && (
                    <Check size={14} className="check-icon" />
                  )}
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === SortDirection.ASC ? 'selected' : ''}`}
                onClick={() => onSelectSort('name', SortDirection.ASC)}
              >
                <ArrowDownNarrowWide size={16} /> <span>Name (A-Z)</span>
                {sortConfig.key === 'name' &&
                  sortConfig.direction === SortDirection.ASC && (
                    <Check size={14} className="check-icon" />
                  )}
              </button>
              <button
                className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === SortDirection.DESC ? 'selected' : ''}`}
                onClick={() => onSelectSort('name', SortDirection.DESC)}
              >
                <ArrowUpNarrowWide size={16} /> <span>Name (Z-A)</span>
                {sortConfig.key === 'name' &&
                  sortConfig.direction === SortDirection.DESC && (
                    <Check size={14} className="check-icon" />
                  )}
              </button>
            </div>
          )}
        </div>
        <button
          className="btn btn-secondary"
          onClick={onExport}
          disabled={isExporting}
          aria-label="Export spotlight leads"
        >
          <Download size={16} /> {isExporting ? 'Exporting...' : 'Export'}
        </button>
      </div>
    </div>
  );
};

export default SpotlightToolbar;
