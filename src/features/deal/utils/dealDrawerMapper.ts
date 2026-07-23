import type { DealItem } from '../types/interface';

export const mapDealToFormData = (item: DealItem) => ({
  dealName: item.dealName || '',
  lead: item.lead || '',
  leadId: item.leadId || '',
  mobile: item.mobile || '',
  amount: String(item.amount || ''),
  status: item.status || '',
  statusId: item.statusId || '',
  type: item.type || '',
  typeId: item.typeId || '',
  stage: item.stage || '',
  priority: item.priority || '',
  assignedTo: item.assignedTo || '',
  startDate: item.startDate || '',
  endDate: item.endDate || '',
  notes: '',
});

export type DealDrawerFormData = ReturnType<typeof mapDealToFormData>;
