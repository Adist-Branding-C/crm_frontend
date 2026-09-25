import { useCallback, useEffect, useState } from 'react';
import { leadPipelineService } from '../services/leadPipeline.service';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import type { LeadPipelineDetail } from '../types/interface';

/**
 * Loads one pipeline's detail (its stages) for the canvas page. Pure data
 * fetching - the canvas's own node state lives in useStageGraph, which is
 * initialised from this hook's `pipeline` value.
 *
 * Used by:
 * - LeadPipelineCanvasPage
 */
export function useLeadPipelineDetail(pipelineId: number) {
  const [pipeline, setPipeline] = useState<LeadPipelineDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const detail = await leadPipelineService.getPipeline(pipelineId);
      setPipeline(detail);
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setIsLoading(false);
    }
  }, [pipelineId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { pipeline, isLoading, error, refresh };
}
