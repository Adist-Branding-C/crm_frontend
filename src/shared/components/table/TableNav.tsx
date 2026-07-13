import type { ChangeEvent, ReactNode } from 'react';
import { Search } from 'lucide-react';
import { ROWS_OPTIONS_10_25_50_100 } from '../../constants/pagination';
import { LABEL_SHOW, LABEL_ENTRIES } from '../../constants/labels';
import { ACTION_SEARCH } from '../../constants/actionLabels';

interface TableNavProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  rowsPerPage: number;
  onRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children?: ReactNode;
}

const TableNav = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  rowsPerPage,
  onRowsPerPageChange,
  children,
}: TableNavProps) => (
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
          placeholder={searchPlaceholder ?? ACTION_SEARCH}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {children}
    </div>
  </div>
);

export default TableNav;
