import { useCallback, useEffect, useRef, useState } from 'react';
import { companyDataService } from '../services/companyDataService';
import { mapApiToUI } from '../mappers/companyMapper';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import type { Company } from '../types';
import type { GetCompaniesParams } from '../types/request';

const ROWS_PER_PAGE = 10;

export function useCompanySelector() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const requestSeqRef = useRef(0);
  const pageRef = useRef(1);

  const loadPage = useCallback(async (page: number, search: string, append: boolean) => {
    const requestSeq = ++requestSeqRef.current;
    if (append) setIsLoadingMore(true);
    else setIsLoading(true);

    try {
      const params: GetCompaniesParams = { pageNumber: page, limit: ROWS_PER_PAGE, sort_by: 'createdAt', sort_order: 'DESC' };
      if (search) params.search = search;
      const response = await companyDataService.getCompanies(params);
      if (requestSeq !== requestSeqRef.current) return;

      const items = response.data?.items ?? [];
      pageRef.current = page;
      setCompanies(prev => append ? [...prev, ...items.map(mapApiToUI)] : items.map(mapApiToUI));
      setHasMore(page < (response.data?.pagination?.total_pages ?? 1));
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      if (!append) setCompanies([]);
      setHasMore(false);
    } finally {
      if (requestSeq === requestSeqRef.current) {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    }
  }, []);

  const { searchValue, handleSearchChange } = useDebouncedSearch((query) => {
    loadPage(1, query, false);
  });

  useEffect(() => {
    loadPage(1, '', false);
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (isLoading || isLoadingMore || !hasMore) return;
    loadPage(pageRef.current + 1, searchValue, true);
  }, [isLoading, isLoadingMore, hasMore, loadPage, searchValue]);

  return {
    companies,
    isLoading,
    isLoadingMore,
    hasMore,
    searchValue,
    handleSearchChange,
    loadMore,
  };
}