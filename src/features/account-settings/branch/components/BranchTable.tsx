import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import BranchActionMenu from './BranchActionMenu';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import type { BranchTableProps } from '../types/branch-table.types';

const BranchTable = ({ data, searchQuery, onSearchChange, rowsPerPage, onRowsPerPageChange, totalRecords, pageNumber, onPageChange, dropdownOpen, onToggleDropdown, onEdit, onDelete }: BranchTableProps) => {
  const startEntry = totalRecords === 0 ? 0 : (pageNumber - 1) * rowsPerPage + 1;
  const endEntry = Math.min(pageNumber * rowsPerPage, totalRecords);
  const totalPages = Math.ceil(totalRecords / rowsPerPage) || 1;

  return (
    <div className="table-container">
      <div className="table-header-controls flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="entries-select">
          <label>Show
            <select value={rowsPerPage} onChange={(e) => onRowsPerPageChange(Number(e.target.value))}>
              {ROWS_OPTIONS_10_25_50_100.map((n: number) => <option key={n} value={n}>{n}</option>)}
            </select>
            entries
          </label>
        </div>
        <div className="search-input">
          <Search size={16} />
          <input type="search" placeholder="Search" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
        </div>
      </div>
      <div className="table-scroll overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Branch Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name || item.branchName}</td>
                <td>{item.description || '-'}</td>
                <td>
                  <span className={'status-badge status-' + (item.status || 'Active').toLowerCase()}>
                    {item.status || 'Active'}
                  </span>
                </td>
                <td>
                  <BranchActionMenu
                    item={item}
                    dropdownOpen={dropdownOpen}
                    onToggleDropdown={onToggleDropdown}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="table-info">
          Showing {startEntry} to {endEntry} of {totalRecords} entries
        </div>
        <div className="pagination">
          <button className="pagination-btn" disabled={pageNumber <= 1} onClick={() => onPageChange(pageNumber - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {pageNumber} of {totalPages}</span>
          <button className="pagination-btn" disabled={pageNumber >= totalPages} onClick={() => onPageChange(pageNumber + 1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchTable;
