import {
  formatActivityType,
  calculateTimeAgo,
  formatRelatedLead,
  formatTimestamp,
  getBadge,
} from './activityHelpers';
import type { ActivityItem, Activity } from '../types';

export function mapApiItemToUI(item: ActivityItem): Activity {
  return {
    id: item.id,
    type: formatActivityType(item.activityType),
    user: item.actorName,
    relatedLead: formatRelatedLead(item.entityId, item.name, item.phone),
    description: item.description,
    timestamp: formatTimestamp(item.createdAt),
    timeAgo: calculateTimeAgo(item.createdAt),
    badge: getBadge(item.entityType),
  };
}
