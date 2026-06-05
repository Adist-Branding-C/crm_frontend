import { Search } from 'lucide-react';
import BranchActionMenu from './BranchActionMenu';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import type { BranchItem } from '../types/branch.types';

interface BranchTableProps {
  data: BranchItem[]
  searchQuery: string
  onSearchChange: (value: string) => void
  rowsPerPage: number
  onRowsPerPageChange: (value: number) => void
  totalRecords: number
  dropdownOpen: number | null
  onToggleDropdown: (value: number | null) => void
  onEdit: (item: BranchItem) => void
  onDelete: (item: BranchItem) => void
}

const BranchTable = ({ data, searchQuery, onSearchChange, rowsPerPage, onRowsPerPageChange, totalRecords, dropdownOpen, onToggleDropdown, onEdit, onDelete }: BranchTableProps) => {
  return (
    <div className="table-container">
      <div className="table-header-controls">
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
      <div className="table-scroll">
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
      <div className="table-footer">
        <div className="table-info">
          Showing 1 to {Math.min(rowsPerPage, totalRecords)} of {totalRecords} entries
        </div>
      </div>
    </div>
  );
};

export default BranchTable;
