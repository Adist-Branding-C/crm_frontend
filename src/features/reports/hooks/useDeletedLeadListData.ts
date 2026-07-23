import { useState, useCallback, useRef } from 'react';
import { leadDataService } from '../../enquiries/services/leadDataService';
import { mapApiToUI } from '../../enquiries/utils/leadMapper';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../../enquiries/constants/messages';
import type { Lead, GetLeadsParams } from '../../enquiries/types';

/**
 * Data source for the Deleted Leads report - mirrors useLeadListData but reads from the
 * soft-deleted-only /leads/deleted endpoint and exposes restoreLead instead of deleteLead.
 */
export function useDeletedLeadListData(onShowToast: (message: string, type: 'success' | 'error') => void) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const requestSeqRef = useRef(0);
  const currentFetchParams = useRef({ page: 1, limit: 10, search: '', extraParams: {} as Record<string, string | number> });

  const fetchLeads = useCallback(async (page: number, limit: number, search: string, extraParams: Record<string, string | number> = {}) => {
    const requestSeq = ++requestSeqRef.current;
    currentFetchParams.current = { page, limit, search, extraParams };
    setIsLoading(true);
    try {
      const params: GetLeadsParams = { pageNumber: page, limit, sort_by: 'createdAt', sort_order: 'DESC', ...extraParams };
      if (search) params.search = search;
      const response = await leadDataService.getDeletedLeads(params);
      if (requestSeq !== requestSeqRef.current) return;
      if (response.status && response.data) {
        setLeads(response.data.items.map(mapApiToUI));
        setTotal(response.data.pagination?.total ?? 0);
        setTotalPages(response.data.pagination?.totalPages ?? 1);
      } else {
        setLeads([]);
        setTotal(0);
        setTotalPages(1);
      }
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      setLeads([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshCurrentPage = useCallback(() => {
    const { page, limit, search, extraParams } = currentFetchParams.current;
    fetchLeads(page, limit, search, extraParams);
  }, [fetchLeads]);

  const restoreLead = useCallback(async (leadId: string) => {
    try {
      await leadDataService.restoreLead(leadId);
      onShowToast(SUCCESS_MESSAGES.LEAD_RESTORED, 'success');
      refreshCurrentPage();
      return true;
    } catch {
      onShowToast(ERROR_MESSAGES.RESTORE_LEAD, 'error');
      return false;
    }
  }, [onShowToast, refreshCurrentPage]);

  return {
    leads,
    total,
    totalPages,
    isLoading,
    fetchLeads,
    refreshCurrentPage,
    restoreLead,
  };
}
