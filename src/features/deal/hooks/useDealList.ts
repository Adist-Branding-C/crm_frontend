import { useState, useCallback, useEffect, useRef } from 'react';
import { dealService } from '../services/deal.service';
import { parseErrorMessage } from '../utils/parseErrorMessage';
import type { DealItem } from '../types';

/**
 * List/pagination/search/sort fetch for the Deal entity.
 *
 * Follows the same architecture as useLeadListData:
 * - Central fetch function accepts page, limit, search, and extraParams (filter params).
 * - requestSeqRef prevents stale responses from overwriting newer ones.
 * - currentFetchParams stores the last fetch call so refreshCurrentPage can re-fetch.
 */
export function useDealList() {
  const [dealList, setDealList] = useState<DealItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const requestSeqRef = useRef(0);
  const currentFetchParams = useRef({ page: 1, limit: 10, search: '', extraParams: {} as Record<string, string | number> });

  const fetchDeals = useCallback(async (
    page: number,
    limit: number,
    search: string,
    extraParams: Record<string, string | number> = {},
  ) => {
    const requestSeq = ++requestSeqRef.current;
    currentFetchParams.current = { page, limit, search, extraParams };
    setIsLoading(true);
    setError('');

    try {
      const params: Record<string, string | number | undefined> = { pageNumber: page, limit, ...extraParams };
      if (search) params.search = search;
      const response = await dealService.getAllDeals(params);

      if (requestSeq !== requestSeqRef.current) return;

      if (response.status) {
        const data = response.data as { items?: DealItem[]; pagination?: { total: number; total_pages: number; has_next: boolean; has_previous: boolean; page: number } } | undefined;
        const pagination = data?.pagination;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        setDealList((Array.isArray(items) ? items : []).map((item: any) => ({
          ...item,
          dealId: item.dealId ?? String(item.id),
          lead: item.lead?.name ?? item.lead ?? '',
          leadId: item.lead?.id ?? item.leadId ?? '',
          status: item.status?.dealStatus ?? item.status?.name ?? item.status ?? '',
          statusId: item.status?.id ?? item.statusId ?? '',
          type: item.type?.dealType ?? item.type?.name ?? item.type ?? '',
          typeId: item.type?.id ?? item.typeId ?? '',
          agent: item.agent?.name ?? item.agent ?? '',
          agentId: item.agent?.id ?? item.agentId ?? '',
        })));
        setTotalCount(pagination?.total ?? 0);
        setTotalPages(pagination?.total_pages ?? 1);
      } else {
        setDealList([]);
        setTotalCount(0);
        setTotalPages(1);
        setError(response.message || 'Failed to fetch deals');
      }
    } catch (err: unknown) {
      if (requestSeq !== requestSeqRef.current) return;
      setDealList([]);
      setTotalCount(0);
      setTotalPages(1);
      setError(parseErrorMessage(err, 'Failed to fetch deals'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshCurrentPage = useCallback(() => {
    const { page, limit, search, extraParams } = currentFetchParams.current;
    fetchDeals(page, limit, search, extraParams);
  }, [fetchDeals]);

  return {
    dealList,
    isLoading,
    setIsLoading,
    error,
    setError,
    totalCount,
    totalPages,
    fetchDeals,
    refreshCurrentPage,
  };
}
