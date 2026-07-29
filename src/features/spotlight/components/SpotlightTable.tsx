import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import {
  Table,
  THead,
  TBody,
  TRow,
  TCell,
  EmptyState,
} from '../../../shared/components/table';
import SpotlightTableRow from './SpotlightTableRow';
import type { SpotlightTableProps } from '../types';

const SpotlightTable: React.FC<SpotlightTableProps> = ({
  data,
  columns,
  sortConfig,
  onSort,
  paginatedIds,
  selectedIds,
  onSelectAll,
  onSelectRow,
  actionMenuOpen,
  onToggleMenu,
  onViewLead,
  loading,
}) => {
  const handleSortKeyDown = (
    e: React.KeyboardEvent<HTMLTableCellElement>,
    key: string,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSort(key);
    }
  };

  return (
    <Table wrapperClassName="table-scroll" className="enquiries-table">
        <THead>
          <TRow>
            {columns.map((col) => (
              <TCell
                key={col.key}
                variant="th"
                className={col.sortable ? 'sortable' : ''}
                onClick={col.sortable ? () => onSort(col.key) : undefined}
                onKeyDown={
                  col.sortable
                    ? (e) => handleSortKeyDown(e, col.key)
                    : undefined
                }
                tabIndex={col.sortable ? 0 : undefined}
                aria-sort={
                  col.sortable && sortConfig.key === col.key
                    ? sortConfig.direction === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : undefined
                }
              >
                {col.key === 'checkbox' ? (
                  <input
                    type="checkbox"
                    aria-label="Select all rows"
                    checked={
                      paginatedIds.length > 0 && paginatedIds.every((id) => selectedIds.includes(id))
                    }
                    onChange={(e) =>
                      onSelectAll(paginatedIds, e.target.checked)
                    }
                  />
                ) : (
                  <>
                    {col.label}
                    {col.sortable &&
                      sortConfig.key === col.key &&
                      (sortConfig.direction === 'asc' ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      ))}
                  </>
                )}
              </TCell>
            ))}
          </TRow>
        </THead>
        <TBody>
          {data.length === 0 && !loading ? (
            <EmptyState
              colSpan={columns.length}
              message="No spotlight leads right now"
            />
          ) : (
            data.map((row) => (
              <SpotlightTableRow
                key={row.id}
                row={row}
                isSelected={selectedIds.includes(row.id)}
                isMenuOpen={actionMenuOpen === row.id}
                onSelectRow={onSelectRow}
                onToggleMenu={(open) => onToggleMenu(row.id, open)}
                onViewLead={onViewLead}
              />
            ))
          )}
        </TBody>
    </Table>
  );
};

export default SpotlightTable;
