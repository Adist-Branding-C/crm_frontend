import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import CampaignTableRow from './CampaignTableRow';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { LABEL_ROWS_PER_PAGE, LABEL_SHOWING, LABEL_OF, LABEL_FIRST, LABEL_PAGE, LABEL_LAST } from '../../../shared/constants/labels';
import type { CampaignTableProps } from '../types/campaign-table.types';

const CampaignTable = ({
  data, columns, sortConfig, actionMenuOpen, currentPage, totalPages, totalItems, startIndex, rowsPerPage,
  onSort, onToggleActionMenu, onDelete, onEdit, onPageChange, onRowsPerPageChange,
}: CampaignTableProps) => (
  <div className="table-container">
    <table className="enquiries-table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} className={col.sortable ? 'sortable' : ''} onClick={col.sortable ? () => onSort(col.key) : undefined}>
              <>{col.label}{col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <CampaignTableRow
            key={row.id}
            row={row}
            columns={columns}
            actionMenuOpen={actionMenuOpen}
            onToggleActionMenu={onToggleActionMenu}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
    <div className="pagination-container">
      <div className="pagination-left">
        <span className="rows-label">{LABEL_ROWS_PER_PAGE}</span>
        <select value={rowsPerPage} onChange={onRowsPerPageChange} className="rows-select">
          {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <span className="pagination-info">{LABEL_SHOWING} {startIndex + 1}-{startIndex + data.length} {LABEL_OF} {totalItems}</span>
      </div>
      <div className="pagination-right">
        <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(1)}>{LABEL_FIRST}</button>
        <button className="pagination-btn" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}><ChevronLeft size={16} /></button>
        <span className="page-indicator">{LABEL_PAGE} {currentPage} {LABEL_OF} {totalPages}</span>
        <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}><ChevronRight size={16} /></button>
        <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>{LABEL_LAST}</button>
      </div>
    </div>
  </div>
);

export default CampaignTable;
