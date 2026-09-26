import type { ReportOption } from '../../types';

/**
 * Task-report menu options consumed by the Task Reports landing page. Kept in
 * this folder alongside the rest of the task-report feature code so the shared
 * constants module only owns Lead/Deal/Call report catalogue data.
 */
export const taskReportOptions: ReportOption[] = [
  { id: 'summary', title: 'Task Summary / Productivity Report', description: 'Per-staff assigned, completed, overdue and completion rate', path: '/reports/task/summary' },
  { id: 'activity', title: 'Task Work / Activity Report', description: 'Full row-level export of every task for record-keeping', path: '/reports/task/activity' },
  { id: 'stage-history', title: 'Stage & Status Change History Report', description: 'Audit trail of every workflow-stage move, who and when', path: '/reports/task/stage-history' },
  { id: 'pipeline-distribution', title: 'Workflow Pipeline / Stage Distribution Report', description: 'Tasks per stage, average age, bottleneck stages', path: '/reports/task/pipeline-distribution' },
  { id: 'sla-breach', title: 'SLA Breach & Escalation Report', description: 'Breached tasks, priority tier, who was notified, repeat offenders', path: '/reports/task/sla-breach' },
  { id: 'recurring-compliance', title: 'Recurring Task Compliance Report', description: 'Whether recurring chains complete and regenerate on schedule', path: '/reports/task/recurring-compliance' },
  { id: 'team-performance', title: 'Rep / Team / Department Performance Report', description: 'Throughput, completion rate, SLA breach rate rolled up by team', path: '/reports/task/team-performance' },
];