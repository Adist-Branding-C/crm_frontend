import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import CheckoutNoteActions from './CheckoutNoteActions';
import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { CheckoutNoteItem, CheckoutNoteTableProps } from '../types';
import type { Column } from '../../../../shared/components/table';

const CheckoutNoteTable = ({
  data,
  searchQuery,
  onSearchChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalRecords,
  currentPage,
  totalPages,
  onPageChange,
  dropdownOpen,
  onToggleDropdown,
  onEdit,
  onDelete,
  onAdd,
}: CheckoutNoteTableProps) => {
  const columns: Column<CheckoutNoteItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Title', accessor: 'title' },
    { header: 'Note', accessor: 'note' },
    {
      header: 'Status',
      render: (row) => <SettingsStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <CheckoutNoteActions
          item={row}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ], [dropdownOpen, onToggleDropdown, onEdit, onDelete]);

  return (
    <DataTable
      columns={columns}
      data={data}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      totalRecords={totalRecords}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      {...(onAdd ? { onAdd } : {})}
      addLabel="Add Checkout Note"
    />
  );
};

export default CheckoutNoteTable;
