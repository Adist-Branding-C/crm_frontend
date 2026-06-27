import React from 'react';
import { Search, Plus } from 'lucide-react';
import { ROWS_OPTIONS_10_25_50_100 } from '../../constants/pagination';
import { LABEL_SHOW, LABEL_ENTRIES } from '../../constants/labels';
import { ACTION_SEARCH } from '../../constants/actionLabels';
import type { AdminToolbarProps } from '../../types/crud';

const AdminToolbar: React.FC<AdminToolbarProps> = React.memo(({
  searchQuery,
  onSearchChange,
  onAdd,
  addLabel,
  showAddButton = true,
  rowsPerPage,
  onRowsPerPageChange,
}) => (
  <div className="table-header-controls">
    <div className="entries-select">
      <label>
        {LABEL_SHOW}
        <select value={rowsPerPage} onChange={onRowsPerPageChange}>
          {ROWS_OPTIONS_10_25_50_100.map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        {LABEL_ENTRIES}
      </label>
    </div>
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <div className="search-input">
        <Search size={16} />
        <input
          type="search"
          placeholder={ACTION_SEARCH}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {showAddButton && (
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={16} /> {addLabel}
        </button>
      )}
    </div>
  </div>
));

AdminToolbar.displayName = 'AdminToolbar';
export default AdminToolbar;