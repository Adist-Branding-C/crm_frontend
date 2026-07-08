import type { ReactNode } from 'react';
import { Search } from 'lucide-react';
import { LABEL_SHOW, LABEL_ENTRIES } from '../../constants/labels';
import { ROWS_OPTIONS_10_25_50_100 } from '../../constants/pagination';

interface TableNavProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  rowsPerPage?: number;
  rowsOptions?: readonly number[];
  onRowsPerPageChange?: (rows: number) => void;
  children?: ReactNode;
}

const TableNav = ({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search',
  rowsPerPage,
  rowsOptions = ROWS_OPTIONS_10_25_50_100,
  onRowsPerPageChange,
  children,
}: TableNavProps) => (
  <div className="table-header-controls">
    {onRowsPerPageChange && (
      <div className="entries-select">
        <label>
          {LABEL_SHOW}
          <select value={rowsPerPage} onChange={(e) => onRowsPerPageChange(Number(e.target.value))}>
            {rowsOptions.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {LABEL_ENTRIES}
        </label>
      </div>
    )}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div className="search-input">
        <Search size={16} />
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {children}
    </div>
  </div>
);

export default TableNav;
