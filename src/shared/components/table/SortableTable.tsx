import type { ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { Column } from '../../types/table';
import type { SortConfig } from '../../types/sort';

interface SortableTableProps<T> {
  data: T[];
  columns: Column[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  emptyMessage?: string;
  keyExtractor: (row: T) => string | number;
  renderCell: (row: T, columnKey: string) => ReactNode;
  // First column becomes a clickable "view" cell when provided (e.g. open a detail drawer).
  onRowClick?: (row: T) => void;
}

/**
 * Generic sortable data list: click-to-sort headers, loading/error/empty
 * states, optional click-first-cell-to-view-row. Extracted from
 * FollowupTable so any feature with a sortable list (not a settings-style
 * CRUD grid - see DataTable for that) can reuse the same table shell instead
 * of hand-rolling the same <table>/<thead>/<tbody> markup per feature.
 *
 * Used by:
 * - features/followup-required/components/FollowupTable (columns + cell
 *   rendering stay feature-specific; the table shell doesn't).
 */
const SortableTable = <T,>({
  data,
  columns,
  sortConfig,
  onSort,
  isLoading,
  error,
  onRetry,
  emptyMessage = 'No records found.',
  keyExtractor,
  renderCell,
  onRowClick,
}: SortableTableProps<T>) => (
  <div className="table-container">
    <table className="enquiries-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className={col.sortable ? 'sortable' : ''}>
              {col.sortable ? (
                <button
                  type="button"
                  className="table-sort-button"
                  onClick={() => onSort(col.key)}
                >
                  {col.label}
                  {sortConfig.key === col.key &&
                    (sortConfig.direction === 'asc' ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </button>
              ) : (
                col.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={columns.length} className="leaddrawer-loading">
              Loading...
            </td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan={columns.length} className="leaddrawer-error">
              {error}{' '}
              {onRetry && (
                <button type="button" className="btn btn-secondary" onClick={onRetry}>
                  Retry
                </button>
              )}
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="leaddrawer-empty">
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={keyExtractor(row)}>
              {columns.map((col, i) => {
                const isViewCell = i === 0 && onRowClick;
                return (
                  <td
                    key={col.key}
                    className={isViewCell ? 'lead-name-cell' : undefined}
                    onClick={isViewCell ? () => onRowClick(row) : undefined}
                    tabIndex={isViewCell ? 0 : undefined}
                    role={isViewCell ? 'button' : undefined}
                    onKeyDown={
                      isViewCell
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onRowClick(row);
                            }
                          }
                        : undefined
                    }
                  >
                    {renderCell(row, col.key)}
                  </td>
                );
              })}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default SortableTable;
