import type { EscalationRuleItem } from './interface';

/**
 * Runtime response shapes for the task SLA config endpoints, re-exported so the
 * service layer never deals with `unknown[]` directly.
 */
export type EscalationRuleListResponse = EscalationRuleItem[];

export type EscalationRuleUpdateResponse = EscalationRuleItem;