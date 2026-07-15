import { useState, useCallback, useRef } from 'react';
import { dealService } from '../services/deal.service';
import { mapApiToUI } from '../utils/dealMapper';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
import type { DealItem } from '../types/interface';
import type { GetDealsParams } from '../types/request';
import type { UseDealListReturn } from '../types/hook.types';

export function useDealList(onShowToast?: (message: string, type: 'success' | 'error') => void): UseDealListReturn {
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
      const params: GetDealsParams = { pageNumber: page, limit, ...extraParams };
      if (search) params.search = search;
      const response = await dealService.getAllDeals(params);

      if (requestSeq !== requestSeqRef.current) return;

      if (response.status && response.data) {
        const data = response.data as { items?: unknown[]; pagination?: { total: number; total_pages?: number; totalPages?: number } };
        const items = data?.items ?? [];
        setDealList(items.map((item) => mapApiToUI(item as never)));
        setTotalCount(data?.pagination?.total ?? 0);
        setTotalPages(data?.pagination?.total_pages ?? data?.pagination?.totalPages ?? 1);
      } else {
        setDealList([]);
        setTotalCount(0);
        setTotalPages(1);
        setError(response.message || ERROR_MESSAGES.FETCH_DEALS);
      }
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      setDealList([]);
      setTotalCount(0);
      setTotalPages(1);
      setError(ERROR_MESSAGES.FETCH_DEALS);
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
