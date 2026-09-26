import type {
  TaskTeamPerformanceReportData,
  TeamPerformanceDrilldownData,
  TeamPerformanceRollupRow,
  TeamPerformanceStaffRow,
  TeamPerformanceStaffWireRow,
} from '../types';
import type { ImportPaginationInfo } from '../types';

/**
 * Normalizes the raw department rollup rows returned by the team-performance
 * endpoint when no departmentId drill-down is present. Identity columns
 * (groupId, groupName, staffCount) are guaranteed only on rollup rows; the
 * mapper defensively defaults every field.
 *
 * Used by:
 * - useTaskTeamPerformanceReport
 */
export function normalizeTeamPerformanceRollup(
  data?: TaskTeamPerformanceReportData,
): { rows: TeamPerformanceRollupRow[]; pagination: ImportPaginationInfo | null } {
  if (!data) return { rows: [], pagination: null };
  // The API returns the grouped rows under `groups`, not `rows`.
  const groups = Array.isArray(data.groups) ? data.groups : [];
  return {
    rows: groups.map((row) => {
      const r = row as Partial<TeamPerformanceRollupRow>;
      return {
        groupId: String(r.groupId ?? ''),
        groupName: String(r.groupName ?? 'Unassigned'),
        staffCount: Number(r.staffCount ?? 0),
        totalTasks: Number(r.totalTasks ?? 0),
        completedCount: Number(r.completedCount ?? 0),
        openCount: Number(r.openCount ?? 0),
        overdueCount: Number(r.overdueCount ?? 0),
        completionRate: Number(r.completionRate ?? 0),
        slaBreachRate: Number(r.slaBreachRate ?? 0),
        avgTimeToCompleteHours:
          r.avgTimeToCompleteHours == null ? null : Number(r.avgTimeToCompleteHours),
      };
    }),
    pagination: data.pagination ?? null,
  };
}

/**
 * Normalizes the per-staff drill-down rows returned when a departmentId is
 * supplied. The endpoint returns the full staff list for the single department
 * (no server-side pagination in drill-down mode), so the mapped pagination is
 * always null. Wire field names (completedTasks/openTasks/overdueTasks) are
 * mapped onto the shared TeamPerformanceStaffRow shape.
 *
 * Used by:
 * - useTaskTeamPerformanceDrilldown
 */
export function normalizeTeamPerformanceStaff(
  data?: TeamPerformanceDrilldownData,
): { rows: TeamPerformanceStaffRow[]; pagination: ImportPaginationInfo | null } {
  if (!data) return { rows: [], pagination: null };
  const staff = Array.isArray(data.staff) ? data.staff : [];
  return {
    rows: staff.map((row) => {
      const r = row as Partial<TeamPerformanceStaffWireRow>;
      return {
        staffId: Number(r.staffId ?? 0),
        staffName: String(r.staffName ?? ''),
        totalTasks: Number(r.totalTasks ?? 0),
        completedCount: Number(r.completedTasks ?? 0),
        openCount: Number(r.openTasks ?? 0),
        overdueCount: Number(r.overdueTasks ?? 0),
        completionRate: Number(r.completionRate ?? 0),
        slaBreachRate: Number(r.slaBreachRate ?? 0),
        avgTimeToCompleteHours:
          r.avgTimeToCompleteHours == null ? null : Number(r.avgTimeToCompleteHours),
      };
    }),
    pagination: null,
  };
}
