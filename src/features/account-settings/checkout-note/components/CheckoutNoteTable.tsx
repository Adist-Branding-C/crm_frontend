import { Search } from 'lucide-react';
import CheckoutNoteActionMenu from './CheckoutNoteActionMenu';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import type { CheckoutNoteTableProps } from '../types/checkout-note-table.types';

const NOTE_TRUNCATE_LENGTH = 80;

const truncate = (text: string | undefined, maxLength: number) => {
  if (!text) return '-';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const CheckoutNoteTable = ({ data, searchQuery, onSearchChange, rowsPerPage, onRowsPerPageChange, totalRecords, dropdownOpen, onToggleDropdown, onEdit, onDelete }: CheckoutNoteTableProps) => {
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
              <th>Title</th>
              <th>Check-out Note</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="dataTables_empty">No data available in table</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.title || '-'}</td>
                  <td>{truncate(item.note, NOTE_TRUNCATE_LENGTH)}</td>
                  <td>
                    <span className={'status-badge status-' + (item.status || 'Active').toLowerCase()}>
                      {item.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <CheckoutNoteActionMenu
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

export default CheckoutNoteTable;
