import { useState, useCallback } from 'react';
import { leadSourceService } from '../services';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { mapApiToUI } from '../mappers/leadSource.mapper';
import type { LeadSourceItem, CreateLeadSourcePayload, UpdateLeadSourcePayload } from '../types';
import type { UseLeadSourceCrudOptions } from '../types/hook.types';

export function useLeadSourceCrud({
  onError,
  onDeleteSuccess,
  onDropdownClose,
  refetch,
}: UseLeadSourceCrudOptions) {
  const [items, setItems] = useState<LeadSourceItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingItem, setDeletingItem] = useState<LeadSourceItem | null>(null);

  const fetchData = useCallback(async (page: number, limit: number, search: string) => {
    setIsLoading(true);
    onError(null);
    try {
      const response = await leadSourceService.getLeadSources(page, limit, search || undefined);
      setItems((response.data.items || []).map(mapApiToUI));
      setTotal(response.data.pagination?.total ?? 0);
      setTotalPages(response.data.pagination?.total_pages ?? 1);
    } catch (err: unknown) {
      onError(getErrorMessage(err, ERROR_MESSAGES.FETCH_LEAD_SOURCES));
    } finally {
      setIsLoading(false);
    }
  }, [onError]);

  const createSource = useCallback(async (payload: CreateLeadSourcePayload) => {
    const response = await leadSourceService.createLeadSource(payload);
    return response;
  }, []);

  const updateSource = useCallback(async (id: string, payload: UpdateLeadSourcePayload) => {
    const response = await leadSourceService.updateLeadSource(id, payload);
    return response;
  }, []);

  const deleteSource = useCallback(async (id: string) => {
    const response = await leadSourceService.deleteLeadSource(id);
    return response;
  }, []);

  const handleDeleteClick = useCallback((item: LeadSourceItem) => {
    setDeletingItem(item);
    onDropdownClose();
  }, [onDropdownClose]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    onError(null);
    try {
      await deleteSource(String(deletingItem.id));
      setDeletingItem(null);
      await refetch();
      onDeleteSuccess('Lead Source deleted successfully.');
    } catch (err: unknown) {
      onError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_SOURCE));
      setDeletingItem(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deletingItem, deleteSource, onError, onDeleteSuccess, refetch]);

  return {
    items,
    total,
    totalPages,
    isLoading,
    isDeleting,
    deletingItem,
    setDeletingItem,
    fetchData,
    createSource,
    updateSource,
    handleDeleteClick,
    handleConfirmDelete,
  };
}
