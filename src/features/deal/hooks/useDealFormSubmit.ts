import { useCallback } from 'react';
import type { DealFormData as DealDrawerFormData } from '../../../shared/types/drawers';
import type { DealFormData, UseDealFormSubmitParams } from '../types';

/**
 * The Deal add/edit drawer (shared/components/drawers/AddDealDrawer) manages its own
 * form state and calls a single onSave(data) callback - it isn't a Formik form - so
 * this only needs one save handler rather than separate submit/edit-submit pairs.
 * Its onSave payload is shaped by that drawer's own (unrelated, same-named) DealFormData
 * type, not this feature's - hence the aliased import.
 */
export function useDealFormSubmit({ editingItem, closeDrawer, handleAddDeal, handleUpdateDeal }: UseDealFormSubmitParams) {
  const handleDrawerSave = useCallback(async (data: DealDrawerFormData) => {
    const values = { ...data, assignedTo: data.assignAgent } as unknown as DealFormData;
    const success = editingItem?.dealId
      ? await handleUpdateDeal(editingItem.dealId, values)
      : await handleAddDeal(values);
    if (success) closeDrawer();
  }, [editingItem, handleAddDeal, handleUpdateDeal, closeDrawer]);

  return { handleDrawerSave };
}
