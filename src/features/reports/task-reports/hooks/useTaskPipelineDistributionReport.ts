import { useCallback, useState } from 'react';
import { taskReportService } from '../services/taskReportService';
import { markBottleneckStages, normalizePipelineDistributionRows } from '../utils/pipelineDistribution.mapper';
import type { GetTaskPipelineDistributionParams, TaskPipelineStageView } from '../types';

const ERROR_MESSAGE = 'Failed to load workflow pipeline distribution';

/**
 * Loads the per-stage task distribution for the Workflow Pipeline / Stage
 * Distribution report.
 *
 * Used by:
 * - TaskPipelineDistributionReport
 *
 * Notes:
 * - Deliberately does NOT auto-fetch; the page owns when to call `fetchReport`
 *   (once the default workflow resolves and whenever the workflow picker changes).
 * - Rows are normalized from the API payload and then flagged with the
 *   bottleneck heuristic (markBottleneckStages) so the chart and table share
 *   one computed view model.
 */
export function useTaskPipelineDistributionReport() {
  const [workflowName, setWorkflowName] = useState('');
  const [stages, setStages] = useState<TaskPipelineStageView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async (params: GetTaskPipelineDistributionParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await taskReportService.getPipelineDistribution(params);
      setWorkflowName(response.data?.workflow.name ?? '');
      setStages(markBottleneckStages(normalizePipelineDistributionRows(response.data)));
    } catch {
      setWorkflowName('');
      setStages([]);
      setError(ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { workflowName, stages, isLoading, error, fetchReport };
}