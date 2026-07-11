import { formatActivityType, calculateTimeAgo, formatRelatedLead, formatTimestamp, getBadge, } from './activityHelpers';
export function mapApiItemToUI(item) {
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
//# sourceMappingURL=activityMapper.js.map