import React from 'react';
import type { ChangeEvent } from 'react';
import type { Column } from '../../types/crud';
import AdminToolbar from '../crud/AdminToolbar';
import AdminTable from '../crud/AdminTable';
import AdminPagination from '../crud/AdminPagination';

export interface SettingsTableLayoutProps<T extends { id: number }> {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onAdd: () => void;
  addLabel: string;
  data: T[];
  columns: Column<T>[];
  startIndex: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function SettingsTableLayoutInner<T extends { id: number }>(props: SettingsTableLayoutProps<T>) {
  const {
    searchQuery, onSearchChange, onAdd, addLabel,
    data, columns, startIndex, dropdownOpen, onToggleDropdown, onEdit, onDelete,
    currentPage, totalPages, rowsPerPage, totalItems, onPageChange, onRowsPerPageChange,
  } = props;

  return (
    <div className="table-container">
      <AdminToolbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onAdd={onAdd}
        addLabel={addLabel}
      />
      <AdminTable
        data={data}
        columns={columns}
        startIndex={startIndex}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        rowsPerPage={rowsPerPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
}

const SettingsTableLayout = React.memo(SettingsTableLayoutInner) as typeof SettingsTableLayoutInner;
export default SettingsTableLayout;
