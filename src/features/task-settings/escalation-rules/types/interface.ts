export type DurationUnit = 'minutes' | 'hours' | 'days';

export type EscalationPriority = 'High' | 'Medium' | 'Low';

/**
 * A single priority tier of the task SLA escalation configuration - exactly three
 * always exist (High / Medium / Low) and can only be edited, never created/deleted.
 *
 * Used by:
 * - escalation-rules pages/components/hooks/services.
 */
export interface EscalationRuleItem {
  id: number;
  priority: EscalationPriority;
  breachMinutes: number;
  notifyAssignee: boolean;
  notifyAdmin: boolean;
  notifyInApp: boolean;
  notifyEmail: boolean;
}