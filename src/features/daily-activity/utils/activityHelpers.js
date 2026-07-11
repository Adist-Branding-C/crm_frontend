export function formatActivityType(activityType) {
    return activityType
        .toLowerCase()
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}
export function calculateTimeAgo(createdAt) {
    const diffMs = Date.now() - new Date(createdAt).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1)
        return 'Just now';
    if (minutes < 60)
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24)
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? '' : 's'} ago`;
}
export function formatRelatedLead(entityId, name, phone) {
    if (phone && name)
        return `${phone} | ${name}`;
    return name ?? entityId;
}
export function formatTimestamp(isoString) {
    const d = new Date(isoString);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
export function getBadge(entityType) {
    return entityType.charAt(0).toUpperCase() + entityType.slice(1);
}
//# sourceMappingURL=activityHelpers.js.map