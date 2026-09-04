import { useCallback } from 'react';
import { useLookupOptions } from '../../../../shared/hooks/useLookupOptions';
import { taskService } from '../services/taskService';
import type { DealOption } from '../types/options';

export function useDealOptions() {
  const fetchDeals = useCallback(async (): Promise<DealOption[]> => {
    const dealRes = await taskService.getDeals();
    if (dealRes.status && dealRes.data?.items) {
      return dealRes.data.items.map((d: { id: number; dealName?: string; title?: string }) => ({ value: String(d.id), label: d.dealName ?? d.title ?? '' }));
    }
    return [];
  }, []);

  const { options: dealOptions, isLoading: dealLoading, load: loadDeals } = useLookupOptions(fetchDeals);

  return { dealOptions, dealLoading, loadDeals };
}
