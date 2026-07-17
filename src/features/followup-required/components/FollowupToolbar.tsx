import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import {
  ACTION_FILTER,
  ACTION_SEARCH,
} from '../../../shared/constants/actionLabels';
import { SORT_OPTIONS } from '../constants';
import type { FollowupToolbarProps } from '../types';

const FollowupToolbar: React.FC<FollowupToolbarProps> = ({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  sortConfig,
  onSort,
  showSortDropdown,
  onToggleSortDropdown,
}) => (
  <div className="enquiries-toolbar">
    <div className="toolbar-left">
      <div className="search-box">
        <Search size={16} className="search-icon" aria-hidden="true" />
        <input
          type="text"
          aria-label={ACTION_SEARCH}
          placeholder={ACTION_SEARCH}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <button
        className="btn btn-secondary"
        aria-expanded={showFilters}
        aria-haspopup="true"
        onClick={onToggleFilters}
      >
        <Filter size={16} />
        {ACTION_FILTER}
        <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
      </button>
      <div className="dropdown-container">
        <button
          className="btn btn-secondary"
          aria-expanded={showSortDropdown}
          aria-haspopup="true"
          onClick={onToggleSortDropdown}
        >
          Sort By
          <ChevronDown size={14} />
        </button>
        {showSortDropdown && (
          <div className="sort-dropdown">
            {SORT_OPTIONS.map((option) => (
              <button key={option.key} onClick={() => onSort(option.key)}>
                {option.label}{' '}
                {sortConfig.key === option.key &&
                  (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default FollowupToolbar;
