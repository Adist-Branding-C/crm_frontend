import { useState, useMemo, useEffect, useCallback } from 'react';
import type { DealTypeItem } from '../types/deal-type.types';
import type { PaginationMeta } from '../../shared/types';

export function useDealTypeFilters(
  dealTypeList: DealTypeItem[],
  fetchDealTypes: (page: number, limit: number, search?: string) => void,
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, limit: 10, total: 0, totalPages: 1 });

  useEffect(() => {
    fetchDealTypes(page, limit, searchQuery || undefined);
  }, [page, limit, searchQuery, fetchDealTypes]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return dealTypeList;
    const q = searchQuery.toLowerCase();
    return dealTypeList.filter(item =>
      (item.name || '').toLowerCase().includes(q) ||
      (item.status || '').toLowerCase().includes(q)
    );
  }, [dealTypeList, searchQuery]);

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
    fetchDealTypes(page, limit, searchQuery || undefined);
  }, [page, limit, searchQuery, fetchDealTypes]);

  return { searchQuery, page, limit, meta, filteredData, handleSearchChange, handlePageChange, handleLimitChange, startIndex, refetch };
}
