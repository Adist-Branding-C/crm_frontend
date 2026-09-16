import type { TaskPipelineDistributionData, TaskPipelineStageRow, TaskPipelineStageView } from '../types';

/**
 * Multiple by which a stage's average age must exceed the workflow-wide average
 * before the stage is flagged as a likely bottleneck (see markBottleneckStages).
 */
const BOTTLENECK_AVERAGE_RATIO = 2;

function bySortOrder(a: TaskPipelineStageRow, b: TaskPipelineStageRow): number {
  return a.sortOrder - b.sortOrder;
}

/**
 * Normalizes the raw pipeline-distribution API payload into a flat stage row
 * array, sorted ascending by the workflow's sortOrder so the chart and table
 * start from the Kanban board's first column.
 *
 * Used by:
 * - useTaskPipelineDistributionReport
 *
 * Notes:
 * - The backend merges every workflow stage with its distribution row so the
 *   full Kanban column set is always present (zero-count stages kept). The
 *   payload order is not relied upon - sortOrder is applied explicitly.
 */
export function normalizePipelineDistributionRows(
  data: TaskPipelineDistributionData | undefined,
): TaskPipelineStageRow[] {
  if (!data) return [];
  return data.stages.slice().sort(bySortOrder);
}

/**
 * Marks stages whose average age in stage is more than 2x the workflow-wide
 * average age, i.e. likely bottlenecks, so the report can flag those stage
 * bars/rows to draw attention to them.
 *
 * Used by:
 * - useTaskPipelineDistributionReport
 *
 * Notes:
 * - Stages with no open tasks (null/zero age) are excluded from the average
 *   and are never flagged.
 */
export function markBottleneckStages(rows: TaskPipelineStageRow[]): TaskPipelineStageView[] {
  const stageAges = rows
    .map((row) => row.avgAgeInStageHours)
    .filter((age): age is number => age !== null && Number.isFinite(age) && age >= 0);

  if (stageAges.length === 0) {
    return rows.map((row) => ({ ...row, isBottleneck: false }));
  }

  const averageAge = stageAges.reduce((sum, age) => sum + age, 0) / stageAges.length;

  return rows.map((row) => ({
    ...row,
    isBottleneck:
      row.avgAgeInStageHours !== null && row.avgAgeInStageHours > averageAge * BOTTLENECK_AVERAGE_RATIO,
  }));
}