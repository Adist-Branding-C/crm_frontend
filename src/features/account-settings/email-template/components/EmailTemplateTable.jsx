import { Search } from 'lucide-react';
import EmailTemplateActionMenu from './EmailTemplateActionMenu';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';

const EmailTemplateTable = ({ data, searchQuery, onSearchChange, rowsPerPage, onRowsPerPageChange, totalRecords, dropdownOpen, onToggleDropdown, onEdit, onDelete }) => {
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
              <th>Template Name</th>
              <th>Subject</th>
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
                  <td>{item.templateName || item.title || '-'}</td>
                  <td>{item.subject || '-'}</td>
                  <td>
                    <span className={'status-badge status-' + (item.status || 'Active').toLowerCase()}>
                      {item.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <EmailTemplateActionMenu
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

export default EmailTemplateTable;
