import { useState, useCallback, useEffect } from 'react';
import { subscriptionDataService } from '../services/subscriptionDataService';
import { mapSubscriptionApiToUI } from '../mappers/subscriptionMapper';
import { getErrorMessage } from '../../../../shared/utils/error';
import type { SubscriptionDetail } from '../types';
import type { CreateSubscriptionPayload, UpdateStaffCountPayload, UpdateSubscriptionStatusPayload, CancelSubscriptionPayload } from '../types/request';

function isNotFound(err: unknown): boolean {
  return (err as { response?: { status?: number } })?.response?.status === 404;
}

/**
 * Owns the current subscription for one company and its CRUD (create/update staff
 * count/update status/cancel) - a single entity's fetch + mutations, nothing else. The subscription's
 * history is a separate read-only concern owned by useSubscriptionHistory; this hook doesn't
 * fetch or return it. The page composes both and refetches history itself after a mutation here
 * succeeds, rather than this hook reaching into history's refetch on its own.
 *
 * Used by:
 * - CompanySubscriptionPage
 */
export function useCompanySubscription(companyId: string | undefined) {
  const [subscription, setSubscription] = useState<SubscriptionDetail | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const refetchSubscription = useCallback(async () => {
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
    refetchSubscription();
  }, [refetchSubscription]);

  const createSubscription = useCallback(async (payload: CreateSubscriptionPayload): Promise<boolean> => {
    setIsSaving(true);
    setSaveError('');
    try {
      await subscriptionDataService.createSubscription(payload);
      await refetchSubscription();
      return true;
    } catch (err: unknown) {
      setSaveError(getErrorMessage(err, 'Failed to create subscription'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [refetchSubscription]);

  const updateStaffCount = useCallback(async (payload: UpdateStaffCountPayload): Promise<boolean> => {
    if (!subscription) return false;
    setIsSaving(true);
    setSaveError('');
    try {
      await subscriptionDataService.updateStaffCount(subscription.id, payload);
      await refetchSubscription();
      return true;
    } catch (err: unknown) {
      setSaveError(getErrorMessage(err, 'Failed to update staff count'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [subscription, refetchSubscription]);

  const updateStatus = useCallback(async (payload: UpdateSubscriptionStatusPayload): Promise<boolean> => {
    if (!subscription) return false;
    setIsSaving(true);
    setSaveError('');
    try {
      await subscriptionDataService.updateStatus(subscription.id, payload);
      await refetchSubscription();
      return true;
    } catch (err: unknown) {
      setSaveError(getErrorMessage(err, 'Failed to update status'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [subscription, refetchSubscription]);

  const cancelSubscription = useCallback(async (payload: CancelSubscriptionPayload): Promise<boolean> => {
    if (!subscription) return false;
    setIsSaving(true);
    setSaveError('');
    try {
      await subscriptionDataService.cancelSubscription(subscription.id, payload);
      await refetchSubscription();
      return true;
    } catch (err: unknown) {
      setSaveError(getErrorMessage(err, 'Failed to cancel subscription'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [subscription, refetchSubscription]);

  return {
    subscription,
    notFound,
    isLoading,
    error,
    isSaving,
    saveError,
    setSaveError,
    createSubscription,
    updateStaffCount,
    updateStatus,
    cancelSubscription,
    refetchSubscription,
  };
}
