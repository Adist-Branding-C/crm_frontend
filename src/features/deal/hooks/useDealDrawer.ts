import { useEditDrawer } from '../../../shared/hooks/useEditDrawer';
import { ADD_DEAL_INITIAL_VALUES } from '../constants/deal.constants';
import type { DealItem, DealFormData } from '../types';

const mapDealToFormData = (item: DealItem): DealFormData => ({
  dealName: item.dealName || '',
  lead: item.lead || '',
  mobile: item.mobile || '',
  amount: String(item.amount || ''),
  status: item.status || '',
  type: item.type || '',
  stage: item.stage || '',
  priority: item.priority || '',
  assignedTo: item.assignedTo || '',
  startDate: item.startDate || '',
  endDate: item.endDate || '',
  notes: '',
});

export function useDealDrawer() {
  return useEditDrawer<DealItem, DealFormData>({
    mapItemToFormData: mapDealToFormData,
    emptyFormData: ADD_DEAL_INITIAL_VALUES,
  });
}
