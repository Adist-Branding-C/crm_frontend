import type { DealApiItem } from '../types/response';
import type { DealItem } from '../types/interface';

export function mapApiToUI(item: DealApiItem): DealItem {
  return {
    id: item.id,
    dealId: item.dealId ?? String(item.id),
    dealName: item.dealName ?? '',
    lead: typeof item.lead === 'object' ? (item.lead as { name?: string })?.name ?? '' : item.lead ?? '',
    leadId: typeof item.lead === 'object' ? (item.lead as { id?: string | number })?.id ?? item.leadId ?? '' : item.leadId ?? '',
    mobile: item.mobile ?? '',
    amount: item.amount ?? 0,
    status: typeof item.status === 'object' ? (item.status as { dealStatus?: string; name?: string })?.dealStatus ?? (item.status as { name?: string })?.name ?? '' : item.status ?? '',
    statusId: typeof item.status === 'object' ? (item.status as { id?: string | number })?.id ?? item.statusId ?? '' : item.statusId ?? '',
    type: typeof item.type === 'object' ? (item.type as { dealType?: string; name?: string })?.dealType ?? (item.type as { name?: string })?.name ?? '' : item.type ?? '',
    typeId: typeof item.type === 'object' ? (item.type as { id?: string | number })?.id ?? item.typeId ?? '' : item.typeId ?? '',
    stage: item.stage ?? '',
    priority: item.priority ?? '',
    assignedTo: item.assignedTo ?? '',
    agent: typeof item.agent === 'object' ? (item.agent as { name?: string })?.name ?? '' : item.agent ?? '',
    agentId: typeof item.agent === 'object' ? (item.agent as { staff_id?: string; id?: string | number })?.staff_id ?? (item.agent as { id?: string | number })?.id ?? item.agentId ?? '' : item.agentId ?? '',
    createdBy: typeof item.createdBy === 'object' ? (item.createdBy as { name?: string } | null)?.name ?? '' : item.createdBy ?? '',
    startDate: item.startDate ?? '',
    endDate: item.endDate ?? '',
    createdAt: item.createdAt ?? '',
    additionalFields: item.additionalFields ?? [],
  };
}

export function getDealIds(deals: DealItem[]): string[] {
  return deals.map(d => String(d.id));
}
