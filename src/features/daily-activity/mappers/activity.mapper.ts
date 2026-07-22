import { QueryMapper } from '../../../shared/mappers/query.mapper';
import {
  formatActivityType,
  calculateTimeAgo,
  formatRelatedLead,
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
 */
export class ActivityMapper {
  static toEntity(item: ActivityItem): Activity {
    return {
      id: item.id,
      type: formatActivityType(item.activityType),
      entityType: item.entityType,
      user: item.actorName,
      relatedLead: formatRelatedLead(item.entityId, item.name, item.phone),
      hasContactInfo: Boolean(item.name || item.phone),
      description: item.description,
      timestamp: formatTimestamp(item.createdAt),
      timeAgo: calculateTimeAgo(item.createdAt),
      badge: getBadge(item.entityType),
    };
  }

  static toStaffOption(item: StaffListItem): StaffOption {
    return { id: item.staff_id, name: item.name };
  }

  static toActivitiesRequest(
    page: number,
    limit: number,
    tzOffsetMinutes: number,
    filters: Filters,
    activityType: string,
  ): Partial<GetActivitiesParams> {
    return QueryMapper.toQuery<GetActivitiesParams>({
      pageNumber: page,
      limit,
      tzOffsetMinutes,
      date: filters.date,
      startTime: filters.startTime,
      endTime: filters.endTime,
      actorId: filters.staff,
      activityType,
    });
  }
}
