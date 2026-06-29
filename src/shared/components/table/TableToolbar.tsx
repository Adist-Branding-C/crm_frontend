import { Plus, Search } from 'lucide-react';
import { ROWS_OPTIONS_10_25_50_100 } from '../../constants/pagination';

interface TableToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  onAdd?: () => void;
  addLabel?: string;
}

const TableToolbar = ({ searchQuery, onSearchChange, rowsPerPage, onRowsPerPageChange, onAdd, addLabel }: TableToolbarProps) => (
  <div className="table-header-controls">
    <div className="entries-select">
      <label>Show
        <select value={rowsPerPage} onChange={(e) => onRowsPerPageChange(Number(e.target.value))}>
          {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        entries
      </label>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div className="search-input">
        <Search size={16} />
        <input type="search" placeholder="Search" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
      </div>
      {onAdd && (
        <button className="btn btn-primary" onClick={onAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> {addLabel || 'Add'}
        </button>
      )}
    </div>
  </div>
);

export default TableToolbar;
