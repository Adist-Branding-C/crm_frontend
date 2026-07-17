import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { DealAdditionalFieldMapper } from '../mappers/dealAdditionalField.mapper';
import { ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES } from '../constants/deal-additional-field.constants';
import type { DealAdditionalFieldFormData } from '../types/request';
import type { DealAdditionalField } from '../types/interface';

export function useDealAdditionalFieldDrawer() {
  return useEditDrawer<DealAdditionalField, DealAdditionalFieldFormData>({
    mapItemToFormData: DealAdditionalFieldMapper.toFormData,
    emptyFormData: ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES,
  });
}
