import { useState, useCallback, useEffect } from 'react';
import { dealService } from '../services/deal.service';
import { parseErrorMessage } from '../utils/parseErrorMessage';
import type { DealItem } from '../types';

/**
 * List/pagination/search/sort fetch for the Deal entity.
 *
 * Notes:
 * - Deliberately kept feature-specific rather than migrated onto the shared
 *   useTableData: Deal's sort control lets the user pick both a field (createdAt,
 *   amount, startDate, dealName) and a direction, while useTableData only exposes a
 *   single ASC/DESC toggle with no field selection. Extending useTableData's shared
 *   contract to support arbitrary sort fields would ripple into every other feature
 *   that already consumes it (Task, Campaign, etc.), which is out of scope for this
 *   feature-local hook cleanup.
 */
export function useDealList() {
  const [dealList, setDealList] = useState<DealItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setPageNumber(1);
  }, []);

  const handleSortChange = useCallback((field: string, direction: string) => {
    setSortBy(field);
    setSortOrder(direction);
    setPageNumber(1);
  }, []);

  const fetchDeals = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const params: Record<string, string | number | undefined> = { pageNumber, limit };
      if (searchQuery) params.search = searchQuery;
      if (sortBy) params.sortBy = sortBy;
      if (sortOrder) params.sortOrder = sortOrder;
      const response = await dealService.getAllDeals(params);

      if (response.status) {
        const data = response.data as { items?: DealItem[]; pagination?: { total: number; total_pages: number; has_next: boolean; has_previous: boolean; page: number } } | undefined;
        const pagination = data?.pagination;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        setDealList((Array.isArray(items) ? items : []).map((item: any) => ({
          ...item,
          dealId: item.dealId ?? String(item.id),
        })));
        setTotalCount(pagination?.total ?? 0);
        setTotalPages(pagination?.total_pages ?? 1);
        setHasNext(pagination?.has_next ?? false);
        setHasPrevious(pagination?.has_previous ?? false);
      } else {
        setError(response.message || 'Failed to fetch deals');
      }
    } catch (err: unknown) {
      setError(parseErrorMessage(err, 'Failed to fetch deals'));
    } finally {
      setIsLoading(false);
    }
  }, [pageNumber, limit, searchQuery, sortBy, sortOrder]);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  return {
    dealList,
    isLoading,
    setIsLoading,
    error,
    setError,
    totalCount,
    totalPages,
    hasNext,
    hasPrevious,
    pageNumber,
    setPageNumber,
    limit,
    setLimit,
    searchQuery,
    handleSearchChange,
    sortBy,
    sortOrder,
    handleSortChange,
    refresh: fetchDeals,
  };
}
