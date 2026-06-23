import { useState, useMemo, useEffect, useCallback } from 'react';
import type { DealStatusItem } from '../types/deal-status.types';
import type { PaginationMeta } from '../../shared/types';

export function useDealStatusFilters(
  dealStatusList: DealStatusItem[],
  fetchDealStatuses: (page: number, limit: number, search?: string) => void,
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: 10, total: 0, totalPages: 1 });

  useEffect(() => {
    fetchDealStatuses(page, limit, searchQuery || undefined);
  }, [page, limit, searchQuery, fetchDealStatuses]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return dealStatusList;
    const q = searchQuery.toLowerCase();
    return dealStatusList.filter(item =>
      (item.name || '').toLowerCase().includes(q) ||
      (item.status || '').toLowerCase().includes(q)
    );
  }, [dealStatusList, searchQuery]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleLimitChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  }, []);

  const startIndex = (meta.page - 1) * meta.limit;

  const refetch = useCallback(() => {
    fetchDealStatuses(page, limit, searchQuery || undefined);
  }, [page, limit, searchQuery, fetchDealStatuses]);

  return { searchQuery, page, limit, meta, filteredData, handleSearchChange, handlePageChange, handleLimitChange, startIndex, refetch };
}
