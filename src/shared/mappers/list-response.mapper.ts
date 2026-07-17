import type { ApiResponse } from '../types/common';

/**
 * Normalizes a paginated list endpoint's response into a flat { items, total } shape.
 *
 * Used by:
 * - Task, Call Task, Campaign Task, Deal Task list fetches (features/task/*).
 *
 * Notes:
 * - List endpoints have been observed returning the array under `data.items`, as a
 *   bare array in `data` directly, and the total count under `totalItems`, `total`,
 *   or `totalRecords` depending on the endpoint. This tolerates all of those instead
 *   of every feature reimplementing the same defensive parsing.
 */
export class ListResponseMapper {
  static toPagedResult<T>(response: ApiResponse<T[]>): { items: T[]; total: number } {
    const data = response.data && typeof response.data === 'object'
      ? (response.data as unknown as Record<string, unknown>)
      : {};
    const rawItems = 'items' in data
      ? (data.items as T[])
      : Array.isArray(response.data)
        ? (response.data as T[])
        : [];
    const items = Array.isArray(rawItems) ? rawItems : [];
    const total = typeof data.totalItems === 'number' ? data.totalItems
      : typeof data.total === 'number' ? data.total
      : typeof data.totalRecords === 'number' ? data.totalRecords
      : items.length;
    return { items, total };
  }
}
