import { Plus } from 'lucide-react';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../../shared/components/table';
import CallTaskRow from './CallTaskRow';
import type { CallTaskTableProps } from '../types/index';

const CallTaskTable = ({
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
}: CallTaskTableProps) => {
  const startIndex = (currentPage - 1) * rowsPerPage;

  return (
    <>
      <TableNav searchQuery={searchQuery} onSearchChange={onSearchChange} searchPlaceholder="Search call tasks...">
        <button className="btn btn-primary" onClick={onAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> Add Call Task
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
              <CallTaskRow
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

export default CallTaskTable;
