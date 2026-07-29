import { memo, useState } from 'react';
import { MoreHorizontal, Eye } from 'lucide-react';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import { TRow, TCell } from '../../../shared/components/table';
import type { SpotlightTableRowProps } from '../types';
import { formatDateTime, formatFollowUpDateOnly } from '../../../shared/utils/dateUtils';

const SpotlightTableRow = memo(
  ({
    row,
    isSelected,
    isMenuOpen,
    onSelectRow,
    onToggleMenu,
    onViewLead,
  }: SpotlightTableRowProps) => {
    const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);

    return (
      <TRow className={isSelected ? 'selected' : ''}>
        <TCell className="action-cell">
          <div className="action-menu-container">
            <button
              className="action-btn"
              aria-label={`Actions for ${row.name}`}
              onClick={(e) => {
                if (!isMenuOpen) {
                  setButtonRect(e.currentTarget.getBoundingClientRect());
                }
                onToggleMenu(!isMenuOpen);
              }}
            >
              <MoreHorizontal size={16} />
            </button>
            {isMenuOpen && buttonRect && (
              <ActionDropdownPortal
                isOpen={isMenuOpen}
                buttonRect={buttonRect}
                onClose={() => onToggleMenu(false)}
              >
                <button onClick={() => { onViewLead(row); onToggleMenu(false); }} className="whatsapp">
                  <Eye size={14} /> View Details
                </button>
              </ActionDropdownPortal>
            )}
          </div>
        </TCell>
      <TCell className="lead-name-cell" onClick={() => onViewLead(row)}>
        {row.name}
      </TCell>
      <TCell>{row.phone}</TCell>
      <TCell>{row.assignedStaff?.name || 'Unassigned'}</TCell>
      <TCell>{row.purpose?.purpose || 'N/A'}</TCell>
      <TCell>
        <span
          className={`badge badge-${(row.type?.type || '').toLowerCase().replace(' ', '-')}`}
        >
          {row.type?.type || 'N/A'}
        </span>
      </TCell>
      <TCell>
        <span className={`badge badge-${(row.status?.status || '').toLowerCase()}`}>
          {row.status?.status || 'N/A'}
        </span>
      </TCell>
      <TCell>{row.source?.source || 'N/A'}</TCell>
      <TCell>{formatDateTime(row.createdAt)}</TCell>
      <TCell>{formatDateTime(row.updatedAt)}</TCell>
      <TCell>{formatFollowUpDateOnly(row.nextFollowUpDate)}</TCell>
      </TRow>
    );
  },
);

SpotlightTableRow.displayName = 'SpotlightTableRow';

export default SpotlightTableRow;
