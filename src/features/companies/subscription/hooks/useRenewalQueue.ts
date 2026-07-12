import { useState, useCallback, useEffect } from 'react';
import { renewalQueueDataService } from '../services/renewalQueueDataService';
import { mapQueueApiToUI } from '../mappers/subscriptionMapper';
import { getErrorMessage } from '../../../../shared/utils/error';
import type { RenewalQueueEntry } from '../types';
import type { CreateRenewalQueuePayload, UpdateRenewalQueuePayload } from '../types/request';

function isNotFound(err: unknown): boolean {
  return (err as { response?: { status?: number } })?.response?.status === 404;
}

/**
 * Owns the active renewal-queue entry (if any) for one company, and its
 * create/update/delete/apply-now mutation actions - refetches after each success.
 *
 * Used by:
 * - CompanySubscriptionPage (RenewalQueueSection)
 */
export function useRenewalQueue(companyId: string | undefined) {
  const [queue, setQueue] = useState<RenewalQueueEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const fetchQueue = useCallback(async () => {
    if (!companyId) return;
    setIsLoading(true);
    setError('');
    try {
      const res = await renewalQueueDataService.getByCompanyId(companyId);
      setQueue(res.status && res.data ? mapQueueApiToUI(res.data) : null);
    } catch (err: unknown) {
      if (isNotFound(err)) {
        setQueue(null);
      } else {
        setError(getErrorMessage(err, 'Failed to load renewal queue'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  const createQueue = useCallback(async (payload: CreateRenewalQueuePayload): Promise<boolean> => {
    setIsSaving(true);
    setSaveError('');
    try {
      await renewalQueueDataService.create(payload);
      await fetchQueue();
      return true;
    } catch (err: unknown) {
      setSaveError(getErrorMessage(err, 'Failed to schedule renewal'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [fetchQueue]);

  const updateQueue = useCallback(async (payload: UpdateRenewalQueuePayload): Promise<boolean> => {
    if (!queue) return false;
    setIsSaving(true);
    setSaveError('');
    try {
      await renewalQueueDataService.update(queue.id, payload);
      await fetchQueue();
      return true;
    } catch (err: unknown) {
      setSaveError(getErrorMessage(err, 'Failed to update scheduled renewal'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [queue, fetchQueue]);

  const deleteQueue = useCallback(async (): Promise<boolean> => {
    if (!queue) return false;
    setIsSaving(true);
    setSaveError('');
    try {
      await renewalQueueDataService.delete(queue.id);
      await fetchQueue();
      return true;
    } catch (err: unknown) {
      setSaveError(getErrorMessage(err, 'Failed to cancel scheduled renewal'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [queue, fetchQueue]);

  const applyNow = useCallback(async (): Promise<boolean> => {
    if (!queue) return false;
    setIsSaving(true);
    setSaveError('');
    try {
      await renewalQueueDataService.applyNow(queue.id);
      await fetchQueue();
      return true;
    } catch (err: unknown) {
      setSaveError(getErrorMessage(err, 'Failed to apply renewal'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [queue, fetchQueue]);

  return {
    queue,
    isLoading,
    error,
    isSaving,
    saveError,
    setSaveError,
    createQueue,
    updateQueue,
    deleteQueue,
    applyNow,
  };
}
