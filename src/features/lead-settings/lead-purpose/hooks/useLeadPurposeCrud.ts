import { useState, useCallback } from 'react';
import { leadPurposeService } from '../services';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { mapApiToUI } from '../mappers/leadPurpose.mapper';
import type { LeadPurposeItem, CreateLeadPurposePayload, UpdateLeadPurposePayload } from '../types';
import type { UseLeadPurposeCrudOptions } from '../types/hook.types';

export function useLeadPurposeCrud({
  onError,
  onDeleteSuccess,
  onDropdownClose,
  refetch,
}: UseLeadPurposeCrudOptions) {
  const [items, setItems] = useState<LeadPurposeItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingItem, setDeletingItem] = useState<LeadPurposeItem | null>(null);

  const fetchData = useCallback(async (page: number, limit: number, search: string) => {
    setIsLoading(true);
    onError(null);
    try {
      const response = await leadPurposeService.getLeadPurposes(page, limit, search || undefined);
      setItems((response.data.items || []).map(mapApiToUI));
      setTotal(response.data.pagination?.total ?? 0);
      setTotalPages(response.data.pagination?.total_pages ?? 1);
    } catch (err: unknown) {
      onError(getErrorMessage(err, ERROR_MESSAGES.FETCH_LEAD_PURPOSES));
    } finally {
      setIsLoading(false);
    }
  }, [onError]);

  const createPurpose = useCallback(async (payload: CreateLeadPurposePayload) => {
    const response = await leadPurposeService.createLeadPurpose(payload);
    return response;
  }, []);

  const updatePurpose = useCallback(async (id: string, payload: UpdateLeadPurposePayload) => {
    const response = await leadPurposeService.updateLeadPurpose(id, payload);
    return response;
  }, []);

  const deletePurpose = useCallback(async (id: string) => {
    const response = await leadPurposeService.deleteLeadPurpose(id);
    return response;
  }, []);

  const handleDeleteClick = useCallback((item: LeadPurposeItem) => {
    setDeletingItem(item);
    onDropdownClose();
  }, [onDropdownClose]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    onError(null);
    try {
      await deletePurpose(String(deletingItem.id));
      setDeletingItem(null);
      await refetch();
      onDeleteSuccess('Lead Purpose deleted successfully.');
    } catch (err: unknown) {
      onError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_PURPOSE));
      setDeletingItem(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deletingItem, deletePurpose, onError, onDeleteSuccess, refetch]);

  return {
    items,
    total,
    totalPages,
    isLoading,
    isDeleting,
    deletingItem,
    setDeletingItem,
    fetchData,
    createPurpose,
    updatePurpose,
    handleDeleteClick,
    handleConfirmDelete,
  };
}
