import { Search, Filter, ChevronDown } from 'lucide-react';
import {
  ACTION_FILTER,
  ACTION_SEARCH,
} from '../../constants/actionLabels';
import type { SortConfig } from '../../types/sort';

export interface SortOption {
  key: string;
  label: string;
}

interface ListToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  showSortDropdown: boolean;
  onToggleSortDropdown: () => void;
  sortOptions: SortOption[];
}

/**
 * Search + filter-toggle + sort-dropdown toolbar for a sortable/filterable
 * list page. The same search/filter/sort markup (the `enquiries-toolbar` CSS
 * class) is also hand-rolled today in SpotlightToolbar, DealsToolbar, and
 * CompaniesToolbar; this is the shared version any of those can move to.
 *
 * Used by:
 * - features/followup-required/pages/FollowupRequiredPage directly
 *   (sortOptions is the only feature-specific bit - a plain constant, not
 *   worth its own wrapper component).
 */
const ListToolbar = ({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  sortConfig,
  onSort,
  showSortDropdown,
  onToggleSortDropdown,
  sortOptions,
}: ListToolbarProps) => (
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
            {sortOptions.map((option) => (
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

export default ListToolbar;
