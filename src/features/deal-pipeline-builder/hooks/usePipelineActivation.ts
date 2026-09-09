import { useCallback, useState } from 'react';
import { dealPipelineService } from '../services/dealPipeline.service';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';

/**
 * Owns the canvas page's "Activate" action: submitting state and the
 * blocked-reason message when the backend rejects activation (missing a
 * WON or LOST stage).
 *
 * Used by:
 * - DealPipelineCanvasPage
 */
export function usePipelineActivation(pipelineId: number, onActivated: () => void | Promise<void>) {
  const [isActivating, setIsActivating] = useState(false);
  const [blockedReason, setBlockedReason] = useState('');

  const activate = useCallback(async () => {
    setIsActivating(true);
    setBlockedReason('');
    try {
      const response = await dealPipelineService.activatePipeline(pipelineId);
      if (response.status) {
        await onActivated();
      } else {
        setBlockedReason(response.message || 'This pipeline cannot be activated yet');
      }
    } catch (err) {
      setBlockedReason(parseApiError(err).message);
    } finally {
      setIsActivating(false);
    }
  }, [pipelineId, onActivated]);

  return { activate, isActivating, blockedReason };
}
