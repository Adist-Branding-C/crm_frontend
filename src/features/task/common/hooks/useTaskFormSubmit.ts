import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';

interface UseTaskFormSubmitParams<TItem extends { id: number }, TFormData> {
  editingItem: TItem | null;
  closeDrawer: () => void;
  mapItemToFormData: (item: TItem) => TFormData;
  handleAdd: (values: TFormData, helpers: FormikHelpers<TFormData>) => Promise<boolean>;
  handleUpdate: (id: number, values: TFormData, helpers: FormikHelpers<TFormData>) => Promise<boolean>;
}

/**
 * Formik submit handlers for a task-type entity's add/edit drawer. Add always
 * submits; edit short-circuits as a no-op when the form is unchanged from the
 * original item (compared via the entity's own mapper).
 *
 * Used by:
 * - useTaskFormSubmit (task), useCallTaskFormSubmit, useCampaignTaskFormSubmit,
 *   useDealTaskFormSubmit - each passes its own mapper and add/update handlers.
 *
 * Notes:
 * - Previously each of the four sub-modules reimplemented this exact
 *   submit/dirty-check flow, differing only in which mapper and handlers it closed over.
 */
export function useTaskFormSubmit<TItem extends { id: number }, TFormData>({
  editingItem,
  closeDrawer,
  mapItemToFormData,
  handleAdd,
  handleUpdate,
}: UseTaskFormSubmitParams<TItem, TFormData>) {
  const handleSubmit = useCallback(async (
    values: TFormData,
    helpers: FormikHelpers<TFormData>,
  ) => {
    const success = await handleAdd(values, helpers);
    if (success) closeDrawer();
    return success;
  }, [handleAdd, closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: TFormData,
    helpers: FormikHelpers<TFormData>,
  ) => {
    if (!editingItem) return false;
    const original = mapItemToFormData(editingItem);
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return true;
    }
    const success = await handleUpdate(editingItem.id, values, helpers);
    if (success) closeDrawer();
    return success;
  }, [editingItem, handleUpdate, closeDrawer, mapItemToFormData]);

  return { handleSubmit, handleEditSubmit };
}
