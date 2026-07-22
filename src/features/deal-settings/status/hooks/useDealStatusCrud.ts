import { useCallback } from 'react';
import { dealStatusService } from '../services/dealStatus.service';
import type { DealStatusItem } from '../types/interface';
import type { UseDealStatusCrudParams } from '../types/use-deal-status-crud.types';

/**
 * Deal status create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the narrow drawer/pagination pieces it needs (editingItem, formData, closeDrawer,
 *   setError, refresh) rather than owning or re-exporting the drawer or pagination hooks
 *   themselves - DealStatusPage.tsx owns those hooks directly and reads their full state from there.
 * - Try/catch on every API call prevents unhandled network errors from crashing the UI,
 *   matching the error-handling pattern used by the Campaign module.
 */
export function useDealStatusCrud({ editingItem, formData, closeDrawer, setError, refresh }: UseDealStatusCrudParams) {
  const handleSave = useCallback(async () => {
    try {
      const response = editingItem
        ? await dealStatusService.updateDealStatus(editingItem.id, formData)
        : await dealStatusService.createDealStatus(formData);
      if (response.status) {
        closeDrawer();
        refresh();
      } else {
        setError(response.message || `Failed to ${editingItem ? 'update' : 'add'} deal status`);
      }
    } catch {
      setError(`Network error. Failed to ${editingItem ? 'update' : 'add'} deal status.`);
    }
  }, [editingItem, formData, closeDrawer, refresh, setError]);

  const handleDelete = useCallback(async (item: DealStatusItem) => {
    try {
      const response = await dealStatusService.deleteDealStatus(item.id);
      if (response.status) {
        refresh();
        return true;
      }
      setError(response.message || 'Failed to delete deal status');
      return false;
    } catch {
      setError('Network error. Failed to delete deal status.');
      return false;
    }
  }, [refresh, setError]);

  return { handleSave, handleDelete };
}
