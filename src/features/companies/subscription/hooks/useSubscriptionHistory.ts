import { useState, useCallback, useEffect } from 'react';
import { subscriptionDataService } from '../services/subscriptionDataService';
import { mapHistoryApiToUI } from '../mappers/subscriptionMapper';
import type { SubscriptionHistoryEntry } from '../types';

/**
 * Owns the subscription-history list (read-only audit trail) for one company - a distinct
 * concern from the current subscription's own CRUD (useCompanySubscription). Split out so
 * neither hook's return spans both "subscription CRUD" and "history reads"; the page composes
 * both directly and calls refetch() here whenever a subscription/renewal-queue mutation
 * elsewhere should also refresh the trail.
 *
 * Used by:
 * - CompanySubscriptionPage
 */
export function useSubscriptionHistory(companyId: string | undefined) {
  const [history, setHistory] = useState<SubscriptionHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!companyId) return;
    setIsLoading(true);
    try {
      const res = await subscriptionDataService.getHistoryByCompanyId(companyId);
      setHistory((res.data ?? []).map(mapHistoryApiToUI));
    } catch {
      setHistory([]);
    } finally {
      setIsLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { history, isLoading, refetch };
}
