import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import MeetingOutcomeActions from './MeetingOutcomeActions';
import SettingsStatusBadge from '../../../../shared/components/settings/SettingsStatusBadge';
import type { MeetingOutcomeItem, MeetingOutcomeTableProps } from '../types/index';
import type { Column } from '../../../../shared/components/table';

const MeetingOutcomeTable = ({
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
}: MeetingOutcomeTableProps) => {
  const columns: Column<MeetingOutcomeItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Outcome', accessor: 'name' },
    {
      header: 'Status',
      render: (row) => <SettingsStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <MeetingOutcomeActions
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
      addLabel="Add Outcome"
    />
  );
};

export default MeetingOutcomeTable;
