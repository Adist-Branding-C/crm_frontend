import TableToolbar from './TableToolbar';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TablePagination from './TablePagination';
import type { DataTableProps } from './types';

const DataTable = <T extends { id: number | string }>({
  columns,
  data,
  keyExtractor = (row) => row.id,
  searchQuery,
  onSearchChange,
  onAdd,
  addLabel,
  currentPage,
  totalPages,
  totalRecords,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  emptyMessage,
}: DataTableProps<T>) => {
  const startIndex = (currentPage - 1) * rowsPerPage;

  return (
    <div className="table-container">
      <TableToolbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        {...(onAdd ? { onAdd } : {})}
        {...(addLabel ? { addLabel } : {})}
      />
      <div className="table-scroll">
        <table className="data-table">
          <TableHeader columns={columns} />
          <TableBody
            columns={columns}
            data={data}
            startIndex={startIndex}
            keyExtractor={keyExtractor}
            {...(emptyMessage ? { emptyMessage } : {})}
          />
        </table>
      </div>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default DataTable;
