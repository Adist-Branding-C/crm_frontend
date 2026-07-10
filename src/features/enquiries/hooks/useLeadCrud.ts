import { useState, useCallback, useRef } from 'react';
import { leadDataService } from '../services/leadDataService';
import { mapApiToUI } from '../utils/leadMapper';
import type { Lead } from '../types';
import type { UseLeadCrudReturn } from '../types/hook.types';

export function useLeadCrud(onShowToast: (message: string, type: 'success' | 'error') => void): UseLeadCrudReturn {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTargetLead, setDeleteTargetLead] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const requestSeqRef = useRef(0);
  const currentFetchParams = useRef({ page: 1, limit: 10, search: '', extraParams: {} as Record<string, string | number> });

  const fetchLeads = useCallback(async (page: number, limit: number, search: string, extraParams: Record<string, string | number> = {}) => {
    const requestSeq = ++requestSeqRef.current;
    currentFetchParams.current = { page, limit, search, extraParams };
    setIsLoading(true);
    try {
      const params: Record<string, string | number> = { pageNumber: page, limit, sort_by: 'createdAt', sort_order: 'DESC', ...extraParams };
      if (search) params.search = search;
      const response = await leadDataService.getLeads(params);
      if (requestSeq !== requestSeqRef.current) return;
      if (response.status) {
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

  const handleDeleteClick = useCallback((lead: Lead) => {
    setDeleteTargetLead(lead);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteTargetLead || isDeleting) return;
    setIsDeleting(true);
    try {
      await leadDataService.deleteLead(deleteTargetLead.id);
      onShowToast('Lead deleted successfully', 'success');
      setDeleteTargetLead(null);
      refreshCurrentPage();
    } catch {
      onShowToast('Failed to delete lead', 'error');
      setDeleteTargetLead(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTargetLead, isDeleting, refreshCurrentPage, onShowToast]);

  const handleCloseDelete = useCallback(() => {
    if (isDeleting) return;
    setDeleteTargetLead(null);
  }, [isDeleting]);

  return {
    leads,
    total,
    totalPages,
    isLoading,
    deleteTargetLead,
    isDeleting,
    fetchLeads,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDelete,
    refreshCurrentPage,
  };
}
