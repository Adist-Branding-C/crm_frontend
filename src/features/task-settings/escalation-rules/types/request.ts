import type { DurationUnit } from './interface';

/**
 * The PATCH /task-sla-config/:id request payload sent to the backend when a
 * priority tier is saved. breachMinutes is the normalized integer minutes value
 * derived from the row's amount + unit fields.
 */
export interface EscalationRuleFormData {
  breachMinutes: number;
  notifyAssignee: boolean;
  notifyAdmin: boolean;
  notifyInApp: boolean;
  notifyEmail: boolean;
}

/**
 * The editable per-row form values shown to the user - the breach duration is
 * expressed as an amount + unit pair for display convenience and converted back
 * to breachMinutes on save.
 */
export interface EscalationRuleFormValues {
  amount: string;
  unit: DurationUnit;
  notifyAssignee: boolean;
  notifyAdmin: boolean;
  notifyInApp: boolean;
  notifyEmail: boolean;
}