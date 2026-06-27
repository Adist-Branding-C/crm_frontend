import { Plus, Search } from 'lucide-react';
import CallReasonActions from './CallReasonActions';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import TaskSettingsPagination from '../../components/TaskSettingsPagination';
import type { CallReasonTableProps } from '../types/index';

const CallReasonTable = ({
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
}: CallReasonTableProps) => {
  const startIndex = (currentPage - 1) * rowsPerPage;

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="search-input">
            <Search size={16} />
            <input type="search" placeholder="Search" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
          </div>
          {onAdd && (
            <button className="btn btn-primary" onClick={onAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} /> Add Reason
            </button>
          )}
        </div>
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Reason</th>
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
                  <td>{startIndex + index + 1}</td>
                  <td>{item.name || '-'}</td>
                  <td>
                    <span className={'status-badge status-' + (item.status || 'Active').toLowerCase()}>
                      {item.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <CallReasonActions
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
      <TaskSettingsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        rowsPerPage={rowsPerPage}
        totalItems={totalRecords}
        onPageChange={onPageChange}
        onRowsPerPageChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        showRowsSelector={false}
      />
    </div>
  );
};

export default CallReasonTable;
