import { Tag, GitBranch, ShieldAlert } from 'lucide-react';
import type { TabItem } from '../../../shared/types/layout';

/**
 * Tab definitions for the task-settings sub-navigation (task categories,
 * workflow, escalation rules).
 *
 * Used by:
 * - task-settings sub-module pages (TaskCategory, TaskWorkflow, EscalationRules),
 *   via the shared SettingsTabs component.
 */
export const SETTINGS_TABS: TabItem[] = [
  { id: 'task_categories',  title: 'Task Categories',   link: '/user/task_categories',  icon: Tag },
  { id: 'task_workflows',   title: 'Workflow',          link: '/user/task_workflows',   icon: GitBranch },
  { id: 'escalation_rules', title: 'Escalation Rules',  link: '/user/escalation_rules', icon: ShieldAlert },
];
