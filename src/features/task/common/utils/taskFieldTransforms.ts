interface EntityRef {
  id: number;
}

/**
 * Extracts a relational field's id as a string, or '' if absent - the shape every
 * task-type edit form needs when pre-filling a select field (assignedTo, leadId,
 * category) from an API item whose relational fields arrive as `{ id, name }` objects.
 *
 * Used by:
 * - TaskMapper, CallTaskMapper, CampaignTaskMapper, DealTaskMapper (toFormValues).
 *
 * Notes:
 * - Previously each mapper either inlined `String(entity.id)` or, for leadId, wrongly
 *   stringified the whole object (`String(item.leadId)` -> "[object Object]"). This is
 *   the single place that extraction happens now.
 */
export function toIdString(entity: EntityRef | null | undefined): string {
  return entity ? String(entity.id) : '';
}

/**
 * Strips seconds from an API "HH:mm:ss" time string down to the "HH:mm" the task
 * update endpoints validate against, or '' if absent.
 *
 * Used by:
 * - TaskMapper, CallTaskMapper, CampaignTaskMapper, DealTaskMapper (toFormValues).
 *
 * Notes:
 * - Display-only 12-hour formatting for tables is a separate concern, handled by
 *   formatTime12hr (shared/utils/dateUtils) - this stays in the 24-hour HH:mm shape
 *   the API expects on submit.
 */
export function toHHmm(time: string | null | undefined): string {
  return time ? time.slice(0, 5) : '';
}
