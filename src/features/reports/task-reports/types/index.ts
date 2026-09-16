import type { ImportPaginationInfo } from '../../types';

/**
 * Shared types for the seven Task reports (Summary, Activity, Stage History,
 * Pipeline Distribution, SLA Breach, Recurring Compliance, Team Performance).
 * Extracted from the shared reports types module so all task-report feature
 * code resolves types from this folder, mirroring the task-reports grouping
 * of the backend.
 *
 * Used by:
 * - task-reports/constants, components, hooks, services, sub-pages and utils
 */
export type { ImportPaginationInfo };

export interface TaskSummaryRow {
  staffId: string;
  staffName: string;
  assignedCount: number;
  completedCount: number;
  openCount: number;
  overdueCount: number;
  completionRate: number;
  avgTimeToCompleteHours: number | null;
}

export interface GetTaskSummaryParams {
  dateFrom?: string;
  dateTo?: string;
  staffId?: string;
  workflowId?: string;
}

export type TaskSummaryReportData = TaskSummaryRow[] | { items: TaskSummaryRow[] };

export interface TaskPipelineStageRow {
  stageId: number;
  stageName: string;
  color: string | null;
  sortOrder: number;
  taskCount: number;
  avgAgeInStageHours: number | null;
  oldestTaskAgeHours: number | null;
}

export interface TaskPipelineDistributionData {
  workflow: { id: number; name: string };
  stages: TaskPipelineStageRow[];
}

export interface GetTaskPipelineDistributionParams {
  workflowId: number;
}

export interface TaskPipelineStageView extends TaskPipelineStageRow {
  isBottleneck: boolean;
}

export type TaskReportPriority = 'Low' | 'Medium' | 'High';

export interface SlaBreachRow {
  taskId: number;
  taskTitle: string;
  priority: TaskReportPriority;
  assignedToStaffId: number | null;
  assignedToStaffName: string | null;
  notifiedAt: string;
  notifiedAssignee: boolean;
  notifiedManager: boolean;
  scheduledDateTime: string;
  breachedByHours: number | null;
}

export interface RepeatOffenderRow {
  staffId: number;
  staffName: string | null;
  breachCount: number;
}

export interface TaskSlaBreachReportData {
  breaches: SlaBreachRow[];
  pagination: ImportPaginationInfo;
  repeatOffenders: RepeatOffenderRow[];
}

export interface GetSlaBreachesParams {
  dateFrom?: string;
  dateTo?: string;
  priority?: TaskReportPriority;
  staffId?: string;
  pageNumber?: number;
  limit?: number;
}

export interface TaskStageHistoryRow {
  taskId: number;
  taskTitle: string;
  fromStageName: string | null;
  toStageName: string;
  movedByStaffId: number | null;
  movedByStaffName: string | null;
  changedAt: string;
}

export interface TaskStageHistoryData {
  history: TaskStageHistoryRow[];
  pagination: ImportPaginationInfo;
}

export interface GetTaskStageHistoryParams {
  dateFrom?: string;
  dateTo?: string;
  staffId?: string;
  workflowId?: string;
  pageNumber?: number;
  limit?: number;
}

export type RecurringTaskComplianceStatus = 'healthy' | 'at_risk' | 'broken';
export type RecurringTaskInstanceStatus = 'on_time' | 'late' | 'missed' | 'pending';

export interface RecurringTaskComplianceRow {
  taskId: number;
  taskName: string;
  recurrenceRule: string;
  expectedOccurrences: number;
  actualOccurrences: number;
  onTimeCount: number;
  lateCount: number;
  missedCount: number;
  complianceRate: number;
  lastGeneratedAt: string | null;
  recurrenceIntervalHours: number | null;
  status: RecurringTaskComplianceStatus;
}

export interface RecurringTaskInstanceRow {
  instanceId: number;
  dueDate: string | null;
  completedAt: string | null;
  status: RecurringTaskInstanceStatus;
  regeneratedNext: boolean;
}

export interface RecurringComplianceReportData {
  chains: RecurringTaskComplianceRow[];
  pagination: ImportPaginationInfo;
}

export interface RecurringComplianceInstancesData {
  instances: RecurringTaskInstanceRow[];
  pagination: ImportPaginationInfo;
}

export interface GetRecurringComplianceParams {
  dateFrom?: string;
  dateTo?: string;
  staffId?: string;
  workflowId?: string;
  status?: RecurringTaskComplianceStatus;
  pageNumber?: number;
  limit?: number;
}

export interface GetRecurringComplianceInstancesParams {
  taskId: number;
  pageNumber?: number;
  limit?: number;
}

export type TaskActivityDateField = 'created_at' | 'due_date' | 'completed_at';

export type TaskActivityType = 'one_time' | 'recurring';

export interface TaskActivityRow {
  taskId: number;
  title: string;
  type: TaskActivityType;
  priority: string;
  status: string | null;
  workflowName: string | null;
  assigneeId: number | null;
  assigneeName: string | null;
  createdBy: string | null;
  createdAt: string;
  dueDate: string | null;
  completedAt: string | null;
  linkedTaskId: number | null;
  attachmentCount: number;
  tags: string[];
}

export interface TaskActivityReportData {
  tasks: TaskActivityRow[];
  pagination: ImportPaginationInfo;
}

export interface GetTaskActivityParams {
  dateFrom?: string;
  dateTo?: string;
  dateField?: TaskActivityDateField;
  status?: string;
  type?: TaskActivityType;
  priority?: string;
  assigneeId?: number;
  workflowId?: number;
  search?: string;
  pageNumber?: number;
  limit?: number;
}

export interface TeamPerformanceRollupRow {
  groupId: string;
  groupName: string;
  staffCount: number;
  totalTasks: number;
  completedCount: number;
  openCount: number;
  overdueCount: number;
  completionRate: number;
  slaBreachRate: number;
  avgTimeToCompleteHours: number | null;
}

export interface TeamPerformanceStaffRow {
  staffId: number;
  staffName: string;
  totalTasks: number;
  completedCount: number;
  openCount: number;
  overdueCount: number;
  completionRate: number;
  slaBreachRate: number;
  avgTimeToCompleteHours: number | null;
}

export type TeamPerformanceRow = TeamPerformanceRollupRow | TeamPerformanceStaffRow;

export interface TaskTeamPerformanceReportData {
  groups: TeamPerformanceRow[];
  pagination: ImportPaginationInfo;
}

// Wire shape of the per-staff drill-down response. Field names follow the
// backend's PerformanceStaffRow (completedTasks/openTasks/overdueTasks) and are
// mapped by normalizeTeamPerformanceStaff into TeamPerformanceStaffRow.
export interface TeamPerformanceStaffWireRow {
  staffId: number;
  staffName: string;
  totalTasks: number;
  completedTasks: number;
  openTasks: number;
  overdueTasks: number;
  completionRate: number;
  slaBreachCount: number;
  slaBreachRate: number;
  avgTimeToCompleteHours: number | null;
}

export interface TeamPerformanceDrilldownData {
  groupId: number;
  groupName: string;
  staff: TeamPerformanceStaffWireRow[];
}

export interface GetTeamPerformanceParams {
  dateFrom?: string;
  dateTo?: string;
  workflowId?: number;
  // Drill-down group filter - only the department filter is used; the report
  // always groups by department.
  departmentId?: number;
  pageNumber?: number;
  limit?: number;
}