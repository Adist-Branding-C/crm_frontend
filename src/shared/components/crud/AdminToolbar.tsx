import React from 'react';
import { Search, Plus } from 'lucide-react';
import { ROWS_OPTIONS_10_25_50_100 } from '../../constants/pagination';
import type { AdminToolbarProps } from '../../types/crud';
import { LABEL_SHOW } from '../../constants/labels';

const AdminToolbar: React.FC<AdminToolbarProps> = React.memo(({ searchQuery, onSearchChange, onAdd, addLabel, rowsPerPage, onRowsPerPageChange }) => (
  <div className="table-header-controls">
    <div className="entries-select">
      <label>
        {LABEL_SHOW}
        <select value={rowsPerPage} onChange={(e) => onRowsPerPageChange && onRowsPerPageChange(e)}>
          {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        entries
      </label>
    </div>
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <div className="search-input">
        <Search size={16} />
        <input type="search" placeholder={'Search'} value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
      </div>
      {addLabel && (
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={16} /> {addLabel}
        </button>
      )}
    </div>
  </div>
));

AdminToolbar.displayName = 'AdminToolbar';
export default AdminToolbar;