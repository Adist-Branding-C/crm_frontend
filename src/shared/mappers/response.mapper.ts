import type { PagedListResult } from '../types/response';

/**
 * Unwraps a list-endpoint response body into a uniform { items, total } shape,
 * whether the backend returned a bare array or an { items, pagination } envelope.
 *
 * Used by:
 * - task-settings fetch hooks (useFetchCallReasons, useFetchCallStatus,
 *   useFetchMeetingOutcomes, useFetchTaskCategories)
 *
 * Notes:
 * - Structurally identical across entities, so this is the one shared place this
 *   transformation should live rather than being reimplemented per feature.
 * - Entity-specific field mapping (renames, fallbacks, computed fields) still belongs
 *   in that entity's own mapper, applied to the `items` this returns.
 */
export class ResponseMapper {
  static toPagedList<T>(data: unknown): PagedListResult<T> {
    const payload = data as { items?: T[]; pagination?: { total: number } } | T[] | undefined;
    const items = Array.isArray(payload) ? payload : (payload?.items ?? []);
    const total = Array.isArray(payload) ? payload.length : (payload?.pagination?.total ?? items.length);
    return { items, total };
  }
}
