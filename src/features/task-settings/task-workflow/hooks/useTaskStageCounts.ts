import { useEffect, useState } from 'react';
import { taskKanbanService } from '../../../task/kanban/services/taskKanbanService';

/**
 * Loads per-stage task counts for a workflow by reusing the same kanban
 * endpoint the board already uses (GET /tasks/kanban). Falls back to an
 * empty map so the canvas still renders if the count call fails.
 *
 * Used by:
 * - TaskWorkflowCanvasPage
 */
export function useTaskStageCounts(workflowId: number): Record<string, number> {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!workflowId) return;
    let cancelled = false;
    taskKanbanService
      .getKanban(String(workflowId))
      .then((stages) => {
        if (cancelled) return;
        const next: Record<string, number> = {};
        for (const stage of stages) {
          next[stage.stageId] = stage.count;
        }
        setCounts(next);
      })
      .catch(() => {
        if (!cancelled) setCounts({});
      });
    return () => {
      cancelled = true;
    };
  }, [workflowId]);

  return counts;
}