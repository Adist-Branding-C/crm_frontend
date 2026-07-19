import { useState, useCallback, useRef } from 'react';
import { followupService } from '../services/followupService';
import { mapApiItemToFollowupLead } from '../mappers/followupLead.mapper';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';
import type { FollowupLead, Filters, SortConfig, GetFollowupLeadsParams } from '../types';

const SORT_KEY_TO_API: Record<string, GetFollowupLeadsParams['sort_by']> = {
  name: 'name',
  createdAt: 'createdAt',
  nextFollowUp: 'nextFollowUp',
};

/**
 * Fetches a page of follow-up leads for the given page/filters/sort, and
 * holds the resulting list + pagination state. Mirrors the Daily Activity
 * feature's useActivitiesFetch (imperative fetch call, request-seq guarding
 * against a fast page click superseding a slow one).
 *
 * Used by:
 * - FollowupRequiredPage (calls fetchFollowupLeads on mount, apply, sort, and
 *   page/rows-per-page change).
 */
export function useFollowupFetch() {
  const [data, setData] = useState<FollowupLead[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestSeqRef = useRef(0);

  const fetchFollowupLeads = useCallback(
    async (
      page: number,
      rowsPerPage: number,
      search: string,
      filters: Filters,
      sortConfig: SortConfig,
    ) => {
      const requestSeq = ++requestSeqRef.current;
      setIsLoading(true);
      setError(null);
      try {
        const params: GetFollowupLeadsParams = {
          pageNumber: page,
          limit: rowsPerPage,
        };
        if (search) params.search = search;
        if (filters.type) params.leadType = filters.type;
        if (filters.status) params.leadStatusId = filters.status;
        if (filters.source) params.enquirySource = filters.source;
        if (filters.assignedTo) params.assignedTo = filters.assignedTo;
        if (filters.dateRange.start) params.startDate = filters.dateRange.start;
        if (filters.dateRange.end) params.endDate = filters.dateRange.end;
        const sortBy = sortConfig.key ? SORT_KEY_TO_API[sortConfig.key] : undefined;
        if (sortBy) {
          params.sort_by = sortBy;
          params.sort_order = sortConfig.direction === SortDirection.DESC ? 'DESC' : 'ASC';
        }

        const response = await followupService.getFollowupLeads(params);
        if (requestSeq !== requestSeqRef.current) return;

        if (response.status && response.data) {
          setData(response.data.items.map(mapApiItemToFollowupLead));
          setTotal(response.data.pagination?.total ?? 0);
          setTotalPages(response.data.pagination?.total_pages || 1);
        } else {
          setData([]);
          setTotal(0);
          setTotalPages(1);
          setError(response.message || 'Failed to load follow-up leads');
        }
      } catch {
        if (requestSeq !== requestSeqRef.current) return;
        setData([]);
        setTotal(0);
        setTotalPages(1);
        setError('Failed to load follow-up leads');
      } finally {
        if (requestSeq === requestSeqRef.current) setIsLoading(false);
      }
    },
    [],
  );

  return { data, total, totalPages, isLoading, error, fetchFollowupLeads };
}
