import { TRow, TCell } from '../../../../shared/components/table';
import { formatDateTime } from '../../../../shared/utils/dateUtils';
import { formatBreachDelay } from '../utils/formatBreachDelay';
import TaskPriorityBadge from './TaskPriorityBadge';
import StaffCell from './StaffCell';
import type { SlaBreachRow as SlaBreachRowData } from '../types';

interface SlaBreachRowProps {
  row: SlaBreachRowData;
}

/**
 * Table row for one SLA breach entry in the SLA Breach & Escalation report.
 *
 * Used by:
 * - TaskSLABreachReport
 */
const SlaBreachRow = ({ row }: SlaBreachRowProps) => (
  <TRow>
    <TCell>
      <span className="report-task-title">{row.taskTitle}</span>
    </TCell>
    <TCell>
      <TaskPriorityBadge priority={row.priority} />
    </TCell>
    <TCell>
      {row.assignedToStaffName ? (
        <StaffCell name={row.assignedToStaffName} />
      ) : (
        <span className="text-muted">Unassigned</span>
      )}
    </TCell>
    <TCell>{formatDateTime(row.scheduledDateTime)}</TCell>
    <TCell>
      <span className="sla-breached-by">{formatBreachDelay(row.breachedByHours)}</span>
    </TCell>
    <TCell>
      <div className="sla-notified-chips">
        {row.notifiedAssignee && <span className="sla-notified-chip">Assignee</span>}
        {row.notifiedManager && <span className="sla-notified-chip">Manager</span>}
        {!row.notifiedAssignee && !row.notifiedManager && <span className="text-muted">—</span>}
      </div>
    </TCell>
  </TRow>
);

export default SlaBreachRow;