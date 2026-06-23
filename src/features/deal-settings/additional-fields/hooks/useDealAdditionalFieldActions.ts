import { useState, useCallback } from 'react';
import { dealAdditionalFieldService } from '../services/dealAdditionalField.service';
import type { UseDealAdditionalFieldActionsParams } from '../types/use-deal-additional-field-actions.types';
import type { DealAdditionalField } from '../types/deal-additional-field.types';

export function useDealAdditionalFieldActions({
  feature, drawer, refetch,
}: UseDealAdditionalFieldActionsParams) {
  const [deletingItem, setDeletingItem] = useState<DealAdditionalField | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (drawer.editingItem) {
      try {
        await dealAdditionalFieldService.updateDealAdditionalField(drawer.editingItem.id, {
          fieldName: drawer.formData.fieldName,
          fieldType: drawer.formData.fieldType,
          isRequired: drawer.formData.required,
          showInList: drawer.formData.inList,
          showInFilter: drawer.formData.inFilter,
        });
      } catch {
        // API call failed
      }
      feature.setDealAdditionalFieldList(prev => prev.map(item =>
        item.id === drawer.editingItem!.id ? {
          ...item,
          field: drawer.formData.fieldName,
          type: drawer.formData.fieldType,
          inFilter: drawer.formData.inFilter,
          inList: drawer.formData.inList,
          required: drawer.formData.required,
        } : item
      ));
    } else {
      try {
        await dealAdditionalFieldService.createDealAdditionalField({
          fieldName: drawer.formData.fieldName,
          fieldType: drawer.formData.fieldType,
          inFilter: drawer.formData.inFilter,
          inList: drawer.formData.inList,
          required: drawer.formData.required,
        });
      } catch {
        // API call failed
      }
      refetch();
    }
    drawer.closeDrawer();
  }, [drawer.editingItem, drawer.formData, feature.setDealAdditionalFieldList, refetch, drawer.closeDrawer]);

  const handleDeleteClick = useCallback((item: DealAdditionalField) => {
    setDeletingItem(item);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    try {
      await dealAdditionalFieldService.deleteDealAdditionalField(deletingItem.id);
    } catch {
      // API call failed
    }
    feature.setDealAdditionalFieldList(prev => prev.filter(item => item.id !== deletingItem.id));
    setDeletingItem(null);
  }, [deletingItem, feature.setDealAdditionalFieldList]);

  return { deletingItem, setDeletingItem, handleSubmit, handleDeleteClick, handleConfirmDelete };
}
