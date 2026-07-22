import { useState, useCallback, useRef } from 'react';
import { companyDataService } from '../services/companyDataService';
import { mapApiToUI } from '../mappers/companyMapper';
import type { Company } from '../types';
import type { GetCompaniesParams } from '../types/request';

/**
 * Owns the companies list query (fetch/pagination/search/status-filter) plus the
 * delete side-effect that refreshes it - mirrors useLeadListData's scope.
 *
 * Used by:
 * - CompaniesPage (list rendering, delete-confirm flow, post-save refresh)
 */
export function useCompaniesList(onShowToast: (message: string, type: 'success' | 'error') => void) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const requestSeqRef = useRef(0);
  const currentFetchParams = useRef({ page: 1, limit: 10, search: '', status: '' });

  const fetchCompanies = useCallback(async (page: number, limit: number, search: string, status = '') => {
    const requestSeq = ++requestSeqRef.current;
    currentFetchParams.current = { page, limit, search, status };
    setIsLoading(true);
    try {
      const params: GetCompaniesParams = { pageNumber: page, limit, sort_by: 'createdAt', sort_order: 'DESC' };
      if (search) params.search = search;
      if (status) params.status = status;
      const response = await companyDataService.getCompanies(params);
      if (requestSeq !== requestSeqRef.current) return;
      if (response.status && response.data) {
        setCompanies(response.data.items.map(mapApiToUI));
        setTotal(response.data.pagination?.total ?? 0);
        setTotalPages(response.data.pagination?.total_pages ?? 1);
      } else {
        setCompanies([]);
        setTotal(0);
        setTotalPages(1);
      }
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      setCompanies([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshCurrentPage = useCallback(() => {
    const { page, limit, search, status } = currentFetchParams.current;
    fetchCompanies(page, limit, search, status);
  }, [fetchCompanies]);

  const deleteCompany = useCallback(async (companyId: string) => {
    try {
      await companyDataService.deleteCompany(companyId);
      onShowToast('Company deleted successfully', 'success');
      refreshCurrentPage();
      return true;
    } catch {
      onShowToast('Failed to delete company', 'error');
      return false;
    }
  }, [onShowToast, refreshCurrentPage]);

  const handleCompanySaved = useCallback((action: 'created' | 'updated') => {
    refreshCurrentPage();
    onShowToast(action === 'created' ? 'Company created successfully' : 'Company updated successfully', 'success');
  }, [refreshCurrentPage, onShowToast]);

  return {
    companies,
    total,
    totalPages,
    isLoading,
    fetchCompanies,
    refreshCurrentPage,
    deleteCompany,
    handleCompanySaved,
  };
}
