import type { AggregateType } from '../types';

// An execution log / webhook history row can be attached to a lead, deal or task (or, for
// a rule-level cron sweep, the rule itself). The list APIs have only recently started
// returning these fields, so these helpers tolerate missing values and never surface
// "undefined" in the UI.
export interface AggregateDisplaySource {
  aggregateType?: AggregateType;
  aggregateId?: string;
  leadId?: string | null;
  leadName?: string;
  dealId?: string | null;
  dealName?: string;
  taskId?: string | null;
  taskName?: string;
}

function hasValue(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

// Resolve which kind of record a row belongs to. The explicit aggregateType wins; when it
// is missing (e.g. an older webhook-history response) fall back to which id is present.
export function resolveAggregateKind(source: AggregateDisplaySource): AggregateType {
  if (source.aggregateType) return source.aggregateType;
  if (hasValue(source.dealId) && !hasValue(source.leadId)) return 'deal';
  if (hasValue(source.taskId) && !hasValue(source.leadId) && !hasValue(source.dealId)) return 'task';
  return 'lead';
}

export function aggregateDisplayName(source: AggregateDisplaySource): string {
  const kind = resolveAggregateKind(source);

  if (kind === 'lead') {
    if (hasValue(source.leadName)) return source.leadName;
    const id = hasValue(source.leadId) ? source.leadId : source.aggregateId;
    return hasValue(id) ? id : '-';
  }

  // A sweep row belongs to the rule, not an individual record.
  if (kind === 'rule') return 'Rule';

  const isDeal = kind === 'deal';
  const name = isDeal ? source.dealName : source.taskName;
  if (hasValue(name)) return name;

  const label = isDeal ? 'Deal' : 'Task';
  const id = isDeal
    ? (hasValue(source.dealId) ? source.dealId : source.aggregateId)
    : (hasValue(source.taskId) ? source.taskId : source.aggregateId);
  return hasValue(id) ? `${label} ${id}` : label;
}
