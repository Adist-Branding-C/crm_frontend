import { skipToken } from '@reduxjs/toolkit/query';
import { useGetTaskKanbanQuery } from '../../../task/common/services/taskApi';

/**
 * Loads per-stage task counts for a workflow by reusing the same kanban
 * endpoint the board already uses (GET /tasks/kanban). Returns an empty map
 * while loading or if the call fails, so the canvas still renders.
 *
 * Used by:
 * - TaskWorkflowCanvasPage
 */
export function useTaskStageCounts(workflowId: number): Record<string, number> {
  const { data } = useGetTaskKanbanQuery(
    workflowId ? { workflowId: String(workflowId) } : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  const counts: Record<string, number> = {};
  for (const stage of data ?? []) {
    counts[stage.stageId] = stage.count;
  }
  return counts;
}
