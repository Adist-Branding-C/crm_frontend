import type { DurationUnit } from '../types/interface';
import type { LabelValuePair } from '../../../../shared/types/common';

/**
 * API endpoints for the task SLA escalation configuration.
 *
 * Used by:
 * - escalationRules.service.ts
 */
export const ESCALATION_RULES_API_ENDPOINTS = {
  GET_ALL: '/task-sla-config',
  UPDATE: (id: number) => `/task-sla-config/${id}`,
};

/**
 * Supported breach-duration display units and their minutes equivalent, used to
 * convert the stored integer breachMinutes to/from the amount + unit pair.
 *
 * Used by:
 * - escalationRules.mapper.ts (conversion)
 * - EscalationRuleRow (unit dropdown)
 */
export interface DurationUnitOption {
  value: DurationUnit;
  label: string;
  minutes: number;
}

export const DURATION_UNITS: DurationUnitOption[] = [
  { value: 'minutes', label: 'Minutes', minutes: 1 },
  { value: 'hours', label: 'Hours', minutes: 60 },
  { value: 'days', label: 'Days', minutes: 1440 },
];

export const DURATION_UNIT_OPTIONS: LabelValuePair[] = DURATION_UNITS.map((unit) => ({
  value: unit.value,
  label: unit.label,
}));

/**
 * Display order for the SLA rows - the backend returns its own ordering, but the
 * page renders fixed High / Medium / Low tiers so the order is pinned here.
 */
export const ESCALATION_PRIORITIES = ['High', 'Medium', 'Low'] as const;