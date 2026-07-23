import { useState, useCallback, useEffect } from 'react';
import { leadsService } from '../services/LeadsService';
import { buildQueryParams } from '../utils/leadsQueryBuilder';
import type { Lead, Filters } from '../types';
import type { SortConfig } from '../../../shared/types/sort';

export interface UseLeadsFetchConfig {
  debouncedSearch: string;
  filters: Filters;
  sortConfig: SortConfig;
  currentPage: number;
  rowsPerPage: number;
}

export interface UseLeadsFetchResult {
  leads: Lead[];
  isLoading: boolean;
  error: string;
  totalItems: number;
  totalPages: number;
  refetch: () => void;
}

export function useLeadsFetch(config: UseLeadsFetchConfig): UseLeadsFetchResult {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [fetchKey, setFetchKey] = useState(0);

  const refetch = useCallback(() => setFetchKey(k => k + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function fetchLeads() {
      setIsLoading(true);
      setError('');
      try {
        const params = buildQueryParams(
          config.filters,
          config.sortConfig,
          config.currentPage,
          config.rowsPerPage,
          config.debouncedSearch,
        );
        const response = await leadsService.getLeads(params);
        if (cancelled) return;

        if (response.status) {
          setLeads(response.data.items);
          setTotalItems(response.data.pagination.total);
          setTotalPages(response.data.pagination.total_pages);
        } else {
          setError(response.message);
          setLeads([]);
        }
      } catch (err: unknown) {
        if (cancelled) return;
        if (err && typeof err === 'object' && 'response' in err) {
          const axiosErr = err as { response?: { data?: { message?: string } } };
          setError(axiosErr.response?.data?.message || 'Failed to fetch leads');
        } else if (err && typeof err === 'object' && 'message' in err) {
          setError((err as { message: string }).message);
        } else {
          setError('Network error. Please try again.');
        }
        setLeads([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchLeads();

    return () => { cancelled = true; };
  }, [
    config.debouncedSearch,
    config.filters,
    config.sortConfig,
    config.currentPage,
    config.rowsPerPage,
    fetchKey,
  ]);

  return { leads, isLoading, error, totalItems, totalPages, refetch };
}
