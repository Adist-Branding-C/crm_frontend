import { useState, useRef, useCallback } from 'react';
import { spotlightService } from '../services/SpotlightService';
import { SpotlightLeadMapper } from '../mappers/spotlightLead.mapper';
import { getErrorMessage } from '../../../shared/utils/error';
import type { SpotlightLead, SpotlightRequestParams } from '../types';

/**
 * Fetches a page of Spotlight leads for the given request params, and holds
 * the resulting leads/pagination/error state.
 *
 * Used by:
 * - useSpotlightData.
 *
 * Notes:
 * - latestRequestId discards responses for requests that are no longer the
 *   most recent in-flight one (e.g. a fast filter change superseding a slow one).
 */
export function useSpotlightLeadsFetch() {
  const [data, setData] = useState<SpotlightLead[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const latestRequestId = useRef(0);

  const fetchLeads = useCallback(
    async (params: Partial<SpotlightRequestParams>) => {
      const requestId = ++latestRequestId.current;
      setLoading(true);
      setError(null);
      try {
        const response = await spotlightService.getLeads(params);
        if (requestId !== latestRequestId.current) return;
        if (response.status && response.data) {
          setData(SpotlightLeadMapper.toDisplayList(response.data.items));
          setTotalRecords(response.data.total);
          setTotalPages(response.data.total_pages);
        } else {
          setData([]);
          setTotalRecords(0);
          setTotalPages(1);
          setError(response.message || 'Failed to fetch leads');
        }
      } catch (err: unknown) {
        if (requestId !== latestRequestId.current) return;
        setData([]);
        setTotalRecords(0);
        setTotalPages(1);
        setError(getErrorMessage(err, 'Failed to fetch leads'));
      } finally {
        if (requestId !== latestRequestId.current) return;
        setLoading(false);
      }
    },
    [],
  );

  return {
    data,
    totalRecords,
    totalPages,
    loading,
    error,
    setError,
    fetchLeads,
  };
}
