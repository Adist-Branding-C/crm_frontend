import { useState, useCallback } from 'react';
import { leadStatusService } from '../services';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { mapApiToUI } from '../mappers/leadStatus.mapper';
import type { LeadStatusItem, CreateLeadStatusPayload, UpdateLeadStatusPayload } from '../types';
import type { UseLeadStatusCrudOptions } from '../types/hook.types';

export function useLeadStatusCrud({
  onError,
  onDeleteSuccess,
  onDropdownClose,
  refetch,
}: UseLeadStatusCrudOptions) {
  const [items, setItems] = useState<LeadStatusItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingItem, setDeletingItem] = useState<LeadStatusItem | null>(null);

  const fetchData = useCallback(async (page: number, limit: number, search: string) => {
    setIsLoading(true);
    onError(null);
    try {
      const response = await leadStatusService.getLeadStatuses(page, limit, search || undefined);
      setItems((response.data.items || []).map(mapApiToUI));
      setTotal(response.data.pagination?.total ?? 0);
      setTotalPages(response.data.pagination?.total_pages ?? 1);
    } catch (err: unknown) {
      onError(getErrorMessage(err, ERROR_MESSAGES.FETCH_LEAD_STATUSES));
    } finally {
      setIsLoading(false);
    }
  }, [onError]);

  const createStatus = useCallback(async (payload: CreateLeadStatusPayload) => {
    const response = await leadStatusService.createLeadStatus(payload);
    return response;
  }, []);

  const updateStatus = useCallback(async (id: string, payload: UpdateLeadStatusPayload) => {
    const response = await leadStatusService.updateLeadStatus(id, payload);
    return response;
  }, []);

  const deleteStatus = useCallback(async (id: string) => {
    const response = await leadStatusService.deleteLeadStatus(id);
    return response;
  }, []);

  const handleDeleteClick = useCallback((item: LeadStatusItem) => {
    setDeletingItem(item);
    onDropdownClose();
  }, [onDropdownClose]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    onError(null);
    try {
      await deleteStatus(String(deletingItem.id));
      setDeletingItem(null);
      await refetch();
      onDeleteSuccess('Lead Status deleted successfully.');
    } catch (err: unknown) {
      onError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_STATUS));
      setDeletingItem(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deletingItem, deleteStatus, onError, onDeleteSuccess, refetch]);

  return {
    items,
    total,
    totalPages,
    isLoading,
    isDeleting,
    deletingItem,
    setDeletingItem,
    fetchData,
    createStatus,
    updateStatus,
    handleDeleteClick,
    handleConfirmDelete,
  };
}
