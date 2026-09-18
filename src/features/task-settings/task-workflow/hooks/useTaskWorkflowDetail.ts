import { useCallback, useEffect, useState } from 'react';
import { taskWorkflowService } from '../services/taskworkflow.service';
import { parseApiError } from '../../call-reason/utils/parseApiError';
import type { TaskWorkflowDetail } from '../types/interface';

/**
 * Loads one workflow's detail (its stages) for the detail page.
 * Pure data fetching — the page's own stage management state lives separately.
 */
export function useTaskWorkflowDetail(workflowId: number) {
  const [workflow, setWorkflow] = useState<TaskWorkflowDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const detail = await taskWorkflowService.getWorkflow(workflowId);
      setWorkflow(detail);
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setIsLoading(false);
    }
  }, [workflowId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { workflow, isLoading, error, refresh };
}
