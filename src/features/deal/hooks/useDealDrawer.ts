import { useEditDrawer } from '../../../shared/hooks/useEditDrawer';
import { ADD_DEAL_INITIAL_VALUES } from '../constants/deal.constants';
import { mapDealToFormData } from '../utils/dealDrawerMapper';
import type { DealDrawerFormData } from '../utils/dealDrawerMapper';
import type { DealItem } from '../types/interface';

export function useDealDrawer() {
  return useEditDrawer<DealItem, DealDrawerFormData>({
    mapItemToFormData: mapDealToFormData,
    emptyFormData: ADD_DEAL_INITIAL_VALUES as unknown as DealDrawerFormData,
  });
}
