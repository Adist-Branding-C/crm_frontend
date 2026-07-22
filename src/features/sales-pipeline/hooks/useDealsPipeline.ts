import { useState, useCallback } from 'react';
import { pipelineService } from '../services/PipelineService';
import { getErrorMessage } from '../../../shared/utils/error';
import { PIPELINE_PAGINATION_LIMIT } from '../constants';
import type { PipelineStatusGroup, GetPipelineParams } from '../types';


export function useDealsPipeline(onError: (message: string) => void) {
  const [statusGroups, setStatusGroups] = useState<PipelineStatusGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatusId, setLoadingStatusId] = useState<number | null>(null);

  const fetchDeals = useCallback(
    async (params: Partial<GetPipelineParams>) => {
      setIsLoading(true);
      try {
        const response = await pipelineService.getDeals(params);
        if (response.status && response.data) {
          setStatusGroups(response.data.items);
        }
      } catch (err: unknown) {
        onError(getErrorMessage(err, 'Failed to fetch deals'));
      } finally {
        setIsLoading(false);
      }
    },
    [onError],
  );

  const loadMoreDeals = useCallback(
    async (statusId: number) => {
      setLoadingStatusId(statusId);
      try {
        const statusGroup = statusGroups.find((g) => g.statusId === statusId);
        if (!statusGroup) return;

        const skip = statusGroup.deals.length;
        const response = await pipelineService.getStatusDeals(
          statusId,
          skip,
          PIPELINE_PAGINATION_LIMIT,
        );

        if (response.status && response.data) {
          const { items, count } = response.data;
          setStatusGroups((prevGroups) =>
            prevGroups.map((group) => {
              if (group.statusId !== statusId) return group;
              const existingIds = new Set(group.deals.map((d) => d.id));
              const newDeals = items.filter((d) => !existingIds.has(d.id));
              return { ...group, deals: [...group.deals, ...newDeals], count };
            }),
          );
        }
      } catch (err: unknown) {
        onError(getErrorMessage(err, 'Failed to load more deals'));
      } finally {
        setLoadingStatusId(null);
      }
    },
    [statusGroups, onError],
  );

  return {
    statusGroups,
    setStatusGroups,
    isLoading,
    loadingStatusId,
    fetchDeals,
    loadMoreDeals,
  };
}
