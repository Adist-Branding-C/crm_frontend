import { Phone, MessageSquare, Users, Tag, GitBranch, ShieldAlert } from 'lucide-react';
import type { TabItem } from '../../../shared/types/layout';

/**
 * Tab definitions for the task-settings sub-navigation (call status, call reasons,
 * meeting outcome, task categories, workflow, escalation rules).
 *
 * Used by:
 * - task-settings sub-module pages (CallReason, CallStatus, MeetingOutcome, TaskCategory, TaskWorkflow, EscalationRules),
 *   via the shared SettingsTabs component.
 */
export const SETTINGS_TABS: TabItem[] = [
  // Hidden per product decision (not currently in use) - keeping code for potential future re-enable
  // { id: 'call_status',      title: 'Call Status',      link: '/user/call_status',      icon: Phone },
  // { id: 'call_reasons',     title: 'Call Reasons',     link: '/user/call_reasons',     icon: MessageSquare },
  // { id: 'meeting_outcome',  title: 'Meeting Outcome',   link: '/user/meeting_outcome',  icon: Users },
  { id: 'task_categories',  title: 'Task Categories',   link: '/user/task_categories',  icon: Tag },
  { id: 'task_workflows',   title: 'Workflow',          link: '/user/task_workflows',   icon: GitBranch },
  { id: 'escalation_rules', title: 'Escalation Rules',  link: '/user/escalation_rules', icon: ShieldAlert },
];
