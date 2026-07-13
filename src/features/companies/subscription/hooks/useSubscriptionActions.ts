import { useCallback } from 'react';
import { useCompanySubscription } from './useCompanySubscription';
import { useSubscriptionHistory } from './useSubscriptionHistory';
import { useRenewalQueue } from './useRenewalQueue';
import type {
  CreateSubscriptionPayload,
  UpdateStaffCountPayload,
  UpdateSubscriptionStatusPayload,
  CancelSubscriptionPayload,
  CreateRenewalQueuePayload,
} from '../types/request';

/**
 * Composes useCompanySubscription/useSubscriptionHistory/useRenewalQueue for the write actions
 * that need more than one of them to change together for a single user action (e.g. creating a
 * subscription also appends a history row; an immediate renewal-queue creation also renews the
 * subscription). Each base hook still owns its own read-state (subscription/history/queue) and
 * is called directly by the page for that; this hook exists only so that cross-hook sequencing
 * lives here instead of as handler functions in the page component.
 *
 * Used by:
 * - CompanySubscriptionPage
 */
export function useSubscriptionActions(
  subscriptionState: ReturnType<typeof useCompanySubscription>,
  historyState: ReturnType<typeof useSubscriptionHistory>,
  queueState: ReturnType<typeof useRenewalQueue>,
) {
  const { createSubscription: baseCreateSubscription, updateStaffCount: baseUpdateStaffCount, updateStatus: baseUpdateStatus, cancelSubscription: baseCancelSubscription, refetchSubscription } = subscriptionState;
  const { refetch: refetchHistory } = historyState;
  const { createQueue: baseCreateQueue, applyNow: baseApplyNow, refetchQueue } = queueState;

  const createSubscription = useCallback(async (payload: CreateSubscriptionPayload) => {
    const success = await baseCreateSubscription(payload);
    if (success) await refetchHistory();
    return success;
  }, [baseCreateSubscription, refetchHistory]);

  const updateStaffCount = useCallback(async (payload: UpdateStaffCountPayload) => {
    const success = await baseUpdateStaffCount(payload);
    if (success) await refetchHistory();
    return success;
  }, [baseUpdateStaffCount, refetchHistory]);

  const updateStatus = useCallback(async (payload: UpdateSubscriptionStatusPayload) => {
    const success = await baseUpdateStatus(payload);
    if (success) await refetchHistory();
    return success;
  }, [baseUpdateStatus, refetchHistory]);

  const cancelSubscription = useCallback(async (payload: CancelSubscriptionPayload) => {
    const success = await baseCancelSubscription(payload);
    if (success) {
      await refetchHistory();
      await refetchQueue();
    }
    return success;
  }, [baseCancelSubscription, refetchHistory, refetchQueue]);

  const createQueue = useCallback(async (payload: CreateRenewalQueuePayload) => {
    const success = await baseCreateQueue(payload);
    if (success && payload.immediate) {
      await refetchSubscription();
      await refetchHistory();
    }
    return success;
  }, [baseCreateQueue, refetchSubscription, refetchHistory]);

  const applyQueueNow = useCallback(async () => {
    const success = await baseApplyNow();
    if (success) {
      await refetchSubscription();
      await refetchHistory();
    }
    return success;
  }, [baseApplyNow, refetchSubscription, refetchHistory]);

  return { createSubscription, updateStaffCount, updateStatus, cancelSubscription, createQueue, applyQueueNow };
}
