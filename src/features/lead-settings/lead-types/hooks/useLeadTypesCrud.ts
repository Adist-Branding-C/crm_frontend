import { useState, useCallback } from 'react';
import { leadTypeService } from '../services';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { mapApiToUI } from '../mappers/leadType.mapper';
import type { LeadTypeItem, CreateLeadTypePayload, UpdateLeadTypePayload } from '../types';
import type { UseLeadTypesCrudOptions } from '../types/hook.types';

export function useLeadTypesCrud({
  onError,
  onDeleteSuccess,
  onDropdownClose,
  refetch,
}: UseLeadTypesCrudOptions) {
  const [items, setItems] = useState<LeadTypeItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingItem, setDeletingItem] = useState<LeadTypeItem | null>(null);

  const fetchData = useCallback(async (page: number, limit: number, search: string) => {
    setIsLoading(true);
    onError(null);
    try {
      const response = await leadTypeService.getLeadTypes(page, limit, search || undefined);
      setItems((response.data.items || []).map(mapApiToUI));
      setTotal(response.data.pagination?.total ?? 0);
      setTotalPages(response.data.pagination?.total_pages ?? 1);
    } catch (err: unknown) {
      onError(getErrorMessage(err, ERROR_MESSAGES.FETCH_LEAD_TYPES));
    } finally {
      setIsLoading(false);
    }
  }, [onError]);

  const createType = useCallback(async (payload: CreateLeadTypePayload) => {
    const response = await leadTypeService.createLeadType(payload);
    return response;
  }, []);

  const updateType = useCallback(async (id: string, payload: UpdateLeadTypePayload) => {
    const response = await leadTypeService.updateLeadType(id, payload);
    return response;
  }, []);

  const deleteType = useCallback(async (id: string) => {
    const response = await leadTypeService.deleteLeadType(id);
    return response;
  }, []);

  const handleDeleteClick = useCallback((item: LeadTypeItem) => {
    setDeletingItem(item);
    onDropdownClose();
  }, [onDropdownClose]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    onError(null);
    try {
      await deleteType(String(deletingItem.id));
      setDeletingItem(null);
      await refetch();
      onDeleteSuccess('Lead Type deleted successfully.');
    } catch (err: unknown) {
      onError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_TYPE));
      setDeletingItem(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deletingItem, deleteType, onError, onDeleteSuccess, refetch]);

  return {
    items,
    total,
    totalPages,
    isLoading,
    isDeleting,
    deletingItem,
    setDeletingItem,
    fetchData,
    createType,
    updateType,
    handleDeleteClick,
    handleConfirmDelete,
  };
}
