import { useState, useCallback } from 'react';
import { pipelineService } from '../services/PipelineService';
import { getErrorMessage } from '../../../shared/utils/error';
import { PIPELINE_PAGINATION_LIMIT } from '../constants';
import { mapPipelineLead, mapLeadStatusGroup } from '../utils/leadPipelineMapper';
import type { LeadStatusGroup, GetPipelineParams } from '../types';


export function useLeadsPipeline(onError: (message: string) => void) {
  const [leadGroups, setLeadGroups] = useState<LeadStatusGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingLeadStatusId, setLoadingLeadStatusId] = useState<string | null>(
    null,
  );

  const fetchLeads = useCallback(
    async (params: Partial<GetPipelineParams>) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await pipelineService.getLeads(params);
        if (response.status && response.data) {
          setLeadGroups(response.data.items.map(mapLeadStatusGroup));
        }
      } catch (err: unknown) {
        const message = getErrorMessage(err, 'Failed to fetch leads');
        setError(message);
        onError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [onError],
  );

  const loadMoreLeads = useCallback(
    async (statusId: string) => {
      setLoadingLeadStatusId(statusId);
      try {
        const statusGroup = leadGroups.find((g) => g.statusId === statusId);
        if (!statusGroup) return;

        const skip = statusGroup.leads.length;
        const response = await pipelineService.getStatusLeads(
          statusId,
          skip,
          PIPELINE_PAGINATION_LIMIT,
        );

        if (response.status && response.data) {
          const { items, count } = response.data;
          const mappedItems = items.map(mapPipelineLead);
          setLeadGroups((prevGroups) =>
            prevGroups.map((group) => {
              if (group.statusId !== statusId) return group;
              const existingIds = new Set(group.leads.map((d) => d.id));
              const newLeads = mappedItems.filter((d) => !existingIds.has(d.id));
              return { ...group, leads: [...group.leads, ...newLeads], count };
            }),
          );
        }
      } catch (err: unknown) {
        onError(getErrorMessage(err, 'Failed to load more leads'));
      } finally {
        setLoadingLeadStatusId(null);
      }
    },
    [leadGroups, onError],
  );

  return {
    leadGroups,
    setLeadGroups,
    isLoading,
    error,
    loadingLeadStatusId,
    fetchLeads,
    loadMoreLeads,
  };
}
