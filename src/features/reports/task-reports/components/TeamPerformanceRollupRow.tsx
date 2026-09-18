import { TRow, TCell } from '../../../../shared/components/table';
import { formatCompactTaskDuration } from '../utils/formatCompactTaskDuration';
import {
  getCompletionRateTone,
  getSlaBreachRateTone,
} from '../utils/teamPerformance.util';
import type { TeamPerformanceRollupRow } from '../types';

interface TeamPerformanceRollupRowProps {
  row: TeamPerformanceRollupRow;
  onSelect: (row: TeamPerformanceRollupRow) => void;
}

/**
 * Table row for one department group in the Task Team / Department Performance
 * report. Rows are clickable and open the drill-down modal showing that
 * department's per-staff breakdown.
 *
 * Used by:
 * - TaskTeamPerformanceReport
 */
const TeamPerformanceRollupRow = ({ row, onSelect }: TeamPerformanceRollupRowProps) => {
  const completionTone = getCompletionRateTone(row.completionRate);
  const slaTone = getSlaBreachRateTone(row.slaBreachRate);

  return (
    <TRow className="team-performance-group-row" onClick={() => onSelect(row)}>
      <TCell>
        <span className="report-task-title">{row.groupName}</span>
      </TCell>
      <TCell>{row.staffCount}</TCell>
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

export default TeamPerformanceRollupRow;