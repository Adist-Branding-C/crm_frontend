import { useMemo } from 'react';
import { DataTable } from '../../../shared/components/table';
import CampaignActions from './CampaignActions';
import { formatDisplayDate } from '../utils/date.utils';
import { getCreatedByLabel } from '../utils/campaign.utils';
import type { Campaign, CampaignTableProps } from '../types';
import type { Column, DataTableProps } from '../../../shared/components/table';

const CampaignTable = ({
  data,
  searchQuery,
  onSearchChange,
  currentPage,
  totalPages,
  totalRecords,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  dropdownOpen,
  onToggleDropdown,
  onView,
  onEdit,
  onAssign,
  onDelete,
  onAdd,
  onExport,
  addLabel = 'Campaign',
}: CampaignTableProps) => {
  const columns: Column<Campaign>[] = useMemo(() => [
    { header: 'Sl No', accessor: 'slNo' },
    { header: 'Name', accessor: 'name' },
    {
      header: 'Type',
      render: (row) => <span className={`badge badge-${row.type.toLowerCase().replace(/ /g, '-')}`}>{row.type}</span>,
    },
    { header: 'Total Tasks', accessor: 'totalTasks' },
    { header: 'Completed Tasks', accessor: 'completedTasks' },
    {
      header: 'Completed %',
      render: (row) => (
        <div className="progress-cell">
          <span>{row.completedPercent}%</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${row.completedPercent}%` }} />
          </div>
        </div>
      ),
    },
    {
      header: 'Created By',
      render: (row) => <div>{getCreatedByLabel(row.createdBy)}</div>,
    },
    {
      header: 'Created At',
      render: (row) => <div>{formatDisplayDate(row.createdAt)}</div>,
    },
    {
      header: 'Actions',
      render: (row) => (
        <CampaignActions
          campaign={row}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onView={onView}
          onEdit={onEdit}
          onAssign={onAssign}
          onDelete={onDelete}
        />
      ),
    },
  ], [dropdownOpen, onToggleDropdown, onView, onEdit, onAssign, onDelete]);

  const tableProps: DataTableProps<Campaign> = {
    columns,
    data,
    searchQuery,
    onSearchChange,
    currentPage,
    totalPages,
    totalRecords,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    ...(onAdd ? { onAdd } : {}),
    ...(addLabel ? { addLabel } : {}),
    ...(onExport ? { onExport } : {}),
  };

  return <DataTable {...tableProps} />;
};

export default CampaignTable;
