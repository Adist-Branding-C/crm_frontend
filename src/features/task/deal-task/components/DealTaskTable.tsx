import { Plus } from 'lucide-react';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../../shared/components/table';
import DealTaskActions from './DealTaskActions';
import type { DealTaskItem, DealTaskTableProps } from '../types/index';

const DealTaskTable = ({
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
}: DealTaskTableProps) => {
  const startIndex = (currentPage - 1) * rowsPerPage;

  return (
    <>
      <TableNav searchQuery={searchQuery} onSearchChange={onSearchChange} searchPlaceholder="Search deal tasks...">
        <button className="btn btn-primary" onClick={onAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> Add Deal Task
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
              <TRow key={item.id}>
                <TCell>{startIndex + idx + 1}</TCell>
                <TCell>{item.title}</TCell>
                <TCell>{item.scheduledDate}</TCell>
                <TCell>{item.assignedTo?.name ?? '-'}</TCell>
                <TCell><span className={`status-badge status-${(item.priority || '').toLowerCase()}`}>{item.priority || '-'}</span></TCell>
                <TCell><span className={`status-badge status-${(item.status || '').toLowerCase()}`}>{item.status}</span></TCell>
                <TCell>{item.lead?.name ?? '-'}</TCell>
                <TCell>
                  <DealTaskActions
                    item={item}
                    dropdownOpen={dropdownOpen}
                    onToggleDropdown={onToggleDropdown}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TCell>
              </TRow>
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

export default DealTaskTable;
