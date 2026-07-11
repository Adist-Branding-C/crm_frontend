import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { DealAdditionalFieldMapper } from '../mappers/dealAdditionalField.mapper';
import { ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES } from '../constants/deal-additional-field.constants';

/**
 * Add/edit form state for deal-settings/additional-fields.
 *
 * Notes:
 * - Thin wrapper around the shared useEditDrawer, configured with the additional-field
 *   item->form mapper. This feature has no drawer UI (the form panel is always visible,
 *   switching between "add" and "edit" mode via editingItem), so `showDrawer` is unused here.
 */
export function useDealAdditionalFieldDrawer() {
  return useEditDrawer({
    mapItemToFormData: DealAdditionalFieldMapper.toFormData,
    emptyFormData: ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES,
  });
}
