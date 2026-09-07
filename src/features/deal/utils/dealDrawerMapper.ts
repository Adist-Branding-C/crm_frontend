import type { DealItem } from '../types/interface';

export const mapDealToFormData = (item: DealItem) => ({
  dealName: item.dealName || '',
  lead: item.lead || '',
  leadId: item.leadId || '',
  mobile: item.mobile || '',
  amount: String(item.amount || ''),
  status: item.status || '',
  statusId: item.statusId || '',
  pipelineId: item.pipelineId || '',
  stageId: item.stageId || item.statusId || '',
  priority: item.priority || '',
  type: item.type || '',
  lostReason: item.lostReason || '',
  stage: item.stage || '',
  assignedTo: item.assignedTo || '',
  startDate: item.startDate || '',
  endDate: item.endDate || '',
  closeDate: item.closeDate || item.endDate || '',
  notes: '',
});

export type DealDrawerFormData = ReturnType<typeof mapDealToFormData>;
