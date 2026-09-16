import { TRow, TCell } from '../../../../shared/components/table';
import { formatDateTime } from '../../../../shared/utils/dateUtils';
import { formatStageChange } from '../utils/formatStageChange';
import StaffCell from './StaffCell';
import type { TaskStageHistoryRow as StageHistoryEntry } from '../types';

interface TaskStageHistoryRowProps {
  row: StageHistoryEntry;
}

/**
 * Table row for one stage-change entry in the Stage & Status Change History
 * report.
 *
 * Used by:
 * - TaskStageHistoryReport
 */
const TaskStageHistoryRow = ({ row }: TaskStageHistoryRowProps) => (
  <TRow>
    <TCell>
      <span className="report-task-title">{row.taskTitle}</span>
    </TCell>
    <TCell>{formatStageChange(row.fromStageName, row.toStageName)}</TCell>
    <TCell>
      {row.movedByStaffName ? (
        <StaffCell name={row.movedByStaffName} />
      ) : (
        <span className="text-muted">System</span>
      )}
    </TCell>
    <TCell>{formatDateTime(row.changedAt)}</TCell>
  </TRow>
);

export default TaskStageHistoryRow;