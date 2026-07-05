import { useMemo } from 'react';
import { DataTable } from '../../../../shared/components/table';
import WhatsappTemplateActions from './WhatsappTemplateActions';
import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { WhatsappTemplateItem, WhatsappTemplateTableProps } from '../types';
import type { Column } from '../../../../shared/components/table';

const WhatsappTemplateTable = ({
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
}: WhatsappTemplateTableProps) => {
  const columns: Column<WhatsappTemplateItem>[] = useMemo(() => [
    { header: 'Sl No' },
    { header: 'Template Name', accessor: 'templateName' },
    { header: 'Message', accessor: 'message' },
    {
      header: 'Status',
      render: (row) => <SettingsStatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <WhatsappTemplateActions
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
      addLabel="Add WhatsApp Template"
    />
  );
};

export default WhatsappTemplateTable;
