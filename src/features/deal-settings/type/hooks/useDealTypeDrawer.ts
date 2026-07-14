import { useCallback } from 'react';
import { useAddEditForm } from '../../../../shared/hooks/useAddEditForm';
import type { DealTypeItem } from '../types/interface';
import type { DealTypeFormData } from '../types/request';
import { ADD_DEAL_TYPE_INITIAL_VALUES } from '../constants/deal-type.constants';

const mapItemToFormData = (item: DealTypeItem): DealTypeFormData => ({
  name: item.name || '',
  status: Boolean(item.status),
});

/**
 * Add/edit drawer state for deal-settings/type.
 *
 * Notes:
 * - Thin wrapper around the shared useAddEditForm, configured with the deal type item->form mapper.
 */
export function useDealTypeDrawer() {
  const form = useAddEditForm<DealTypeItem, DealTypeFormData>({
    emptyFormData: ADD_DEAL_TYPE_INITIAL_VALUES,
    mapItemToFormData,
  });

  const handleFormChange = useCallback((values: DealTypeFormData) => {
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
