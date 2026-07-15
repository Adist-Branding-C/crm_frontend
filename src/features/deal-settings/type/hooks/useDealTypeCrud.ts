import { useCallback } from 'react';
import { dealTypeService } from '../services/dealType.service';
import type { DealTypeItem } from '../types/interface';
import type { UseDealTypeCrudParams } from '../types/use-deal-type-crud.types';

/**
 * Deal type create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the narrow drawer/pagination pieces it needs (editingItem, formData, closeDrawer,
 *   setError, refresh) rather than owning or re-exporting the drawer or pagination hooks
 *   themselves - DealTypePage.tsx owns those hooks directly and reads their full state from there.
 * - Try/catch on every API call prevents unhandled network errors from crashing the UI,
 *   matching the error-handling pattern used by the Campaign module.
 */
export function useDealTypeCrud({ editingItem, formData, closeDrawer, setError, refresh }: UseDealTypeCrudParams) {
  const handleSave = useCallback(async () => {
    try {
      const response = editingItem
        ? await dealTypeService.updateDealType(editingItem.id, formData)
        : await dealTypeService.createDealType(formData);
      if (response.status) {
        closeDrawer();
        refresh();
      } else {
        setError(response.message || `Failed to ${editingItem ? 'update' : 'add'} deal type`);
      }
    } catch {
      setError(`Network error. Failed to ${editingItem ? 'update' : 'add'} deal type.`);
    }
  }, [editingItem, formData, closeDrawer, refresh, setError]);

  const handleDelete = useCallback(async (item: DealTypeItem) => {
    try {
      const response = await dealTypeService.deleteDealType(item.id);
      if (response.status) {
        refresh();
        return true;
      }
      setError(response.message || 'Failed to delete deal type');
      return false;
    } catch {
      setError('Network error. Failed to delete deal type.');
      return false;
    }
  }, [refresh, setError]);

  return { handleSave, handleDelete };
}
