import { TRow, TCell } from '../../../../shared/components/table';
import { formatDate } from '../../../../shared/utils/dateUtils';
import { RECURRING_STATUS_META } from '../constants/recurringCompliance.data';
import {
  formatExpectedActual,
  getComplianceTone,
  isRecurrenceStale,
} from '../utils/recurringCompliance.util';
import type { RecurringTaskComplianceRow as RecurringTaskComplianceRowData } from '../types';

interface RecurringTaskComplianceRowProps {
  row: RecurringTaskComplianceRowData;
  onOpenDrillDown: (row: RecurringTaskComplianceRowData) => void;
}

/**
 * Table row for one recurring task chain in the Recurring Task Compliance
 * report. Rows are clickable and open the drill-down modal showing that chain's
 * instance history.
 *
 * Used by:
 * - TaskRecurringComplianceReport
 */
const RecurringTaskComplianceRow = ({ row, onOpenDrillDown }: RecurringTaskComplianceRowProps) => {
  const tone = getComplianceTone(row.complianceRate);
  const stale = isRecurrenceStale(row.lastGeneratedAt, row.recurrenceIntervalHours);
  const statusMeta = RECURRING_STATUS_META[row.status] ?? RECURRING_STATUS_META.broken;

  return (
    <TRow className="recurring-chain-row" onClick={() => onOpenDrillDown(row)}>
      <TCell>
        <span className="report-task-title">{row.taskName}</span>
      </TCell>
      <TCell>
        <span className="recurring-rule-cell">{row.recurrenceRule || '—'}</span>
      </TCell>
      <TCell>
        <span className="recurring-expected-actual">{formatExpectedActual(row)}</span>
      </TCell>
      <TCell>
        <div className="recurring-counts">
          <span className="recurring-count-chip on-time" title="On-time instances">
            {row.onTimeCount}
          </span>
          <span className="recurring-count-chip late" title="Late instances">
            {row.lateCount}
          </span>
          <span className="recurring-count-chip missed" title="Missed instances">
            {row.missedCount}
          </span>
        </div>
      </TCell>
      <TCell>
        <span className={`recurring-compliance-rate tone-${tone}`}>{row.complianceRate}%</span>
      </TCell>
      <TCell>
        <span className={stale ? 'recurring-last-generated stale' : 'recurring-last-generated'}>
          {row.lastGeneratedAt ? formatDate(row.lastGeneratedAt) : 'Never'}
        </span>
      </TCell>
      <TCell>
        <span className={`status-badge recurring-status-badge ${statusMeta.className}`}>
          {statusMeta.emoji} {statusMeta.label}
        </span>
      </TCell>
    </TRow>
  );
};

export default RecurringTaskComplianceRow;