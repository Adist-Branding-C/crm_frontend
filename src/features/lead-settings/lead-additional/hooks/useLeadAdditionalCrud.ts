import { useState, useCallback } from 'react';
import { leadAdditionalService } from '../services/leadAdditionalService';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { mapApiToUI } from '../mappers/additionalField.mapper';
import type { LeadAdditionalItem, CreateLeadAdditionalPayload, UpdateLeadAdditionalPayload } from '../types';
import type { UseLeadAdditionalCrudOptions } from '../types/hook.types';

export function useLeadAdditionalCrud({
  onError,
  onDeleteSuccess,
  onDropdownClose,
  refetch,
}: UseLeadAdditionalCrudOptions) {
  const [items, setItems] = useState<LeadAdditionalItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingItem, setDeletingItem] = useState<LeadAdditionalItem | null>(null);

  const fetchData = useCallback(async (page: number, limit: number, search: string) => {
    setIsLoading(true);
    onError(null);
    try {
      const response = await leadAdditionalService.getAll(page, limit, search || undefined);
      setItems((response.data.items || []).map(mapApiToUI));
      setTotal(response.data.pagination?.total ?? 0);
      setTotalPages(response.data.pagination?.total_pages ?? 1);
    } catch (err: unknown) {
      onError(getErrorMessage(err, ERROR_MESSAGES.FETCH_ADDITIONAL_FIELDS));
    } finally {
      setIsLoading(false);
    }
  }, [onError]);

  const createField = useCallback(async (payload: CreateLeadAdditionalPayload) => {
    const response = await leadAdditionalService.create(payload);
    return response;
  }, []);

  const updateField = useCallback(async (id: string, payload: UpdateLeadAdditionalPayload) => {
    const response = await leadAdditionalService.update(id, payload);
    return response;
  }, []);

  const deleteField = useCallback(async (id: string) => {
    const response = await leadAdditionalService.delete(id);
    return response;
  }, []);

  const handleDeleteClick = useCallback((item: LeadAdditionalItem) => {
    setDeletingItem(item);
    onDropdownClose();
  }, [onDropdownClose]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    onError(null);
    try {
      await deleteField(String(deletingItem.id));
      setDeletingItem(null);
      await refetch();
      onDeleteSuccess('Additional Field deleted successfully.');
    } catch (err: unknown) {
      onError(getErrorMessage(err, ERROR_MESSAGES.DELETE_ADDITIONAL_FIELD));
      setDeletingItem(null);
    } finally {
      setIsDeleting(false);
    }
  }, [deletingItem, deleteField, onError, onDeleteSuccess, refetch]);

  return {
    items,
    total,
    totalPages,
    isLoading,
    isDeleting,
    deletingItem,
    setDeletingItem,
    fetchData,
    createField,
    updateField,
    handleDeleteClick,
    handleConfirmDelete,
  };
}
