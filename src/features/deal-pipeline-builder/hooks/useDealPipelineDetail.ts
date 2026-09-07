import { useCallback, useEffect, useState } from 'react';
import { dealPipelineService } from '../services/dealPipeline.service';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import type { DealPipelineDetail } from '../types/interface';

/**
 * Loads one pipeline's detail (its stages + transitions) for the canvas
 * page. Pure data fetching - the canvas's own node/edge state lives in
 * useStageGraph, which is initialised from this hook's `pipeline` value.
 *
 * Used by:
 * - DealPipelineCanvasPage
 */
export function useDealPipelineDetail(pipelineId: number) {
  const [pipeline, setPipeline] = useState<DealPipelineDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const detail = await dealPipelineService.getPipeline(pipelineId);
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
