import { useMemo } from 'react';
import { CampaignMapper } from '../mappers/campaign.mapper';
import type { Campaign } from '../types/index';

/**
 * Derives the Formik initial values for the edit drawer from the item being edited, via
 * CampaignMapper.toFormValues (which also supplies the blank add-drawer defaults when there is
 * no editingItem). Memoized on editingItem so the add drawer's blank initial values aren't
 * recomputed on every render.
 */
export function useCampaignForm(editingItem: Campaign | null) {
  const editInitialValues = useMemo(
    () => CampaignMapper.toFormValues(editingItem),
    [editingItem],
  );

  return { editInitialValues };
}
