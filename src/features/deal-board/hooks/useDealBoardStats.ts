import { useMemo } from 'react';
import type { PipelineStatusGroup } from '../../sales-pipeline/types/interface';

export interface DealBoardStats {
  openCount: number;
  totalValue: number;
  weightedForecast: number;
}

/**
 * Derives simple pipeline-health stats from the already-fetched Kanban
 * column data - no separate API call. Weighted forecast excludes WON deals
 * (already closed, not a forecast) and LOST deals (0% by definition).
 *
 * Note: openCount uses each column's server-computed total (accurate even
 * when a column's cards aren't all loaded yet), but totalValue/
 * weightedForecast can only sum the deals actually loaded into
 * group.deals - for a pipeline with more deals in one stage than the
 * Kanban's per-column page size, those two figures under-count until the
 * user clicks "See More". A dedicated statistics endpoint (Phase 7) is the
 * real fix; this is a deliberately free, good-enough estimate until then.
 *
 * Used by:
 * - DealBoardPage
 */
export function useDealBoardStats(statusGroups: PipelineStatusGroup[]): DealBoardStats {
  return useMemo(() => {
    let openCount = 0;
    let totalValue = 0;
    let weightedForecast = 0;

    for (const group of statusGroups) {
      const isOpen = group.outcome === undefined || group.outcome === 'OPEN';
      if (isOpen) openCount += group.count;
      for (const deal of group.deals) {
        // deal.amount arrives as a numeric-looking string (Postgres
        // `numeric` columns serialize as strings, not JSON numbers) - `+=`
        // would silently string-concatenate instead of adding, producing
        // NaN once Math.round() hits the result.
        const amount = Number(deal.amount);
        totalValue += amount;
        if (isOpen) {
          const probability = group.probability ?? 0;
          weightedForecast += (amount * probability) / 100;
        }
      }
    }

    return { openCount, totalValue, weightedForecast };
  }, [statusGroups]);
}
