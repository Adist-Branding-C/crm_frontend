import { Search } from 'lucide-react';
import CallStatusActions from './CallStatusActions';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import type { CallStatusTableProps } from '../types/callStatus.types';

const CallStatusTable = ({
  data,
  searchQuery,
  onSearchChange,
  rowsPerPage,
  onRowsPerPageChange,
  totalRecords,
  dropdownOpen,
  onToggleDropdown,
  onEdit,
  onDelete,
}: CallStatusTableProps) => {
  return (
    <div className="table-container">
      <div className="table-header-controls">
        <div className="entries-select">
          <label>Show
            <select value={rowsPerPage} onChange={(e) => onRowsPerPageChange(Number(e.target.value))}>
              {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
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
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="dataTables_empty">No data available in table</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name || '-'}</td>
                  <td>
                    <span className={'status-badge status-' + (item.status || 'Active').toLowerCase()}>
                      {item.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <CallStatusActions
                      item={item}
                      dropdownOpen={dropdownOpen}
                      onToggleDropdown={onToggleDropdown}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </td>
                </tr>
              ))
            )}
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

export default CallStatusTable;
