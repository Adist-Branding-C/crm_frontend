import React from 'react';
import { Search, Plus } from 'lucide-react';
import AdminTable from '../../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import { LABEL_SHOW, LABEL_ENTRIES } from '../../../../shared/constants/labels';
import { ACTION_SEARCH } from '../../../../shared/constants/actionLabels';
import type { DealAdditionalField } from '../types/deal-additional-field.types';
import type { DealAdditionalFieldTableProps } from '../types/deal-additional-field-table.types';
import { ADDITIONAL_FIELD_COLUMNS } from '../types/deal-additional-field-table.types';
import DealAdditionalFieldActionMenu from './DealAdditionalFieldActionMenu';

const DealAdditionalFieldTable: React.FC<DealAdditionalFieldTableProps> = ({
  data, searchQuery, onSearchChange, onAdd, addLabel,
  rowsPerPage, onRowsPerPageChange, startIndex,
  dropdownOpen, dropdownDirection, setDropdownOpen, setDropdownDirection,
  handleEditClick, handleDeleteClick,
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
    <AdminTable data={data} columns={ADDITIONAL_FIELD_COLUMNS} startIndex={startIndex}
      dropdownOpen={null} onToggleDropdown={() => {}}
      onEdit={(item) => handleEditClick(item as unknown as DealAdditionalField)}
      onDelete={(item) => handleDeleteClick(item as unknown as DealAdditionalField)}
      renderActions={(item) => (
        <DealAdditionalFieldActionMenu item={item as unknown as DealAdditionalField}
          dropdownOpen={dropdownOpen} onToggle={setDropdownOpen}
          dropdownDirection={dropdownDirection} onDirectionChange={setDropdownDirection}
          onEdit={handleEditClick} onDelete={handleDeleteClick} />
      )} />
    {/* <AdminPagination currentPage={page} totalPages={totalPages}
      startIndex={startIndex} rowsPerPage={rowsPerPage} totalItems={total}
      onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange} /> */}
  </div>
);

export default DealAdditionalFieldTable;
