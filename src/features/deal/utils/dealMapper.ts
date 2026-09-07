import type { DealApiItem } from '../types/response';
import type { DealItem } from '../types/interface';

export function mapApiToUI(item: DealApiItem): DealItem {
  // The deal-list/detail endpoints send the deal's stage as a nested object
  // under `stage` (dealStatus/dealStage/id/...), not as the flat `status`
  // string this mapper's `status`/`stage` fields were originally written
  // against - extracting it once here keeps both fields (status stays for
  // legacy read-only display code, see DealFormData's comment) populated
  // with the real label instead of '' or the raw object itself.
  const stageLabel = typeof item.stage === 'object'
    ? (item.stage as { dealStatus?: string; name?: string })?.dealStatus ?? (item.stage as { name?: string })?.name ?? ''
    : item.stage ?? '';
  const stageObjId = typeof item.stage === 'object' ? (item.stage as { id?: string | number })?.id : undefined;

  return {
    id: item.id,
    dealId: item.dealId ?? String(item.id),
    dealName: item.dealName ?? '',
    lead: typeof item.lead === 'object' ? (item.lead as { name?: string })?.name ?? '' : item.lead ?? '',
    leadId: typeof item.lead === 'object' ? (item.lead as { id?: string | number })?.id ?? item.leadId ?? '' : item.leadId ?? '',
    mobile: item.mobile ?? '',
    amount: item.amount ?? 0,
    status: stageLabel || (typeof item.status === 'string' ? item.status : ''),
    statusId: item.statusId ?? stageObjId ?? '',
    pipelineId: item.pipelineId ?? '',
    stageId: item.stageId ?? stageObjId ?? '',
    type: typeof item.type === 'object' ? (item.type as { dealType?: string; name?: string })?.dealType ?? (item.type as { name?: string })?.name ?? '' : item.type ?? '',
    stage: stageLabel,
    priority: item.priority ?? '',
    lostReason: item.lostReason ?? '',
    assignedTo: item.assignedTo ?? '',
    agent: typeof item.agent === 'object' ? (item.agent as { name?: string })?.name ?? '' : item.agent ?? '',
    agentId: typeof item.agent === 'object' ? (item.agent as { staff_id?: string; id?: string | number })?.staff_id ?? (item.agent as { id?: string | number })?.id ?? item.agentId ?? '' : item.agentId ?? '',
    createdBy: typeof item.createdBy === 'object' ? (item.createdBy as { name?: string } | null)?.name ?? '' : item.createdBy ?? '',
    startDate: item.startDate ?? '',
    endDate: item.endDate ?? '',
    closeDate: item.closeDate ?? item.endDate ?? '',
    createdAt: item.createdAt ?? '',
    additionalFields: item.additionalFields ?? [],
  };
}

export function getDealIds(deals: DealItem[]): string[] {
  return deals.map(d => String(d.id));
}
