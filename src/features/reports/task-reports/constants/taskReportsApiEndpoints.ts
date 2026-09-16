/**
 * API endpoint paths for Task report pages.
 *
 * Used by:
 * - TaskReportService (Task Summary / Productivity report, Workflow Pipeline /
 *   Stage Distribution report, SLA Breach & Escalation report, Stage & Status
 *   Change History report, Recurring Task Compliance report, Task Work /
 *   Activity report)
 *
 * Notes:
 * - Kept separate from the reports landing tiles (constants/index.ts) because
 *   the tiles drive navigation while these drive API calls.
 */
export const TASK_REPORT_API_ENDPOINTS = {
  SUMMARY: '/reports/tasks/summary',
  PIPELINE_DISTRIBUTION: '/reports/tasks/pipeline-distribution',
  SLA_BREACHES: '/reports/tasks/sla-breaches',
  STAGE_HISTORY: '/reports/tasks/stage-history',
  RECURRING_COMPLIANCE: '/reports/tasks/recurring-compliance',
  ACTIVITY: '/reports/tasks/activity',
  TEAM_PERFORMANCE: '/reports/tasks/team-performance',
} as const;