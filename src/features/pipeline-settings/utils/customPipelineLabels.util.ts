import { PIPELINE_ENTITY_TYPE_OPTIONS, GROUP_BY_FIELD_OPTIONS } from '../constants';

export function entityTypeLabel(value: string): string {
  return PIPELINE_ENTITY_TYPE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export function groupByFieldLabel(value: string): string {
  return GROUP_BY_FIELD_OPTIONS.find((o) => o.value === value)?.label ?? value;
}
