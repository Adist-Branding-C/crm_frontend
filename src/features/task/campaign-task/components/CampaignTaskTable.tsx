import { Search, Plus } from 'lucide-react';
import CampaignTaskActionMenu from './CampaignTaskActionMenu';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import type { CampaignTaskTableProps } from '../types/campaign-task-table.types';

const CampaignTaskTable = ({
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
  onAdd,
  addLabel,
}: CampaignTaskTableProps) => {
  return (
    <div className="table-container">
      <div className="table-header-controls">
        <div className="entries-select">
          <label>
            Show
            <select value={rowsPerPage} onChange={(e) => onRowsPerPageChange(Number(e.target.value))}>
              {ROWS_OPTIONS_10_25_50_100.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            entries
          </label>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div className="search-input">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search campaign tasks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={onAdd}>
            <Plus size={16} /> {addLabel}
          </button>
        </div>
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Title</th>
              <th>Campaign</th>
              <th>Type</th>
              <th>Scheduled Date</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.campaignName || '-'}</td>
                <td>{item.campaignType || '-'}</td>
                <td>{item.scheduledDate || '-'}</td>
                <td>{item.assignedTo || '-'}</td>
                <td>
                  <span className={`status-badge status-${(item.status || '').toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <CampaignTaskActionMenu
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

export default CampaignTaskTable;
