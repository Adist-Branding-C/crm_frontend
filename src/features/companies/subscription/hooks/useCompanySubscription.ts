import { useState, useCallback, useEffect } from 'react';
import { subscriptionDataService } from '../services/subscriptionDataService';
import { mapSubscriptionApiToUI, mapHistoryApiToUI } from '../mappers/subscriptionMapper';
import { getErrorMessage } from '../../../../shared/utils/error';
import type { SubscriptionDetail, SubscriptionHistoryEntry } from '../types';
import type { CreateSubscriptionPayload, UpdateStaffCountPayload, UpdateSubscriptionStatusPayload } from '../types/request';

function isNotFound(err: unknown): boolean {
  return (err as { response?: { status?: number } })?.response?.status === 404;
}

/**
 * Owns the current subscription + its history for one company, and the mutation
 * actions (create/update staff count/update status) - refetches both after each
 * successful mutation so the overview and history stay in sync.
 *
 * Used by:
 * - CompanySubscriptionPage
 */
export function useCompanySubscription(companyId: string | undefined) {
  const [subscription, setSubscription] = useState<SubscriptionDetail | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [history, setHistory] = useState<SubscriptionHistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const fetchHistory = useCallback(async () => {
    if (!companyId) return;
    setHistoryLoading(true);
    try {
      const res = await subscriptionDataService.getHistoryByCompanyId(companyId);
      const items = res.data ?? [];
      setHistory(items.map(mapHistoryApiToUI));
    } catch {
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  }, [companyId]);

  const fetchSubscription = useCallback(async () => {
    if (!companyId) return;
    setIsLoading(true);
    setError('');
    setNotFound(false);
    try {
      const res = await subscriptionDataService.getByCompanyId(companyId);
      if (res.status && res.data) {
        setSubscription(mapSubscriptionApiToUI(res.data));
      } else {
        setNotFound(true);
        setSubscription(null);
      }
    } catch (err: unknown) {
      if (isNotFound(err)) {
        setNotFound(true);
        setSubscription(null);
      } else {
        setError(getErrorMessage(err, 'Failed to load subscription'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    fetchSubscription();
    fetchHistory();
  }, [fetchSubscription, fetchHistory]);

  const createSubscription = useCallback(async (payload: CreateSubscriptionPayload): Promise<boolean> => {
    setIsSaving(true);
    setSaveError('');
    try {
      await subscriptionDataService.createSubscription(payload);
      await fetchSubscription();
      await fetchHistory();
      return true;
    } catch (err: unknown) {
      setSaveError(getErrorMessage(err, 'Failed to create subscription'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [fetchSubscription, fetchHistory]);

  const updateStaffCount = useCallback(async (payload: UpdateStaffCountPayload): Promise<boolean> => {
    if (!subscription) return false;
    setIsSaving(true);
    setSaveError('');
    try {
      await subscriptionDataService.updateStaffCount(subscription.id, payload);
      await fetchSubscription();
      await fetchHistory();
      return true;
    } catch (err: unknown) {
      setSaveError(getErrorMessage(err, 'Failed to update staff count'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [subscription, fetchSubscription, fetchHistory]);

  const updateStatus = useCallback(async (payload: UpdateSubscriptionStatusPayload): Promise<boolean> => {
    if (!subscription) return false;
    setIsSaving(true);
    setSaveError('');
    try {
      await subscriptionDataService.updateStatus(subscription.id, payload);
      await fetchSubscription();
      await fetchHistory();
      return true;
    } catch (err: unknown) {
      setSaveError(getErrorMessage(err, 'Failed to update status'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [subscription, fetchSubscription, fetchHistory]);

  const refetch = useCallback(async () => {
    await Promise.all([fetchSubscription(), fetchHistory()]);
  }, [fetchSubscription, fetchHistory]);

  return {
    subscription,
    notFound,
    isLoading,
    error,
    history,
    historyLoading,
    isSaving,
    saveError,
    setSaveError,
    createSubscription,
    updateStaffCount,
    updateStatus,
    refetch,
  };
}
