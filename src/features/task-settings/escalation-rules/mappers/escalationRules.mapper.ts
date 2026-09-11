import type { DurationUnit, EscalationPriority, EscalationRuleItem } from '../types/interface';
import type { EscalationRuleFormData, EscalationRuleFormValues } from '../types/request';
import { DURATION_UNITS } from '../constants';

const MINUTES_PER_UNIT: Record<DurationUnit, number> = {
  minutes: 1,
  hours: 60,
  days: 1440,
};

const UNITS_BY_PREFERENCE: DurationUnit[] = ['days', 'hours', 'minutes'];

/**
 * Normalizes an integer minutes duration into the largest whole unit that divides
 * it evenly (1440 -> "1 day", 120 -> "2 hours", 30 -> "30 minutes") so the row
 * opens on the most convenient amount + unit, while any non-whole remainder stays
 * in minutes.
 */
export function toDurationFields(breachMinutes: number): { amount: string; unit: DurationUnit } {
  const minutes = Number(breachMinutes) || 0;
  if (minutes <= 0) return { amount: '0', unit: 'minutes' };
  for (const unit of UNITS_BY_PREFERENCE) {
    const perUnit = MINUTES_PER_UNIT[unit];
    if (minutes % perUnit === 0) {
      return { amount: String(minutes / perUnit), unit };
    }
  }
  return { amount: String(minutes), unit: 'minutes' };
}

/**
 * Converts an amount + unit pair back into the integer minutes value the backend
 * stores as breachMinutes.
 */
export function toBreachMinutes(amount: string | number, unit: DurationUnit): number {
  return Math.max(0, Math.round(Number(amount) || 0)) * MINUTES_PER_UNIT[unit];
}

/**
 * Maps between the task SLA config API response shapes and the feature's UI-facing
 * interfaces, and builds PATCH payloads (including the duration unit conversion).
 *
 * Used by:
 * - escalationRules.service.ts (response + payload sides)
 * - EscalationRuleRow (initial row form values)
 *
 * Notes:
 * - notifyAssignee is always locked on (the assignee must always be notified on
 *   escalation), so the form values hard-code it to true regardless of the stored
 *   value.
 * - notifyAdmin only applies to the High tier; the row hides it for Medium/Low,
 *   so the payload forces it to false for anything that isn't High.
 */
export class EscalationRulesMapper {
  static toEscalationRuleItem(raw: unknown): EscalationRuleItem {
    const r = (raw ?? {}) as Record<string, unknown>;
    const priority = String(r.priority ?? 'Low');
    const normalized = priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
    const validPriority: EscalationPriority =
      normalized === 'High' || normalized === 'Medium' ? normalized : 'Low';
    return {
      id: Number(r.id),
      priority: validPriority,
      breachMinutes: Number(r.breachMinutes ?? 0),
      notifyAssignee: Boolean(r.notifyAssignee),
      notifyAdmin: Boolean(r.notifyAdmin),
      notifyInApp: Boolean(r.notifyInApp),
      notifyEmail: Boolean(r.notifyEmail),
    };
  }

  static toFormValues(item: EscalationRuleItem): EscalationRuleFormValues {
    const { amount, unit } = toDurationFields(item.breachMinutes);
    return {
      amount,
      unit,
      notifyAssignee: true,
      notifyAdmin: item.priority === 'High' && item.notifyAdmin,
      notifyInApp: item.notifyInApp,
      notifyEmail: item.notifyEmail,
    };
  }

  static toEscalationRulePayload(values: EscalationRuleFormValues, priority: EscalationPriority): EscalationRuleFormData {
    return {
      breachMinutes: toBreachMinutes(values.amount, values.unit),
      notifyAssignee: true,
      notifyAdmin: priority === 'High' ? values.notifyAdmin : false,
      notifyInApp: values.notifyInApp,
      notifyEmail: values.notifyEmail,
    };
  }
}