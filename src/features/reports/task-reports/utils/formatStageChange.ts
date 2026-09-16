/**
 * Formats a single stage-change history entry into its readable "from → to"
 * wording. The first entry a task ever gets has no predecessor, so its
 * fromStageName is null and reads as the task being created directly in the
 * destination stage.
 *
 * Used by:
 * - TaskStageHistoryRow (Stage & Status Change History report)
 */
export function formatStageChange(
  fromStageName: string | null,
  toStageName: string,
): string {
  return fromStageName ? `${fromStageName} → ${toStageName}` : `Created in ${toStageName}`;
}