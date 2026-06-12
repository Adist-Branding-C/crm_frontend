import React from 'react';
import { Search, Plus } from 'lucide-react';
import AdminTable from '../../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import { LABEL_SHOW, LABEL_ENTRIES } from '../../../../shared/constants/labels';
import { ACTION_SEARCH } from '../../../../shared/constants/actionLabels';
import type { DealTypeItem } from '../types/deal-type.types';
import type { Column } from '../../../../shared/types/crud';
import type { DealTypeTableProps } from '../types/deal-type-table.types';

const dealTypeColumns: Column<DealTypeItem>[] = [
  { key: 'name', label: 'Name' },
  {
    key: 'status',
    label: 'Status',
    render: (item: DealTypeItem) => (
      <span className={'status-badge status-' + (item.status || 'Active').toLowerCase()}>
        {item.status || 'Active'}
      </span>
    ),
  },
];

const DealTypeTable: React.FC<DealTypeTableProps> = ({
  data, searchQuery, onSearchChange, onAdd, addLabel,
  rowsPerPage, onRowsPerPageChange, startIndex,
  dropdownOpen, onToggleDropdown, onEdit, onDelete,
  page, totalPages, total, onPageChange,
}) => (
  <div className="table-container">
    <div className="table-header-controls">
      <div className="entries-select">
        <label>
          {LABEL_SHOW}
          <select value={rowsPerPage} onChange={onRowsPerPageChange}>
            {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          {LABEL_ENTRIES}
        </label>
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div className="search-input">
          <Search size={16} />
          <input type="search" placeholder={ACTION_SEARCH} value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={16} /> {addLabel}
        </button>
      </div>
    </div>
    <AdminTable data={data} columns={dealTypeColumns} startIndex={startIndex}
      dropdownOpen={dropdownOpen} onToggleDropdown={onToggleDropdown}
      onEdit={onEdit} onDelete={onDelete} />
    {/* <AdminPagination currentPage={page} totalPages={totalPages}
      startIndex={startIndex} rowsPerPage={rowsPerPage} totalItems={total}
      onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange} /> */}
  </div>
);

export default DealTypeTable;
