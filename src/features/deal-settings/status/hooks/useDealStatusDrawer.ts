import { useCallback } from 'react';
import { useAddEditForm } from '../../../../shared/hooks/useAddEditForm';
import { DealStatusMapper } from '../mappers/dealStatus.mapper';
import type { DealStatusItem } from '../types/interface';
import type { DealStatusFormData } from '../types/request';
import { ADD_DEAL_STATUS_INITIAL_VALUES } from '../constants/deal-status.constants';

const mapItemToFormData = (item: DealStatusItem): DealStatusFormData =>
  DealStatusMapper.toFormData(item);

/**
 * Add/edit drawer state for deal-settings/status.
 *
 * Notes:
 * - Thin wrapper around the shared useAddEditForm, configured with the deal status item->form mapper.
 */
export function useDealStatusDrawer() {
  const form = useAddEditForm<DealStatusItem, DealStatusFormData>({
    emptyFormData: ADD_DEAL_STATUS_INITIAL_VALUES,
    mapItemToFormData,
  });

  const handleFormChange = useCallback((values: DealStatusFormData) => {
    form.setFormData(values);
  }, [form.setFormData]);

  return {
    showDrawer: form.isOpen,
    editingItem: form.editingItem,
    formData: form.formData,
    openAddDrawer: form.openAdd,
    openEditDrawer: form.openEdit,
    closeDrawer: form.reset,
    handleFormChange,
  };
}
