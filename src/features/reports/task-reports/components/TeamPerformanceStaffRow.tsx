import { TRow, TCell } from '../../../../shared/components/table';
import StaffCell from './StaffCell';
import { formatCompactTaskDuration } from '../utils/formatCompactTaskDuration';
import {
  getCompletionRateTone,
  getSlaBreachRateTone,
} from '../utils/teamPerformance.util';
import type { TeamPerformanceStaffRow } from '../types';

interface TeamPerformanceStaffRowProps {
  row: TeamPerformanceStaffRow;
}

/**
 * Table row for one staff member inside a group's drill-down modal in the Task
 * Team / Department Performance report. Shares the same metric columns as the
 * rollup table (minus the staff count column).
 *
 * Used by:
 * - TeamPerformanceDrilldownModal
 */
const TeamPerformanceStaffRow = ({ row }: TeamPerformanceStaffRowProps) => {
  const completionTone = getCompletionRateTone(row.completionRate);
  const slaTone = getSlaBreachRateTone(row.slaBreachRate);

  return (
    <TRow>
      <TCell>
        <StaffCell name={row.staffName} />
      </TCell>
      <TCell>{row.totalTasks}</TCell>
      <TCell>{row.completedCount}</TCell>
      <TCell>{row.openCount}</TCell>
      <TCell className={row.overdueCount > 0 ? 'text-danger' : undefined}>{row.overdueCount}</TCell>
      <TCell>
        <span className={`team-performance-rate tone-${completionTone}`}>{row.completionRate}%</span>
      </TCell>
      <TCell>
        <span className={`team-performance-rate tone-${slaTone}`}>{row.slaBreachRate}%</span>
      </TCell>
      <TCell>{formatCompactTaskDuration(row.avgTimeToCompleteHours)}</TCell>
    </TRow>
  );
};

export default TeamPerformanceStaffRow;