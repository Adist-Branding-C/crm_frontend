import { useState, useCallback, useRef, useEffect } from 'react';
import type { GetCampaignsParams } from '../types/campaign.types';

export function useCampaignFilters() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(search), 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  }, []);

  const buildParams = useCallback((
    page: number,
    limit: number,
    debounced: string,
  ): GetCampaignsParams => ({
    pageNumber: page,
    limit,
    ...(debounced ? { search: debounced } : {}),
  }), []);

  return {
    search,
    debouncedSearch,
    currentPage,
    rowsPerPage,
    setCurrentPage,
    handleSearchChange,
    handleRowsPerPageChange,
    buildParams,
  };
}
