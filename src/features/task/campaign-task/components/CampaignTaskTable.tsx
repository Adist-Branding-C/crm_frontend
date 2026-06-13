import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import CampaignTaskTableRow from './CampaignTaskTableRow';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import { LABEL_SHOW, LABEL_ENTRIES, LABEL_FIRST, LABEL_LAST, LABEL_PAGE, LABEL_OF, LABEL_SHOWING, LABEL_TO } from '../../../../shared/constants/labels';
import type { CampaignTaskTableProps } from '../types/campaign-task-table.types';

const CampaignTaskTable = ({
  data,
  searchQuery,
  onSearchChange,
  dropdownOpen,
  onToggleDropdown,
  onEdit,
  onDelete,
  onAdd,
  addLabel,
  page,
  limit,
  totalPages,
  totalItems,
  handlePageChange,
  handleLimitChange,
}: CampaignTaskTableProps) => {
  const startIndex = (page - 1) * limit;

  return (
    <div className="table-container">
      <div className="table-header-controls">
        <div className="entries-select">
          <label>
            {LABEL_SHOW}
            <select value={limit} onChange={(e) => handleLimitChange(Number(e.target.value))}>
              {ROWS_OPTIONS_10_25_50_100.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            {LABEL_ENTRIES}
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
              <CampaignTaskTableRow
                key={item.id}
                item={item}
                index={index}
                dropdownOpen={dropdownOpen}
                onToggleDropdown={onToggleDropdown}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <div className="table-info">
          {LABEL_SHOWING} {Math.min(startIndex + 1, totalItems)} {LABEL_TO} {Math.min(startIndex + limit, totalItems)} {LABEL_OF} {totalItems} {LABEL_ENTRIES}
        </div>
        <div className="table-controls">
          {totalPages > 1 && (
            <div className="pagination-controls" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button className="pagination-btn" disabled={page === 1} onClick={() => handlePageChange(1)}>{LABEL_FIRST}</button>
              <button className="pagination-btn" disabled={page === 1} onClick={() => handlePageChange(page - 1)}><ChevronLeft size={16} /></button>
              <span className="page-indicator">{LABEL_PAGE} {page} {LABEL_OF} {totalPages}</span>
              <button className="pagination-btn" disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}><ChevronRight size={16} /></button>
              <button className="pagination-btn" disabled={page === totalPages} onClick={() => handlePageChange(totalPages)}>{LABEL_LAST}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignTaskTable;
