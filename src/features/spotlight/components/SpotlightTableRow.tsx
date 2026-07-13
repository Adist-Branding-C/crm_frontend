import { memo } from 'react';
import { MoreHorizontal, Eye } from 'lucide-react';
import { TRow, TCell } from '../../../shared/components/table';
import type { SpotlightTableRowProps } from '../types';
import { formatDateTime, formatFollowUpDate } from '../../../shared/utils/dateUtils';

const SpotlightTableRow = memo(
  ({
    row,
    isSelected,
    isMenuOpen,
    onSelectRow,
    onToggleMenu,
    onViewLead,
  }: SpotlightTableRowProps) => (
    <TRow className={isSelected ? 'selected' : ''}>
      <TCell>
        <input
          type="checkbox"
          aria-label={`Select ${row.name}`}
          checked={isSelected}
          onChange={() => onSelectRow(row.id)}
        />
      </TCell>
      <TCell className="action-cell">
        <div className="action-menu-container">
          <button
            className="action-btn"
            aria-label={`Actions for ${row.name}`}
            onClick={() => onToggleMenu(!isMenuOpen)}
          >
            <MoreHorizontal size={16} />
          </button>
          {isMenuOpen && (
            <div className="action-dropdown">
              <button onClick={() => onViewLead(row)}>
                <Eye size={14} /> View
              </button>
            </div>
          )}
        </div>
      </TCell>
      <TCell className="lead-name-cell" onClick={() => onViewLead(row)}>
        {row.name}
      </TCell>
      <TCell>{row.phone}</TCell>
      <TCell>{row.assignedTo}</TCell>
      <TCell>{row.purpose}</TCell>
      <TCell>
        <span
          className={`badge badge-${(row.type || '').toLowerCase().replace(' ', '-')}`}
        >
          {row.type || 'N/A'}
        </span>
      </TCell>
      <TCell>
        <span className={`badge badge-${(row.status || '').toLowerCase()}`}>
          {row.status || 'N/A'}
        </span>
      </TCell>
      <TCell>{row.source}</TCell>
      <TCell>{formatDateTime(row.createdAt)}</TCell>
      <TCell>{formatDateTime(row.updatedAt)}</TCell>
      <TCell>{formatFollowUpDate(row.nextFollowUp)}</TCell>
    </TRow>
  ),
);

SpotlightTableRow.displayName = 'SpotlightTableRow';

export default SpotlightTableRow;
