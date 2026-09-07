import { useMemo } from 'react';
import type { PipelineStatusGroup } from '../../sales-pipeline/types/interface';
import { DEFAULT_CURRENCY } from '../../../shared/constants/currencies';

export interface DealBoardStats {
  openCount: number;
  totalValue: number;
  weightedForecast: number;
  /** Currency codes present across the loaded deals, for the summary toggle. */
  currencies: string[];
}


export function useDealBoardStats(
  statusGroups: PipelineStatusGroup[],
  currency: string = DEFAULT_CURRENCY,
): DealBoardStats {
  return useMemo(() => {
    let openCount = 0;
    let totalValue = 0;
    let weightedForecast = 0;
    const currencies = new Set<string>();

    for (const group of statusGroups) {
      const isOpen = group.outcome === undefined || group.outcome === 'OPEN';
      if (isOpen) openCount += group.count;
      for (const deal of group.deals) {
        const dealCurrency = deal.currency || DEFAULT_CURRENCY;
        currencies.add(dealCurrency);
        if (dealCurrency !== currency) continue;
        const amount = Number(deal.amount);
        totalValue += amount;
        if (isOpen) {
          const probability = group.probability ?? 0;
          weightedForecast += (amount * probability) / 100;
        }
      }
    }

    return { openCount, totalValue, weightedForecast, currencies: [...currencies] };
  }, [statusGroups, currency]);
}
