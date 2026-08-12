import { QueryMapper } from '../../../shared/mappers/query.mapper';
import {
  formatActivityType,
  calculateTimeAgo,
  formatTimestamp,
  getBadge,
} from '../utils/activityHelpers';
import type { Activity, ActivityItem, Filters, GetActivitiesParams, StaffListItem, StaffOption } from '../types';

/**
 * Explicit shape transformations for the Activity feature.
 *
 * Used by:
 * - useActivitiesFetch (API item -> UI Activity, filters -> request params)
 * - useStaffOptions (raw staff list item -> filter dropdown option)
 *
 * Notes:
 * - toActivitiesRequest delegates empty/undefined-value stripping to the shared
 *   QueryMapper rather than reimplementing it per-field.
 * - `user` uses the API's actorName, resolved in the database via a
 *   @VirtualColumn on the Activity entity - not a separate enrichment query,
 *   so it's always present on every row. Falls back to the raw actorId only
 *   for the edge case where actorName itself comes back null (e.g. the
 *   staff record was deleted after the activity was logged).
 * - There's no related-lead name/phone enrichment anymore (that *was* a
 *   separate query, now removed), so `relatedLead` falls back to the raw
 *   entityId and `hasContactInfo` is always false - there is no name/phone
 *   to show below the activity line.
 */
export class ActivityMapper {
  static toEntity(item: ActivityItem): Activity {
    return {
      id: item.id,
      type: formatActivityType(item.activityType),
      entityType: item.entityType,
      user: item.actorName || item.actorId || item.actorType,
      relatedLead: item.entityId,
      hasContactInfo: false,
      description: item.description,
      timestamp: formatTimestamp(item.createdAt),
      timeAgo: calculateTimeAgo(item.createdAt),
      badge: getBadge(item.entityType),
      changes: item.changes ?? [],
    };
  }

  static toStaffOption(item: StaffListItem): StaffOption {
    return { id: item.staff_id, name: item.name };
  }

  static toActivitiesRequest(
    pageNumber: number,
    limit: number,
    timezoneOffsetMinutes: number,
    filters: Filters,
    activityType: string,
  ): Partial<GetActivitiesParams> {
    return QueryMapper.toQuery<GetActivitiesParams>({
      pageNumber,
      limit,
      timezoneOffsetMinutes,
      date: filters.date,
      startTime: filters.startTime,
      endTime: filters.endTime,
      actorId: filters.staff,
      activityType,
    });
  }
}
