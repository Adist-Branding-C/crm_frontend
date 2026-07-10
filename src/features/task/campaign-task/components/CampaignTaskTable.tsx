import { Plus } from 'lucide-react';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../../shared/components/table';
import CampaignTaskRow from './CampaignTaskRow';
import type { CampaignTaskTableProps } from '../types/index';

const CampaignTaskTable = ({
  data,
  searchQuery,
  onSearchChange,
  currentPage,
  totalPages,
  totalRecords,
  rowsPerPage,
  onPageChange,
  dropdownOpen,
  onToggleDropdown,
  onEdit,
  onDelete,
  onAdd,
}: CampaignTaskTableProps) => {
  const startIndex = (currentPage - 1) * rowsPerPage;

  return (
    <>
      <TableNav searchQuery={searchQuery} onSearchChange={onSearchChange} searchPlaceholder="Search campaign tasks...">
        <button className="btn btn-primary" onClick={onAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> Add Campaign Task
        </button>
      </TableNav>
      <Table wrapperClassName="table-scroll" className="data-table">
        <THead>
          <TRow>
            <TCell variant="th">Sl No</TCell>
            <TCell variant="th">Title</TCell>
            <TCell variant="th">Scheduled Date</TCell>
            <TCell variant="th">Assigned To</TCell>
            <TCell variant="th">Priority</TCell>
            <TCell variant="th">Status</TCell>
            <TCell variant="th">Lead</TCell>
            <TCell variant="th">Actions</TCell>
          </TRow>
        </THead>
        <TBody>
          {data.length === 0 ? (
            <EmptyState colSpan={8} />
          ) : (
            data.map((item, idx) => (
              <CampaignTaskRow
                key={item.id}
                item={item}
                index={startIndex + idx}
                dropdownOpen={dropdownOpen}
                onToggleDropdown={onToggleDropdown}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalRecords}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default CampaignTaskTable;
