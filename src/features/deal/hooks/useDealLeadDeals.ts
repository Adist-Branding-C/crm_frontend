import { useState, useEffect } from 'react';
import type { AxiosError } from 'axios';
import { dealService } from '../services/deal.service';
import { mapApiToUI } from '../utils/dealMapper';
import type { DealItem } from '../types/interface';

/**
 * The parent lead's other deals, for the "Other Deals" tab in
 * DealDetailContent. Server-side filtered by `leadId` (the deals list
 * endpoint's `leadId` query param); the deal currently open in the drawer
 * is excluded from the result.
 *
 * Mirrors useDealActivities: only fetches while the drawer is open and this
 * tab is active.
 *
 * Used by:
 * - DealDetailContent
 */
export function useDealLeadDeals(
  leadId: string | number | undefined,
  currentDealId: number | string | undefined,
  isOpen: boolean,
  activeTab?: string,
) {
  const [deals, setDeals] = useState<DealItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isTabActive = activeTab === 'deals';
  const shouldFetch = isOpen && !!leadId && isTabActive;

  useEffect(() => {
    if (!shouldFetch) {
      if (!isOpen) {
        setDeals([]);
        setError(null);
      }
      return;
    }

    let cancelled = false;

    const fetchDeals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await dealService.getAllDeals({
          pageNumber: 1,
          limit: 50,
          leadId: leadId as string | number,
        });
        if (cancelled) return;
        const items = (response?.data?.items ?? []) as unknown[];
        setDeals(
          items
            .map((item) => mapApiToUI(item as never))
            .filter((d) => String(d.id) !== String(currentDealId)),
        );
      } catch (err) {
        if (!cancelled) {
          setError(
            (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
            'Failed to fetch the lead\'s other deals',
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchDeals();

    return () => {
      cancelled = true;
    };
  }, [leadId, currentDealId, shouldFetch, isOpen]);

  return { deals, isLoading, error };
}
