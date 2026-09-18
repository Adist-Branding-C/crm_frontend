import { TRow, TCell } from '../../../../shared/components/table';
import { formatDate, formatDateTime } from '../../../../shared/utils/dateUtils';
import { RECURRING_INSTANCE_STATUS_META } from '../constants/recurringCompliance.data';
import type { RecurringTaskInstanceRow as RecurringTaskInstanceRowData } from '../types';

interface RecurringTaskInstanceRowProps {
  row: RecurringTaskInstanceRowData;
}

/**
 * Table row for one task instance in a recurring chain's drill-down history.
 *
 * Used by:
 * - RecurringComplianceInstancesModal
 */
const RecurringTaskInstanceRow = ({ row }: RecurringTaskInstanceRowProps) => {
  const statusMeta = RECURRING_INSTANCE_STATUS_META[row.status] ?? RECURRING_INSTANCE_STATUS_META.pending;

  return (
    <TRow>
      <TCell>{formatDate(row.dueDate)}</TCell>
      <TCell>
        {row.completedAt ? (
          formatDateTime(row.completedAt)
        ) : (
          <span className="text-muted">—</span>
        )}
      </TCell>
      <TCell>
        <span className={`status-badge recurring-instance-status ${statusMeta.className}`}>
          {statusMeta.label}
        </span>
      </TCell>
      <TCell>
        <span className="recurring-regenerated-next" title={row.regeneratedNext ? 'Regenerated' : 'Not regenerated'}>
          {row.regeneratedNext ? '\u2705' : '\u274C'}
        </span>
      </TCell>
    </TRow>
  );
};

export default RecurringTaskInstanceRow;